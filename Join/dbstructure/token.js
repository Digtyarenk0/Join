const sequelize = require('./urldb')
const Sequelize = require('sequelize');

class Token extends Sequelize.Model {
}

Token.init({
    tokenId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {sequelize, modelName: 'token'});


module.exports = Token
