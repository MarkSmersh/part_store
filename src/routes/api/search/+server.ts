import { Product } from "$lib/server";
import { json, type RequestHandler } from "@sveltejs/kit";
import { Op } from "sequelize";

export const GET: RequestHandler = async ({ url }) => {
    const q = url.searchParams.get("q");

    if (!q) {
        return new Response("No required params", { status: 200 });
    }

    const productModels = await Product.findAll({
        where: {
            name: {
                [Op.substring]: q 
            }
        },
        limit: 5,
        order: [['id', 'DESC']]
    })

    const products = productModels.map((p) => p.dataValues);

    return json(JSON.stringify(products), { status: 200 });
}