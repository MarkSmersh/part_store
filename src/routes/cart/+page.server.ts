import { Cart, em, User } from "$lib/server";
import { jwtDecode } from "$lib/server/jwt";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const username = jwtDecode(cookies.get("access-token"))?.username;

    if (!username) error(400, "Firstly, you need to log in/sign up before using for cart")
    
    const user = await em.findOne(User, {
        username: username
    })

    if (!user) error(404, "No user with so access token")

    const cartItems = user.cart.cartItems.getItems(true);

    const cartItemsSorted = cartItems.map((ic) => {
        return {
            id: ic.id,
            product: {
                id: ic.product.id,
                name: ic.product.name,
                description: ic.product.description,
                image: ic.product.image,
                price: ic.product.price
            },
            quantity: ic.quantity
        }
    })

    return {
        cartItems: cartItemsSorted
    };
}