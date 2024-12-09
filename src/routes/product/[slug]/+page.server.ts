import { em, Product } from '$lib/server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;

	if (!params.slug) {
		error(404, 'Nie ma slagu.');
	}

	if (slug === "-1") {
		error(500, "Brawo, znajdowałes przykol.")
	} 

	const p = await em.findOne(Product, parseInt(slug));

	if (p) return {
		id: p.id,
		name: p.name,
		description: p.description,
		image: p.image,
		price: p.price
	}

	error(404, 'Not znalieżono takiego produktu.');
};
