import { jwtDecode } from "$lib/server/jwt";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { em } from "$lib/server";
import { Order } from "$lib/server/models";

export const load: PageServerLoad = async ({ cookies, params }) => {
    const username = jwtDecode(cookies.get("access-token"))?.username;

    const slug = params.slug;

    if (!username) error(400, "Aby korzystać z koszyka musisz najpierw zalogować.")

    const order = await em.findOne(Order, {
        user: {
            username: username
        },
        id: parseInt(slug)
    }, { populate: ["orderItems.*"] })

    if (!order) error(404, "Nie ma takiego zamówenia.");

    const productsSorted = order.orderItems.map((oi) => {
        return {
            id: oi.id,
            product: {
                id: oi.product.id,
                name: oi.product.name,
                image: oi.product.image,
                description: oi.product.description
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