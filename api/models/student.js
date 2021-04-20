const Sequelize = require('sequelize');
var db = require('../../config/database');

module.exports = db.define('students', {
	id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
	name: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  code: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
});
