const sequelize = require('./urldb')
const Sequelize = require('sequelize');


class UserToChat extends Sequelize.Model {
    get users() {
        return this.getUsers()
    }

    //
    // get chats(){
    //     return this.getChats()
    // }
}

UserToChat.init({}, {sequelize, modelName: 'usertochat'});
module.exports = UserToChat
