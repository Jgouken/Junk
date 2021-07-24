const Sequelize = require('sequelize');
const Discord = require('discord.js');
const bot = new Discord.Client();

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = require('./models/CurrencyShop')(sequelize, Sequelize.DataTypes);
require('./models/Users')(sequelize, Sequelize.DataTypes);
require('./models/UserItems')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		// await CurrencyShop.upsert({ name: '', cost: 10, use: `Fishing`, description: `` }),
		await CurrencyShop.upsert({ name: 'Black Drum', cost: 10, use: `Fishing`, description: `Ba dum bum!` }),
		await CurrencyShop.upsert({ name: 'Atlantic Bonito', cost: 10, use: `Fishing`, description: `Is it a pirate or Spanish?` }),
		await CurrencyShop.upsert({ name: 'Yellowedge Grouper', cost: 25, use: `Fishing`, description: `The edge of yellow will hug you.` }),
		await CurrencyShop.upsert({ name: 'Rabbitfish', cost: 25, use: `Fishing`, description: `What?` }),
		await CurrencyShop.upsert({ name: 'Hawkfish', cost: 25, use: `Fishing`, description: `Can they see well?` }),
		await CurrencyShop.upsert({ name: 'Cobia', cost: 50, use: `Fishing`, description: `COMBYAAAAAAA` }),
		await CurrencyShop.upsert({ name: 'Croaker', cost: 50, use: `Fishing`, description: `Ribbit?` }),
		await CurrencyShop.upsert({ name: 'Basselet', cost: 50, use: `Fishing`, description: `Very fishy ballet.` }),
		await CurrencyShop.upsert({ name: 'Hickory Shad', cost: 50, use: `Fishing`, description: `Sweet & Smokey.` }),
		await CurrencyShop.upsert({ name: 'Angler Fish', cost: 50, use: `Fishing`, description: `Every Mario underwater section have these.` }),
		await CurrencyShop.upsert({ name: 'Amberjack', cost: 50, use: `Fishing`, description: `Lumber*` }),
		await CurrencyShop.upsert({ name: 'Speckled Hind', cost: 50, use: `Fishing`, description: `Let's not thing about that.` }),
		await CurrencyShop.upsert({ name: 'Whale Shark', cost: 20, use: `Fishing`, description: `Very creative.` }),
		await CurrencyShop.upsert({ name: 'Flounder', cost: 20, use: `Fishing`, description: `Found the L.` }),
		await CurrencyShop.upsert({ name: 'White Marlin', cost: 20, use: `Fishing`, description: `Marlin is a nice name.` }),
		await CurrencyShop.upsert({ name: 'Surgeonfish', cost: 20, use: `Fishing`, description: `Don't ask it for help.` }),
		await CurrencyShop.upsert({ name: 'Pinfish', cost: 20, use: `Fishing`, description: `Not as pointy as you would imagine.` }),
		await CurrencyShop.upsert({ name: 'Catfish', cost: 20, use: `Fishing`, description: `Not as fluffy as you would imagine.` }),
		await CurrencyShop.upsert({ name: 'Seahorse', cost: 20, use: `Fishing`, description: `Aww...` }),
		await CurrencyShop.upsert({ name: 'Oyster Toadfish', cost: 20, use: `Fishing`, description: `That's 3 words shoved into 2.` }),
		await CurrencyShop.upsert({ name: 'Pigfish', cost: 250, use: `Fishing`, description: `Oinkblub.` }),
		await CurrencyShop.upsert({ name: 'Blacktip Shark', cost: 25, use: `Fishing`, description: `Like an old pen?` }),
		await CurrencyShop.upsert({ name: 'Tautog', cost: 25, use: `Fishing`, description: `Gesundheit.` }),
		await CurrencyShop.upsert({ name: 'Bigeye Tuna', cost: 25, use: `Fishing`, description: `*Looks intensely.*` }),
		await CurrencyShop.upsert({ name: 'Stingray', cost: 25, use: `Fishing`, description: `Pet one at the Zoo.` }),
		await CurrencyShop.upsert({ name: 'Silver Perch', cost: 50, use: `Fishing`, description: `I thought that said purse.` }),
		await CurrencyShop.upsert({ name: 'Neddlefish', cost: 50, use: `Fishing`, description: `His friend is Ned.` }),
		await CurrencyShop.upsert({ name: 'Mako Shark', cost: 50, use: `Fishing`, description: `Mak-up your mind.` }),
		await CurrencyShop.upsert({ name: 'Spongebob Squarepants', cost: 10, use: `Fishing`, description: `In a pineapple...underwater.` }),
		await CurrencyShop.upsert({ name: 'Patrick Seastar', cost: 100, use: `Fishing`, description: `His intelligence fluctuates.` }),
		await CurrencyShop.upsert({ name: 'Squidward Tortellini', cost: 100, use: `Fishing`, description: `Patrick's version of his name.` }),

		await CurrencyShop.upsert({ name: 'Trash', cost: 0, use: `Food`, description: `Cold hard garbage with no benefit.` }),
		await CurrencyShop.upsert({ name: 'Water', cost: 10, use: `Food`, description: `Ya know...a little tavern water. +1 health.` }),
		await CurrencyShop.upsert({ name: 'Bread', cost: 100, use: `Food`, description: `Bread. +10 health.` }),
		await CurrencyShop.upsert({ name: 'Apple', cost: 100, use: `Food`, description: `Juicy apple. +10 health.` }),
		await CurrencyShop.upsert({ name: 'Soup', cost: 200, use: `Food`, description: `Warm soup. +20 health.` }),
		await CurrencyShop.upsert({ name: 'Wine', cost: 200, use: `Food`, description: `Bottle o' wine. +20 health. Drink Responsibly.` }),
		await CurrencyShop.upsert({ name: 'Ham', cost: 300, use: `Food`, description: `Warm Famous Tavern Ham. +30 health.` }),
		await CurrencyShop.upsert({ name: 'Bacon', cost: 300, use: `Food`, description: `Bacon. +30 health.` }),
		await CurrencyShop.upsert({ name: 'Cheese Wheel', cost: 500, use: `Food`, description: `A big thing o' cheese. +50 health.` }),
		await CurrencyShop.upsert({ name: 'Cake', cost: 500, use: `Food`, description: `Cake is delicious. +50 health.` }),

		await CurrencyShop.upsert({ name: 'Pea', cost: 10, use: `Farming`, description: `A meal fit for a king.` }),
		await CurrencyShop.upsert({ name: 'Bean', cost: 10, use: `Farming`, description: `The musical fruit.` }),
		await CurrencyShop.upsert({ name: 'Carrot', cost: 50, use: `Farming`, description: `+5 Bonus vision.` }),
		await CurrencyShop.upsert({ name: 'Greens', cost: 50, use: `Farming`, description: `Always have these whilst eating with grandma.` }),
		await CurrencyShop.upsert({ name: 'Beetroot', cost: 50, use: `Farming`, description: `I didn't.` }),
		await CurrencyShop.upsert({ name: 'Potato', cost: 50, use: `Farming`, description: `It flew around my room.` }),
		await CurrencyShop.upsert({ name: 'Banana', cost: 100, use: `Farming`, description: `This is not to go in bread.` }),
		await CurrencyShop.upsert({ name: 'Turnip', cost: 100, use: `Farming`, description: `Turn to the left.` }),
		await CurrencyShop.upsert({ name: 'Wheat', cost: 100, use: `Farming`, description: `Pronounced "hweat."` }),
		await CurrencyShop.upsert({ name: 'Lettuce', cost: 100, use: `Farming`, description: `Crunchy grass.` }),
		await CurrencyShop.upsert({ name: 'Spinach', cost: 100, use: `Farming`, description: `Ew.` }),
		await CurrencyShop.upsert({ name: 'Tomato', cost: 150, use: `Farming`, description: `Tomoto.` }),
		await CurrencyShop.upsert({ name: 'Sugar Cane', cost: 150, use: `Farming`, description: `Can only be placed next to water.` }),
		await CurrencyShop.upsert({ name: 'Strawberry', cost: 150, use: `Farming`, description: `Standard flavor.` }),
		await CurrencyShop.upsert({ name: 'Watermelon', cost: 200, use: `Farming`, description: `Juicy sphere.` }),
		await CurrencyShop.upsert({ name: 'Pumpkin', cost: 200, use: `Farming`, description: `Chewy Sphere.` }),
		await CurrencyShop.upsert({ name: 'Golden Watermelon', cost: 500, use: `Farming`, description: `Crunchy Sphere.` }),

		await CurrencyShop.upsert({ name: 'Will Potion', cost: 15000, use: `Battle`, description: `+25 Will` }),
		await CurrencyShop.upsert({ name: 'Armor', cost: 25000, use: `Battle`, description: `+10 Armor` }),
		await CurrencyShop.upsert({ name: 'Attack Potion', cost: 50000, use: `Battle`, description: `+20 Attack` }),
		await CurrencyShop.upsert({ name: 'Health Potion', cost: 5000, use: `Battle`, description: `Used during battle to restore or up to +500 health.` }),

		await CurrencyShop.upsert({ name: 'Purse', cost: 5, use: `UDrops`, description: `Contains 50 Gold`,}),
		await CurrencyShop.upsert({ name: `Gloves`, cost: 5, use: `UDrops`, description: `Gives you +1 Defense.`,}),
		await CurrencyShop.upsert({ name: `Candy`, cost: 5, use: `UDrops`, description: `Not one from the white van. +5 Health.`,}),
		await CurrencyShop.upsert({ name: 'Dagger', cost: 50, use: `UDrops`, description: `+10 Attack.`,}),
		await CurrencyShop.upsert({ name: 'Sword', cost: 100, use: `UDrops`, description: `+50 Attack.`,}),

		await CurrencyShop.upsert({ name: `Rotten Flesh`, cost: 0, use: `Food`, description: `Practically garbage.`,}),
		await CurrencyShop.upsert({ name: 'Arrow', cost: 10, use: `Drops`, description: `Why did they...have that?`,}),
		await CurrencyShop.upsert({ name: 'Stick', cost: 10, use: `Drops`, description: `It's a stick.`,}),

		await CurrencyShop.upsert({ name: 'Buddy', cost: 1000, use: `Passive`, description: `Sits in your inventory and gives you currency. Use j-act to activate.`,}),
		await CurrencyShop.upsert({ name: 'Double', cost: 500, use: `Passive`, description: `A 2x multiplier for your Buddy!`,}),
		await CurrencyShop.upsert({ name: 'Quintuple', cost: 1000, use: `Passive`, description: `A 5x multiplier for your Buddy!`,}),
		await CurrencyShop.upsert({ name: 'Decuple', cost: 1500, use: `Passive`, description: `A 10x multiplier for your Buddy!`,}),

	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error); 