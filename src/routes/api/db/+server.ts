import { Product } from '$lib/server';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({}) => {
	await Product.create({
		name: 'Procesor Intel i5-10300H',
		image: 'https://m.media-amazon.com/images/I/51xamvLg6ZL.jpg',
		description: 'Some descriptopn for the product.',
		price: 69
	});

	return new Response();
};
