import { em, Product } from '$lib/server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;

	if (!params.slug) {
		error(404, 'Not found');
	}

	const p = await em.findOne(Product, parseInt(slug));

	console.log(p)

	if (p) return {
		id: p.id,
		name: p.name,
		description: p.description,
		image: p.image,
		price: p.price
	}

	error(404, 'Not found');
};
