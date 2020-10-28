const sequelize = require('./urldb')
const Sequelize = require('sequelize');


class Friend extends Sequelize.Model {
    get users() {
        return this.getUsers()
    }
}

Friend.init({}, {sequelize, modelName: 'friend'});
module.exports = Friend
