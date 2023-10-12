const Sequelize = require('sequelize');
var db = require('../../config/database');

module.exports = db.define('pokemons', {
	id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
	name: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  number: { 
    type: Sequelize.INTEGER, 
    allowNull: false,  
  },
  weight: { 
    type: Sequelize.FLOAT, 
    allowNull: false,  
  },
  height: { 
    type: Sequelize.FLOAT, 
    allowNull: false,  
  },
  image_url: { 
    type: Sequelize.STRING, 
    allowNull: false,  
  },
  generation_id: { 
    type: Sequelize.INTEGER, 
    allowNull: false,  
  },
});
