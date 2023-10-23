const Sequelize = require('sequelize');
const Exercise = require('./exercise');
const Member = require('./member');
var db = require('../../config/database');

const ExerciseMember = db.define('exercises_members', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true ,
  },
  reps: { 
    type: Sequelize.INTEGER, 
    allowNull: false,  
  },
  sets: { 
    type: Sequelize.INTEGER, 
    allowNull: false,  
  },
});

ExerciseMember.belongsTo(Exercise, { foreignKey: 'exercise_id' });
ExerciseMember.belongsTo(Member, { foreignKey: 'member_id' });

module.exports = ExerciseMember;