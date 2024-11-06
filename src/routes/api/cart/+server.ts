import { Cart, em, Product, User } from "$lib/server";
import { jwtDecode } from "$lib/server/jwt";
import type { RequestHandler } from "@sveltejs/kit";

// FIXME: MODULE DOESNT WORK

export const GET: RequestHandler = async ({ cookies, url }) => {
    const productId = url.searchParams.get("product");

    if (!productId) {
        return new Response("No required params", { status: 400 });
    }
    
    const username  = (jwtDecode(cookies.get("access-token") as string)).username;

    const product = await em.findOne(Product, parseInt(productId));

    if (!product) {
        return new Response("No such product", { status: 404 });
    }

    const user = await em.findOne(User, { username: username })

    if (!user) {
        return new Response("User not found by current access token", { status: 404 });
    }

    const updateProduct = await em.upsert(Cart, { id: user.cart.id, products: parseInt(productId)});

    await em.persistAndFlush([updateProduct]);

    return new Response("Product was added to cart", { status: 201 });
}