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
	@PrimaryKey()
	id!: number;

	@Property({ unique: true })
	username!: string;

	@Property()
	password!: string;

	@Property()
	sessionToken!: string;

	@OneToOne(() => Cart, { inversedBy: 'user' })
	cart!: Cart;

	@OneToMany(() => Order, 'user')
	orders = new Collection<Order>(this);
}

@Entity()
export class Cart {
	@PrimaryKey()
	id!: number;

	@OneToOne(() => User, { orphanRemoval: true, mappedBy: 'cart' })
	user!: User;

	@OneToMany(() => ItemCart, 'cart', { eager: true, orphanRemoval: true })
	itemCarts: Collection<ItemCart> = new Collection<ItemCart>(this);
}

@Entity()
export class Product {
	@PrimaryKey()
	id!: number;

	@Property()
	name!: string;

	@Property({ length: 4000 })
	description!: string;

	@Property()
	image!: string;

	@Property()
	price!: number;

	@OneToMany(() => ItemCart, 'product', { orphanRemoval: true })
	itemCarts = new Collection<ItemCart>(this);
}

@Entity()
export class ItemCart {
	@PrimaryKey()
	id!: number;

	@ManyToOne()
	cart!: Cart;

	@ManyToOne(() => Product)
	product!: Product;

	@Property({ default: 0 })
	quantity!: number;
}

@Entity()
export class Order {
	@PrimaryKey()
	id!: number;

	@OneToMany(() => OrderItem, 'order')
	orderItems = new Collection<OrderItem>(this);

	@ManyToOne(() => Address)
	address!: Address;

	@Property()
	comment?: string;

	@Property()
	total!: number;

	@ManyToOne(() => User)
	user!: User;

	@Property()
	createdAt = new Date();
}

@Entity()
export class OrderItem {
	@PrimaryKey()
	id!: number;

	@ManyToOne(() => Order)
	order?: Order;

	@ManyToOne(() => Product)
	product!: Product;

	@Property()
	quantity!: number;

	@Property()
	pricePerOne!: number;
}

@Entity()
export class Address {
	@PrimaryKey()
	id!: number;

	@OneToMany(() => Order, 'address')
	orders = new Collection<Order>(this);

	@ManyToOne(() => User)
	user!: User;

	@Property()
	firstName!: string;

	@Property()
	secondName!: string;

	@Property()
	postal!: string;

	@Property()
	street!: string;

	@Property()
	phone!: string;
}
