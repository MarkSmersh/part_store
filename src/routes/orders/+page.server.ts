import { em, User } from "$lib/server";
import { jwtDecode } from "$lib/server/jwt";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const username = jwtDecode(cookies.get("access-token"))?.username;

    if (!username) error(400, "Firstly, you need to log in/sign up before using for cart")

    const user = await em.findOne(User, {
        username: username,
    }, { populate: ['orders'] })

    if (!user) error(400, "Firstly, you need to log in/sign up to watch your orders");

    const ordersSorted = user.orders.map((o) => {
        return {
            id: o.id,
            address: {
                firstName: o.address.firstName,
                secondName: o.address.secondName,
                street: o.address.street,
                phone: o.address.phone
            },
            createdAt: o.createdAt,
            total: o.total
        }
    })

    return {
        orders: ordersSorted
    };
}