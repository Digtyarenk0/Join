const sequelize = require('./urldb')
const Sequelize = require('sequelize');

class Media extends Sequelize.Model {
    get user() {
        return this.getUser()
    }
}
Media.init({
    urlFilename: Sequelize.STRING,
    filename: Sequelize.STRING,
},{ sequelize, modelName: 'media' })

module.exports = Media
