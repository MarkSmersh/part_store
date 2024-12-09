import {
	Entity,
	PrimaryKey,
	OneToOne,
	Property,
	Collection,
	OneToMany,
	ManyToOne
} from '@mikro-orm/core';

@Entity()
export class User {
	@PrimaryKey({ type: "int" })
	id!: number;

	@Property({ type: "string", unique: true })
	username!: string;

	@Property({ type: "string" })
	password!: string;

	@Property({ type: "string" })
	sessionToken!: string;

	@OneToOne(() => Cart, { inversedBy: 'user' })
	cart!: Cart;

	@OneToMany(() => Order, 'user')
	orders = new Collection<Order>(this);
}

@Entity()
export class Cart {
	@PrimaryKey({ type: "int" })
	id!: number;

	@OneToOne(() => User, { orphanRemoval: true, mappedBy: 'cart' })
	user!: User;

	@OneToMany(() => ItemCart, 'cart', { eager: true, orphanRemoval: true })
	itemCarts: Collection<ItemCart> = new Collection<ItemCart>(this);
}

@Entity()
export class Product {
	@PrimaryKey({ type: "int" })
	id!: number;

	@Property({ type: "string" })
	name!: string;

	@Property({ type: "string", length: 4000 })
	description!: string;

	@Property({ type: "string" })
	image!: string;

	@Property({ type: "int" })
	price!: number;

	@OneToMany(() => ItemCart, 'product', { orphanRemoval: true })
	itemCarts = new Collection<ItemCart>(this);
}

@Entity()
export class ItemCart {
	@PrimaryKey({ type: "int" })
	id!: number;

	@ManyToOne(() => Cart)
	cart!: Cart;

	@ManyToOne(() => Product)
	product!: Product;

	@Property({ type: "int", default: 0 })
	quantity!: number;
}

@Entity()
export class Order {
	@PrimaryKey({ type: "int" })
	id!: number;

	@OneToMany(() => OrderItem, 'order')
	orderItems = new Collection<OrderItem>(this);

	@ManyToOne(() => Address)
	address!: Address;

	@Property({ type: "string", length: 200 })
	comment?: string;

	@Property({ type: "int" })
	total!: number;

	@ManyToOne(() => User)
	user!: User;

	@Property()
	createdAt = new Date();
}

@Entity()
export class OrderItem {
	@PrimaryKey({ type: "int" })
	id!: number;

	@ManyToOne(() => Order)
	order?: Order;

	@ManyToOne(() => Product)
	product!: Product;

	@Property({ type: "int" })
	quantity!: number;

	@Property({ type: "int" })
	pricePerOne!: number;
}

@Entity()
export class Address {
	@PrimaryKey({ type: "int" })
	id!: number;

	@OneToMany(() => Order, 'address')
	orders = new Collection<Order>(this);

	@ManyToOne(() => User)
	user!: User;

	@Property({ type: "string" })
	firstName!: string;

	@Property({ type: "string" })
	secondName!: string;

	@Property({ type: "string" })
	postal!: string;

	@Property({ type: "string" })
	street!: string;

	@Property({ type: "string" })
	phone!: string;
}
