import { Product } from '$lib/server';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({}) => {
	await Product.create({
		name: 'Procesor Intel i5-10300H',
		image: '',
		description: 'Some descriptopn for the product.',
		price: 69
	});

	return new Response();
};
