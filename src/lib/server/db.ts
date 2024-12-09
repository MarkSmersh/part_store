import { MikroORM } from '@mikro-orm/postgresql';
import { DB_STRING } from '$env/static/private';
import { Address, Cart, ItemCart, Order, OrderItem, Product, User } from "$lib/server/models/models"

export const orm = await MikroORM.init({
	entities: [Address, Cart, ItemCart, Order, OrderItem, Product, User],
	clientUrl: DB_STRING,
	allowGlobalContext: true,
	forceEntityConstructor: true,
});

export const em = orm.em;
