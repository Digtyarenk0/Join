const app = require('express')();
const {graphqlHTTP} = require('express-graphql');
const jwt = require('jsonwebtoken')
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const UpdateTokens = require('./dbstructure/authToken')
const bodyParser = require('body-parser')

const uploadPath = `${__dirname}/public/media/`;
const upload  = require('multer')({ dest: uploadPath })

const sequelize = require('./dbstructure/urldb');
const rootResolvers = require('./dbstructure/rootresolvers')
const schema = require('./dbstructure/schema')
const User = require('./dbstructure/user')
const Token = require('./dbstructure/token');
const Chat = require('./dbstructure/chat');
const UserToChat = require('./dbstructure/usertochat')
const Friend = require('./dbstructure/friend')
const Message = require('./dbstructure/message');
const Media = require('./dbstructure/media');
const secret = require('./dbstructure/secret')
const express = require("express");
const multer = require("multer");


User.hasMany(Friend, {as: "user"})
Friend.belongsTo(User, {foreignKey: "userId", as: "user"})


User.hasMany(Friend, {as: "Friend"})
Friend.belongsTo(User, {foreignKey: "friendId", as: "friend"})

Media.belongsTo(User)
User.hasMany(Media)

Message.belongsTo(User)
User.hasMany(Message)

Message.belongsTo(Chat)
Chat.hasMany(Message, {onDelete: "cascade"})

Message.hasMany(Media)
Media.belongsTo(Message)

Chat.belongsToMany(User, {through: UserToChat});
User.belongsToMany(Chat, {through: UserToChat});


// Отслеживание url адреса и отображение нужной HTML страницы
app.get('/', function(request, respons) {
    respons.sendFile(__dirname + '/client/public/index.html');
});

app.post('/upload', upload.single('photo'), async (req, res, next) => {
    console.log(req.file)
    console.log("AUF")
    const {originalname, filename} = req.file
    console.log(originalname,filename)
    res.send(JSON.stringify({urlFilename: filename, filename: originalname}))
})

connections = [];
io.sockets.on('connection', (socket) => {
    console.log("Успешное соединение");
    connections.push(socket);

    socket.on("UserDataInf", (data) => {
        let sk = connections[connections.indexOf(socket)]
        sk.idUser = data.id
        sk.userUsername = data.username
    })

    socket.on("channelsUserParticipation", (data) => {
        if (data && data.idChannel) {
            socket.join(data.idChannel)
            io.to(data.idChannel).emit("userJoin", "Join to channel")
        }
        socket.on('sendMessageToChannel', data => {
            console.log(data.idChannel)
            let UPD = {type: "UPD", idChannel: data.idChannel}
            io.to(data.idChannel).emit("newMessagePleaseUpdateHistory", UPD)
        })
    })

    socket.on("addUserToChannel", function (data) {
        console.log(data)
        if (data && data.idFriendUser && data.channelId){
            console.log("ADD",data)
            connections.map(sok => {
                if (sok.idUser == data.idFriendUser) sok.emit("getUserAddToNewChannel", {not: "Вас добавили в канал", channelId: data.channelId})
            })
        }
    })

    socket.on("notificationThatUserWasOutChannel", (data) => {
        if (data && data.userId){
            connections.map(sok => {
                console.log(data.userId,sok.idUser == data.userId)
                if (sok.idUser == data.userId) sok.emit("notificationThatYouWasOutChannel", {not: "Вас исключили из канала"})
            })
        }
    })

    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Отключились");
    });

});

const refreshTokens = (req, res) => {
    const {refreshToken} = req.body;
    console.log(refreshToken)
    let payload
    try {
        console.log("UPDATETOKEN CHECK")
        payload = jwt.verify(refreshToken, secret)
        if (payload.type !== "refresh") {
            res.status(400).json({message: "Это не тот токен который мне нужен"})
            return
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(400).json({message: "Токен устарел"})
            return
        } else if (e instanceof jwt.JsonWebTokenError) {
            res.status(400).json({message: "Токен не токен"})
            return
        }
    }
    Token.findOne({where: {tokenId: payload.id}}).then(token => {
        if (token === null) {
            throw new Error("Токен не найден")
        }
        console.log("User ID GET", token)
        return UpdateTokens(token.userId)
    }).then(tokens => {
        res.json(tokens)
    })

}


app.post('/refresh-tokens', bodyParser.json(), refreshTokens)

server.listen(4000, () => {
    console.log("Server")
});

const getUserByRequest = async (req) => {
    if (!req.headers.authorization || req.headers.authorization == "undefined") {
        return null;
    }
    if (typeof req.headers.authorization !== 'string') {
        return null;
    }
    let tokens = JSON.parse(req.headers.authorization)
    let token = tokens.accessToken
    try {
        const payload = jwt.verify(token, secret)
        if (payload.type !== 'access') {
            return null
        }
        let data = jwt.decode(token, secret)
        if (data && data.userId) {
            return User.findByPk(data.userId)
        }
    } catch (e) {
        console.log("Токе битый или подделан")
        return null;
    }
}

app.use('/graphql',graphqlHTTP(async (req, res) => ({
    schema,
    rootValue: rootResolvers,
    graphiql: true,
    context: {user: await getUserByRequest(req)}
})));


app.use(express.static('public'));


;(async () => {
    await sequelize.sync()
})()



