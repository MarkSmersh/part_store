import { Entity, PrimaryKey, OneToOne, Property, ManyToMany, Collection, OneToMany, ManyToOne } from '@mikro-orm/core';

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

	@OneToOne(() => Cart, { inversedBy: "user" })
	cart!: Cart;
}

@Entity()
export class Cart {
	@PrimaryKey()
	id!: number;

	@OneToOne(() => User, { orphanRemoval: true, mappedBy: "cart" })
	user!: User

	@OneToMany(() => ItemCart, "cart", { orphanRemoval: true })
	cartItems: Collection<ItemCart> = new Collection<ItemCart>(this);
}

@Entity()
export class Product {
	@PrimaryKey()
	id!: number;

	@Property()
	name!: string;

	@Property()
	description!: string;

	@Property()
	image!: string;

	@Property()
	price!: number;
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