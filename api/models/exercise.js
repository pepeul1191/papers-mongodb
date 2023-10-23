const Sequelize = require('sequelize');
const BodyPart = require('./body_part');
var db = require('../../config/database');

const Exercise = db.define('exercises', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
  name: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  image_url: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  video_url: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  description: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
});

Exercise.belongsTo(BodyPart, { foreignKey: 'body_part_id' });

module.exports = Exercise;