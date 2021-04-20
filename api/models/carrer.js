const Sequelize = require('sequelize');
var db = require('../../config/database');

module.exports = db.define('carrers', {
	id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
	name: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
});
