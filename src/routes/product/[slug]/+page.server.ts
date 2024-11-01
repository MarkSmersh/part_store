import { Product } from "$lib/server";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const p = (await Product.findByPk(params.slug))?.dataValues;

    if (p) return p;

    error(404, 'Not found');
}