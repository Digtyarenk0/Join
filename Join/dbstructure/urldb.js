const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:admin@localhost/joinbd');

module.exports = sequelize
