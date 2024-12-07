import { em, User } from "$lib/server";
import { jwtDecode } from "$lib/server/jwt";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const username = jwtDecode(cookies.get("access-token"))?.username;

    if (!username) error(400, "Musisz najpierw zalogować, aby uzyskać dostęp do zamówień")

    const user = await em.findOne(User, {
        username: username,
    }, { populate: ['orders.address', 'orders.orderItems.product.image'] })

    if (!user) error(400, "Nie znalieżono użytkownika.");

    const ordersSorted = user.orders.map((o) => {
        return {
            id: o.id,
            address: {
                firstName: o.address.firstName,
                secondName: o.address.secondName,
                street: o.address.street,
                phone: o.address.phone
            },
            productImages: o.orderItems.map((oi) => oi.product.image),
            createdAt: o.createdAt,
            total: o.total,
        }
    }).reverse()

    return {
        orders: ordersSorted
    };
}