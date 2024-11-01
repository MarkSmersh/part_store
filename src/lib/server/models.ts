import { DataTypes as DT, type ModelDefined, type Optional } from "sequelize";
import { sq } from "./db";

interface User {
    id: number;
    username: string;
    password: string;
}

type UserAttributes = Optional<User, 'id'>;

export const User: ModelDefined<User, UserAttributes> = sq.define('User', {
    username: DT.STRING,
    password: DT.STRING,
});

interface Cart {
    id: number;
}

export const Cart: ModelDefined<
    Cart,
    Optional<Cart, 'id'>
> = sq.define("Cart", {
    id: {
        type: DT.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
})

interface Product {
    id: number,
    name: string,
    description: string,
    image: string,
    price: number
}

export const Product: ModelDefined<
    Product,
    Optional<Product, "id">
> = sq.define('Product', {
    name: DT.STRING,
    description: DT.TEXT("long"),
    image: DT.STRING,
    price: DT.INTEGER
})

interface Review {
    id: number,
    rate: number,
    text: string
}

export const Review: ModelDefined<
    Review,
    Optional<Review, "id">
>
= sq.define("Review", {
    rate: DT.INTEGER,
    text: DT.TEXT("medium")
})

interface Category {
    id: number,
    name: string,
    description: string,
    image: string
}

export const Category: ModelDefined<
    Category,
    Optional<Category, "id">
>
= sq.define("Category", {
    name: DT.STRING,
    description: DT.TEXT("long"),
    image: DT.STRING
})

User.hasOne(Cart)
Cart.hasMany(Product)
Product.hasMany(Review)
Review.hasOne(User)
Category.hasMany(Product)