import { Product } from "$lib/server";
import { json, type RequestHandler } from "@sveltejs/kit";
import { em } from "$lib/server/db"
import { QueryOrder } from "@mikro-orm/core";

export const GET: RequestHandler = async ({ url }) => {
    const q = url.searchParams.get("q");

    if (!q) {
        return new Response("Nie ma potrzebowanych atrybutów.", { status: 400 });
    }

    const products = await em.findAll(Product, {
        where: {
            name: { $ilike: `%${q}%` },
        },
        limit: 5,
        orderBy: { id: QueryOrder.DESC }
    })

    return json(JSON.stringify(products), { status: 200 });
}