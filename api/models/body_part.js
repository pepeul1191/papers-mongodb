const Sequelize = require('sequelize');
var db = require('../../config/database');

const BodyPart = db.define('body_parts', {
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

module.exports = BodyPart;