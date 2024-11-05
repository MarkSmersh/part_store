import { DataTypes as DT, type ModelDefined, type Optional } from 'sequelize';
import { sq } from './db';

interface User {
	id: number;
	username: string;
	password: string;
	sessionToken: string;
	CartId: number
}

export const User: ModelDefined<User, Optional<User, 'id'>> = sq.define(
	'User',
	{
		username: {
			type: DT.STRING,
			unique: true
		},
		password: DT.STRING,
		sessionToken: DT.STRING,
		cartId: DT.INTEGER
	},
	{ modelName: "user", tableName: "users" }
);

interface Cart {
	id: number;
	UserId: number;
}

export const Cart: ModelDefined<Cart, Optional<Cart, 'id'>> = sq.define(
	'Cart',
	{
		id: {
			type: DT.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		}
	},
	{ modelName: "cart", tableName: "carts" }
);

interface Product {
	id: number;
	name: string;
	description: string;
	image: string;
	price: number;
}

export const Product: ModelDefined<Product, Optional<Product, 'id'>> = sq.define(
	'Product',
	{
		name: DT.CITEXT,
		description: DT.CITEXT,
		image: DT.STRING,
		price: DT.INTEGER
	},
	{ modelName: "product", tableName: "products" }
);

// interface Review {
// 	id: number;
// 	rate: number;
// 	text: string;
// }

// export const Review: ModelDefined<Review, Optional<Review, 'id'>> = sq.define(
// 	'Review',
// 	{
// 		rate: DT.INTEGER,
// 		text: DT.TEXT('medium')
// 	},
// 	{ tableName: 'reviews' }
// );

// interface Category {
// 	id: number;
// 	name: string;
// 	description: string;
// 	image: string;
// }

// export const Category: ModelDefined<Category, Optional<Category, 'id'>> = sq.define(
// 	'Category',
// 	{
// 		name: DT.STRING,
// 		description: DT.STRING,
// 		image: DT.STRING
// 	},
// 	{ tableName: 'categories' }
// );

Cart.belongsTo(User);
User.belongsTo(Cart);
Cart.belongsToMany(Product, { through: "carts_products" });