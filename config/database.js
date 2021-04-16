const Sequelize = require('sequelize');

module.exports = new Sequelize('database', 'username', 'password', {
	// host: 'localhost',
	dialect: 'sqlite',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	storage: 'db/demo.db',
	define: {
		timestamps: false // true by default
	}
});
