const Sequelize = require('sequelize');
var db = require('../../config/database');

const Level = db.define('levels', {
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

module.exports = Level;
