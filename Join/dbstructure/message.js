const sequelize = require('./urldb')
const Sequelize = require('sequelize');


class Message extends Sequelize.Model {
    get user() {
        return this.getUser()
    }
}

Message.init({
    content: {
        type: Sequelize.TEXT,
        unique: false,
        allowNull: false
    },
}, {sequelize, modelName: 'message'});

module.exports = Message
