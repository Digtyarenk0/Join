const sequelize = require('./urldb')
const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    get messages() {
        return this.getMessages()
    }
    get media(){
        return this.getMedia()
    }
}

User.init({
    login: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    }
}, {sequelize, modelName: 'user'});


module.exports = User
