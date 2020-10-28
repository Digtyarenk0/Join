const uuid = require('uuid');
const jwt = require('jsonwebtoken')
const secret = require('./secret')

const Token = require('./token')
const User = require('./user')

const tok = {
    secret: secret,
    tokens: {
        access: {
            type: "access",
            expiresIn: 30
        },
        refresh: {
            type: "refresh",
            expiresIn: "1d"
        }
    }
}

const generatorAccessToken = (userId,username) => {
    const payload = {
        userId,
        username,
        type: tok.tokens.access.type
    }

    return jwt.sign(payload, secret, {expiresIn: 60})
}

const generateRefreshToken = () => {
    const payload = {
        id: uuid.v4(),
        type: tok.tokens.refresh.type
    }
    debugger
    return {
        id: payload.id,
        token: jwt.sign(payload, secret, {expiresIn: '1d'})
    }
}


const replaceDbRefreshToken = (tokenId, userId) => Token.findOne({where: {userId: userId}})
    .then(async tokenBd => {
        if (tokenBd) {
            tokenBd.destroy()
        }
    }).then(() => {
        Token.create({tokenId: tokenId, userId: userId})
    })


const UpdateTokens = async (userId) => {
    let username = await User.findByPk(userId).then(user => {
        return user.username
    })
    const accessToken = generatorAccessToken(userId, username)
    const refreshToken = generateRefreshToken()

    return replaceDbRefreshToken(refreshToken.id, userId).then(() => {
        return {
            accessToken,
            refreshToken: refreshToken.token
        }
    })
}


module.exports = UpdateTokens