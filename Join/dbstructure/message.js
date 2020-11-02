const sequelize = require('./urldb')
const Sequelize = require('sequelize');


class Message extends Sequelize.Model {
    get user() {
        return this.getUser()
    }
    get chat() {
        return this.getChat()
    }
}

Message.init({
    content: {
        type: Sequelize.TEXT,
        unique: false,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM,
        values: ['text','photo'],
        allowNull: false
    }
}, {sequelize, modelName: 'message'});

module.exports = Message
