const {Op} = require("sequelize")
const jwt = require('jsonwebtoken')
const secret = require('./secret')
const bcrypt = require("bcrypt");
const User = require('./user')
const Chat = require('./chat');
const UserToChat = require('./usertochat')
const Friend = require('./friend')
const Message = require('./message');
const Token = require('./token')
const authToken = require('./authToken')
const Media = require('./media')
const UpdateTokens = require('./authToken')
const uploadPath = `${__dirname}/public/media/`;
const upload = require('multer')({dest: uploadPath})


module.exports = {
    async registration({user: {username, login, password}}) {
        if (username.length < 4) throw new Error("Имя полователя должно быть больше 4х символов")
        if (login.length < 4) throw new Error("Логин должен содержать 3+ символов")
        if (password.length < 6) throw new Error("Пароль должен содержать минимум 6 символов")
        let checkLogin = await User.findOne({where: {login: login}})
        if (checkLogin) throw new Error("Извините, этот логин уже занят")
        let Valuehash = await bcrypt.hash(password, 10)
        return await User.create({
            username: username,
            login: login,
            password: Valuehash,
        })
    },
    async checkLogin({login}) {
        if (!login) throw new Error("Пожалуйста, введите логин для проверки")
        let user = await User.findOne({where: {login: login}})
        if (!user) return JSON.stringify({busy: false})
        return JSON.stringify({busy: true})
    },
    async login({login, password}) {
        if (login && password) {
            let user = await User.findOne({where: {login}})
            if (user) {
                let validPassword = await bcrypt.compare(password, user.password)
                if (validPassword === true) {
                    return await UpdateTokens(user.id)
                } else {
                    return new Error("Пароли не совпадают")
                }
            }
        }
        return new Error("Учётная запись не найдена")
    },
    async refreshTokens({refTokens}) {
        let payload
        try {
            payload = jwt.verify(refTokens, secret)
            if (payload.type !== 'refresh') {
                return "Токен не валидный"
            }
        } catch (e) {
            if (e instanceof jwt.TokenExpiredError) {
                throw new Error("Token истек")
            } else if (e instanceof jwt.JsonWebTokenError) {
                throw new Error("Токен не валидный")
            }
        }
        return await Token.findOne({where: {tokenId: payload.id}}).then(async token => {
            if (token === null) {
                throw new Error("Токен не валидный по поиску")
            }
            return await UpdateTokens(token.userId).then(tokens => {
                return tokens
            })
        })
        // })
    },
    async createChat({chat}, {user}) {
        if (!user) throw new Error('Пожалуйста, войдите в аккаунт')
        console.log({chat})
        if (!chat.name) chat.name = "Chat name"
        return await user.createChat({...chat})
    }
    ,
    async addUserToChat({chat}, {user}) {
        if (!user) throw new Error('Пожалуйста, войдите в аккаунт')
        if (!chat.chatId) throw new Error('Пожалуйста, введите ID чата')
        if (!chat.userId) throw new Error('Пожалуйста, введите ID пользователя')
        return await User.findOne({where: {id: chat.userId}})
            .then(async user => {
                if (!user) throw new Error('Такого пользователя не существует');
                return await Chat.findOne({where: {id: chat.chatId}})
                    .then(async chat => {
                        if (!chat) throw new Error('Такого чата не существует');
                        return await UserToChat.findOne({
                            where: {
                                chatId: chat.id,
                                userId: user.id
                            }
                        }).then(async check => {
                            if (check) throw new Error("Этот пользователь уже есть в чате");
                            await user.addChat(chat);
                            return "Пользователь добавлен"
                        })
                    });
            })
    }
    ,
    async deleteUserOfChannel({idChannel, idUser}, {user}) {
        if (!user) throw new Error('Пожалуйста, войдите в аккаунт')
        let checkDeluser = await UserToChat.findOne({where: {userId: idUser, chatId: idChannel}})
            .then(check => {
                if (!check) throw new Error('Пользователь не состоит в чате')
                return check
            })
        let checkUserToDel = await UserToChat.findOne({where: {userId: user.id}})
            .then(async check => {
                if (!check) throw new Error('Вы не состоите в этом чате')
                return check
            })
        console.log(idChannel, idUser)
        return await UserToChat.destroy({where: {userId: idUser, chatId: idChannel}}).then(del => {
            if (!del) throw new Error("Произовшла ошибка")
            return {
                text: "Пользовтаель был удален из канала",
                content: idUser
            }
        })

    },
    async addFriend({id}, {user}) {
        if (!user) throw new Error('Пожалуйста, войдите в аккаунт')
        return await Friend.findOne({where: {userId: user.id, friendId: id}}).then(async check => {
            if (check) throw new Error('Вы и так друзья')
            return await User.findByPk(id).then(async friend => {
                let frndadd = await user.createFriend({friendId: id})
                return {
                    id: friend.id,
                    username: friend.username
                }
            })

        })
    }
    ,
    async postMessage({message}, {user}) {
        if (!user) throw new Error('Пожалуйста, войдите в аккаунт')
        await UserToChat.findOne({
            where: {
                [Op.and]: [{userId: user.id},
                    {chatId: message.chatId}]
            }
        }).then(check => {
            if (!check) throw new Error('Вы не состоите в этом чате')
        })
        let msg = await user.createMessage({
            chatId: message.chatId,
            content: message.content
        })
        return msg
    }
    ,
    async postMessageMedia({id, url, channelId}, {user}){
        console.log(id,url,channelId)
        // if (!user) throw new Error('Пожалуйста, войдите в аккаунт')
        // await UserToChat.findOne({
        //     where: {
        //         [Op.and]: [{userId: user.id},
        //             {chatId: msgMediaInfo.chatId}]
        //     }
        // }).then(check => {
        //     if (!check) throw new Error('Вы не состоите в этом чате')
        // })
        let msg = await user.createMessage({
            chatId: channelId,
            content: url
        })
        console.log(msg)
        let updMedia = await Media.findByPk(id).then(async media => {
            if (!media) throw new Error('Ошибка загрузки')
            console.log("FAFA",media)
            media.messageId = msg.id
            await media.save()
        })
        console.log("Lols",updMedia)
        return {
            idMsg: msg.id,
            url:  url,
            idMedia: id
        }
    }
    ,
    async upsertMessage({message}, {user}) {
        if (!user) throw new Error('Пожалуйста, войдите в аккаунт')
        if (!message.id) {
            let msg = await user.createMessage({...message})
            return msg;
        } else { //update
            let msg = await Message.findByPk(message.id)
            if (user.id === msg.userId) {
                msg.content = message.content
                return await msg.save()
            } else {
                throw new Error('Мамкин Хакир')
            }
        }
    },
    async uploadUserMedia({file}) {
        // upload.
        // const {originalname, filename} = file
        // console.log(originalname, filename)
        // let img = await Media.create({urlFilename: filename, filename: originalname})
        // console.log(img)
        // return {
        //     id: img.id,
        //     url: `media/${img.urlFilename}`
        // }
    }
    ,
    async getMessagesByChat({id}, {user}) {
        if (!user) throw new Error('Пожалуйста, войдите в аккаунт')
        return await UserToChat.findOne({where: {userId: user.id}}).then(async check => {
            if (!check) throw new Error('Вы не состоите в этом чате')
            return await Message.findAll({where: {chatId: id}, order: [['createdAt', 'DESC']], limit: 15})
        })


    }
    ,
    async getChatsByUsers({query}, {user}) {
        if (!user) throw new Error('Пожалуйста, войдите в аккаунт')
        return await UserToChat.findAll({where: {userId: user.id}}).then(async chats => {
            return chats.map(async item => {
                let chat = await Chat.findByPk(item.dataValues.chatId)
                return chat
            })
        })
    }
    ,
    async getChatsUs({query}, {user}) {
        if (!user) throw new Error('Пожалуйста, войдите в аккаунт')
        return await UserToChat.findAll({where: {userId: user.id}})
            .then(async chats => {
                return chats.map(async item => {
                    let chat = await Chat.findByPk(item.dataValues.chatId).then(
                        async chat => {
                            let lastMsg = await Message.findOne({
                                where: {chatId: chat.dataValues.id},
                                order: [['createdAt', 'DESC']]
                            })
                            return {
                                id: chat.dataValues.id,
                                name: chat.dataValues.name,
                                lastMessage: lastMsg
                            }
                        }
                    )
                    return chat
                })
            })
    }
    ,
    async getChatById({id}, {user}) {
        if (!user) throw new Error('Пожалуйста, войдите в аккаунт')
        await UserToChat.findOne({
            where: {
                [Op.and]: [{userId: user.id},
                    {chatId: id}]
            }
        }).then(check => {
            if (!check) throw new Error('Вы не состоите в этом чате')
        })
        let chat = await Chat.findByPk(id)
        let message = await Message.findAll({where: {chatId: id}, order: [['createdAt', 'DESC']], limit: 15})
        let users = await UserToChat.findAll({where: {chatId: id}}).then(usersId => {
            return usersId.map(async item => {
                return await User.findByPk(item.userId)
            })
        })
        return {
            id: chat.id,
            name: chat.name,
            messages: message,
            users: users
        }
    }
    ,
    async getUsersByUsername({username}) {
        let result = await User.findAll({where: {username: {[Op.startsWith]: username}}, limit: 20})
        if (result.length === 0) return "Упс, таких нет"
        return result
    }
    ,
    async getUsersByChannel({id}, {user}) {
        if (!user) throw new Error('Пожалуйста, войдите в аккаунт')
        return await UserToChat.findAll({where: {chatId: id}}).then(async arrUserId => {
                return arrUserId.map(async item => {
                    return await User.findByPk(item.userId)
                })
            }
        )

    },
    async getFriends({username}, {user}) {
        if (!user) throw new Error('Пожалуйста, войдите в аккаунт')
        return await Friend.findAll({where: {userId: user.id}}).then(async data => {
            if (!data) throw new Error("Я не нашел ваших друзей")
            return data.map(async friend => {
                return await User.findOne({where: {id: friend.friendId, username: {[Op.startsWith]: username}}})
            })
        })

    }
    ,
    async getUser({id}) {
        let user = await User.findByPk(id)
        return user
    }
    ,

    async getMessage({id}) {
        return await Message.findByPk(id)
    }
    ,

    async getUsers() {
        return await User.findAll()
    }
    ,

    async getMessages() {
        return await Message.findAll()
    }
}



