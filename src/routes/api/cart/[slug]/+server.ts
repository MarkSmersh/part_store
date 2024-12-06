import { em, Product, User } from "$lib/server";
import { jwtDecode } from "$lib/server/jwt";
import { ItemCart } from "$lib/server/models";
import { Collection } from "@mikro-orm/core";
import type { RequestHandler } from "@sveltejs/kit";

export const PATCH: RequestHandler = async ({ params, cookies }) => {
    const productId = params.slug;

    if (!productId) {
        return new Response("Nie ma potrzebowanego slagu.", { status: 400 });
    }
    
    const username  = jwtDecode(cookies.get("access-token"))?.username;

    const product = await em.findOne(Product, parseInt(productId));

    if (!product) {
        return new Response("Nie ma takiego produktu.", { status: 404 });
    }

    const user = await em.findOne(User, { username: username })

    if (!user) {
        return new Response("Nie znalieżono użytkownika.", { status: 404 });
    }

    const fetchItemCarts = await em.findAll(ItemCart, { 
        where: {
            cart: user.cart
        }
    })

    user.cart.itemCarts = new Collection<ItemCart>(user.cart, fetchItemCarts);

    const cartItem = user.cart.itemCarts.find((c) => c.product.id === product.id);

    if (!cartItem) {
        const newItemCart = em.create(ItemCart, {
            cart: user.cart,
            product: product,
            quantity: 1
        })

        user.cart.itemCarts.add(newItemCart);
        await em.persistAndFlush([user.cart, newItemCart]);
    } else {
        cartItem.quantity = cartItem.quantity + 1;
        await em.persistAndFlush([cartItem]);
    }

    return new Response("Produkt jest dodany do koszyka.", { status: 201 });
}

export const DELETE: RequestHandler = async ({ cookies, params }) => {
    const productId = params.slug;

    if (!productId) {
        return new Response("Nie ma potrzebowanego slagu.", { status: 400 });
    }

    const username = jwtDecode(cookies.get("access-token"))?.username;

    const user = await em.findOne(User, { username: username })

    if (!user) {
        return new Response("Nie znalieżono użytkownika.", { status: 404 });
    }

    const fetchItemCarts = await em.findAll(ItemCart, { 
        where: {
            cart: user.cart
        }
    })

    user.cart.itemCarts = new Collection<ItemCart>(user.cart, fetchItemCarts);

    user.cart.itemCarts.remove((ic) => ic.product.id === parseInt(productId));

    await em.persistAndFlush(user);

    return new Response("Produkt jest usunięty.");
}