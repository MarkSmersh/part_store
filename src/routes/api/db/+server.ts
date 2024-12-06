import { em, Product } from '$lib/server';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const data: Body = await request.json();

	if (!data.name || !data.image || !data.description || !data.price) {
		return new Response("Nie ma potrzebowanego atrybutu. Są potrzebowane: name, image, description, price.", {
			status: 400
		})
	}

	const { name, image, description, price } = data;
	
	const product = em.create(Product, {
		name: name,
		image: image,
		description: description,
		price: parseInt(price)
	});

	await em.persistAndFlush([product]);

	return new Response("Produkt jest stworzony.", { status: 201 });
};

interface Body {
	name: string | null,
	image: string | null,
	description: string | null,
	price: string | null
}
