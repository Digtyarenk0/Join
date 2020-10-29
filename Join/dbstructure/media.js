const sequelize = require('./urldb')
const Sequelize = require('sequelize');

class Media extends Sequelize.Model {
}
Media.init({
    urlFilename: Sequelize.STRING,
    filename: Sequelize.STRING,
},{ sequelize, modelName: 'media' })

module.exports = Media
