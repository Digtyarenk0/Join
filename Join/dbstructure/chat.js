const sequelize = require('./urldb')
const Sequelize = require('sequelize');

class Chat extends Sequelize.Model {
    get messages() {
        return this.getMessages()
    }

    get users() {
        return this.getUsers()
    }
}

Chat.init({
    name: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    }
}, {sequelize, modelName: 'chat'});

module.exports = Chat
