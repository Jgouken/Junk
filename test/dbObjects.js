const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Users = require('./models/Users')(sequelize, Sequelize.DataTypes);
const CurrencyShop = require('./models/CurrencyShop')(sequelize, Sequelize.DataTypes);
const UserItems = require('./models/UserItems')(sequelize, Sequelize.DataTypes);

UserItems.belongsTo(CurrencyShop, { foreignKey: 'item_id', as: 'item' });

/* eslint-disable-next-line func-names */
Users.prototype.addItem = async function(item, amount) {
	if (!amount) {
		amount = 1
	}
	var number = Number(amount)
	if (isNaN(number)) {
		throw console.error(`Item amount must be a number.`);
	}
	const userItem = await UserItems.findOne({
		where: { user_id: this.user_id, item_id: item.id },
	});

	if (userItem) {
		userItem.amount += number;
		userItem.save();
		return;
	} else {
		UserItems.create({ user_id: this.user_id, item_id: item.id, amount: number });
		return;
	}
};

Users.prototype.removeItem = async function(item, amount) {
	if (!amount) {
		amount = 1
	}
	var number = Number(amount)
	if (isNaN(number)) {
		throw console.error(`Item amount must be a number.`);
	}
	const userItem = await UserItems.findOne({
		where: { user_id: this.user_id, item_id: item.id },
	});

	if (userItem) {
		userItem.amount -= number;
		if (userItem.amount <= 0) {
			UserItems.destroy({ where: {user_id: this.user_id, item_id: item.id} });
		}
		return userItem.save();
	}
};

/* eslint-disable-next-line func-names */
Users.prototype.getItems = async function() {
	return await UserItems.findAll({
		where: { user_id: this.user_id },
		include: ['item'],
	});
};

module.exports = { Users, CurrencyShop, UserItems };