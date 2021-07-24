module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		emoji: {
			type: DataTypes.STRING,
			defaultValue: `💰`,
			allowNull: false,
		},
		balance: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
        },
        attack: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
			allowNull: false,
        },
        armor: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
        },
        will: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
        },
		health: {
			type: DataTypes.INTEGER,
			defaultValue: 10,
			allowNull: false,
		},
		hasBuddy: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		hasAutoSell: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		hasAutoEat: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		buddyEarnings: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		buddyName: {
			type: DataTypes.STRING,
			defaultValue: `Buddy`,
			allowNull: false,
		},
		buddyDescription: {
			type: DataTypes.STRING,
			defaultValue: `(none)`,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};