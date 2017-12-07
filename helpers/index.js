const { Product } = require('../db/models/product');
const { ObjectID } = require('mongodb');

function makeCart(user) {
	let cart = [];
	while (user.cart.length > 0) {
		let item = user.cart.pop();
		let isNew = true;

		for (let i = 0; i < cart.length; i++) {
			if (item.name === cart[i].name && item.size === cart[i].size) {
				isNew = false;
				cart[i].quantity++;
			}
		}

		if (isNew) {
			item.quantity = 1;
			cart.push(item);
		}
	}
	return cart;
}

function splitAndMakeArray(productObj) {
	let products = [];
	let sizes = productObj.size.split(',').filter(entry => {
		return entry.trim();
	});
	let stock = productObj.stock.split(',').filter(entry => {
		return entry.trim();
	});

	for (let i = 0; i < stock.length; i++) {
		products[i] = {};
		products[i].name = productObj.name;
		products[i].designer = productObj.designer;
		products[i].category = productObj.category;
		products[i].price = productObj.price;
		products[i].description = productObj.description;
		products[i].size = sizes[i];
		products[i].color = productObj.color;
		products[i].stock = stock[i];
	}

	return products;
}

function seedData() {
	const users = [
		{
			_id: new ObjectID(),
			username: 'dave123',
			password: 'password1',
			level: 1
		},
		{
			_id: new ObjectID(),
			username: 'steven',
			password: '821viin21v',
			level: 0
		}
	];

	const products = [
		{
			name: 'Shiny Boots',
			designer: 'Fancy Pants',
			category: 'Boots',
			price: '155.99',
			description: "It's unlike anything else you've ever experienced.",
			size: '9',
			stock: 3
		},
		{
			name: 'Shiny Boots',
			designer: 'Fancy Pants',
			category: 'Boots',
			price: '155.99',
			description: "It's unlike anything else you've ever experienced.",
			size: '9.5',
			stock: 0
		},
		{
			name: 'Shiny Boots',
			designer: 'Fancy Pants',
			category: 'Boots',
			price: '155.99',
			description: "It's unlike anything else you've ever experienced.",
			size: '10',
			stock: 5
		},
		{
			name: 'Glittery Jeans',
			designer: 'Afflection',
			category: 'Bottoms',
			price: '89.99',
			description:
				"They're endorsed by everybody who does MMA and could totally, definitely beat you up if they weren't so drunk.",
			size: '32',
			color: 'Shiny',
			stock: 20
		},
		{
			name: 'Glittery Jeans',
			designer: 'Afflection',
			category: 'Bottoms',
			price: '89.99',
			description:
				"They're endorsed by everybody who does MMA and could totally, definitely beat you up if they weren't so drunk.",
			size: '34',
			color: 'Shiny',
			stock: 0
		},
		{
			name: 'Lives 105',
			designer: 'Lives Jeans',
			category: 'Bottoms',
			price: '49.99',
			description: "A cool classic fit that you can't wait to wear",
			size: '32',
			color: 'Blue',
			stock: 3
		},
		{
			name: 'Extra Glittery Jeans',
			designer: 'Afflection',
			category: 'Bottoms',
			price: '189.99',
			description: "Don't look directly into them, you might go blind",
			size: '34',
			color: 'Shiny',
			stock: 20
		},
		{
			name: 'Stripey Shirt',
			designer: 'Donnery Biltram',
			category: 'Tops',
			price: '89.99',
			description: 'Experience the beauty of stripes, in shirt form',
			size: 'Medium',
			stock: 20
		},
		{
			name: 'Wrist Watch',
			designer: 'Gun-It',
			category: 'Accesories',
			price: '99.99',
			description: 'It tells time, and looks cool.',
			color: 'Shiny',
			stock: 6
		}
	];

	Product.remove({}).then(() => {
		setTimeout(() => {
			Product.insertMany(products);
		}, 500);
	});
}

module.exports = { makeCart, splitAndMakeArray, seedData };
