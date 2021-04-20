const Sequelize = require('sequelize');
var db = require('../../config/database');

// Student
module.exports = db.define('users', {
	id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
	user: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  password: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  email: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  activationKey: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  resetKey: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
});
