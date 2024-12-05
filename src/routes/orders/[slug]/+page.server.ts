import { jwtDecode } from "$lib/server/jwt";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { em } from "$lib/server";
import { Order } from "$lib/server/models";

export const load: PageServerLoad = async ({ cookies, params }) => {
    const username = jwtDecode(cookies.get("access-token"))?.username;

    const slug = params.slug;

    if (!username) error(400, "Firstly, you need to log in/sign up before using for cart")

    const order = await em.findOne(Order, {
        user: {
            username: username
        },
        id: parseInt(slug)
    }, { populate: ["orderItems.*"] })

    if (!order) error(404);

    const productsSorted = order.orderItems.map((oi) => {
        return {
            id: oi.id,
            product: {
                id: oi.product.id,
                name: oi.product.name,
                image: oi.product.image
            },
            pricePerOne: oi.pricePerOne,
            quantity: oi.quantity
        }
    })

    return {
        id: order.id,
        products: productsSorted,
        address: {
            firstName: order.address.firstName,
            secondName: order.address.secondName,
            phone: order.address.phone,
            postal: order.address.postal,
            street: order.address.street  
        },
        total: order.total,
        comment: order.comment,
        createdAt: order.createdAt
    }
}