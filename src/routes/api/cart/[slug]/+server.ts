import { Cart, em, Product, User } from "$lib/server";
import { jwtDecode } from "$lib/server/jwt";
import { ItemCart } from "$lib/server/models";
import type { RequestHandler } from "@sveltejs/kit";

export const PATCH: RequestHandler = async ({ params, cookies }) => {
    const productId = params.slug;

    if (!productId) {
        return new Response("No required slug", { status: 400 });
    }
    
    const username  = jwtDecode(cookies.get("access-token"))?.username;

    const product = await em.findOne(Product, parseInt(productId));

    if (!product) {
        return new Response("No such product", { status: 404 });
    }

    const user = await em.findOne(User, { username: username })

    if (!user) {
        return new Response("User not found by current access token", { status: 404 });
    }

    const cartRef = em.getReference(Cart, user.cart.id);

    const cartItem = cartRef.cartItems.find((c) => c.id === product.id);

    if (!cartItem) {
        const newItemCart = em.create(ItemCart, {
            cart: cartRef,
            product: product,
            quantity: 1
        })

        cartRef.cartItems.add(newItemCart);
        await em.persistAndFlush([cartRef, newItemCart]);
    } else {
        cartItem.quantity = cartItem.quantity + 1;
        await em.persistAndFlush([cartItem]);
    }

    return new Response("Product was added to cart", { status: 201 });
}

export const DELETE: RequestHandler = async ({ cookies, params }) => {
    const productId = params.slug;

    if (!productId) {
        return new Response("No required slug", { status: 400 });
    }

    const username = jwtDecode(cookies.get("access-token"))?.username;

    const user = await em.findOne(User, { username: username })

    if (!user) {
        return new Response("User not found by current access token", { status: 404 });
    }

    user.cart.cartItems.remove((ic) => ic.product.id === parseInt(productId));

    await em.persistAndFlush(user);

    return new Response("Product was removed");
}