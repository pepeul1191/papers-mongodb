const Sequelize = require('sequelize');
const Level = require('./level');
var db = require('../../config/database');

const Member =db.define('members', {
	id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
	code: { 
    type: Sequelize.INTEGER, 
    allowNull: false,  
  },
  dni: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  names: { 
    type: Sequelize.INTEGER, 
    allowNull: false,  
  },
  last_names: { 
    type: Sequelize.INTEGER, 
    allowNull: false,  
  },
  email: { 
    type: Sequelize.INTEGER, 
    allowNull: false,  
  },
  phone: { 
    type: Sequelize.INTEGER, 
    allowNull: false,  
  },
  image_url: { 
    type: Sequelize.INTEGER, 
    allowNull: false,  
  },
});

Member.belongsTo(Level, { foreignKey: 'level_id' });

module.exports = Member;
