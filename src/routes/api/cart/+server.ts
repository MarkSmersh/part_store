import { Cart, Product, User } from "$lib/server";
import { jwtDecode } from "$lib/server/jwt";
import type { RequestHandler } from "@sveltejs/kit";

// FIXME: MODULE DOESNT WORK

export const GET: RequestHandler = async ({ cookies, url }) => {
    const productId = url.searchParams.get("product");

    if (!productId) {
        return new Response("No required params", { status: 400 });
    }
    
    const username  = (jwtDecode(cookies.get("access-token") as string)).data;

    const product = await Product.findByPk(parseInt(productId));

    if (!product) {
        return new Response("No such product", { status: 404 });
    }

    const user = await User.findOne({ where: { username: username } });

    if (!user) {
        return new Response("User not found by current access token", { status: 404 });
    }

    console.log(user.dataValues);

    const cart = await Cart.findByPk(user.dataValues.CartId);

    if (!cart) {
        return new Response("Cart not found", { status: 404 });
    }

    // cart.update({ UserId })

    // TODO: 
    return new Response("Product was added to cart", { status: 201 });
}