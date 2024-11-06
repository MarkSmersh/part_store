import { em, Product } from '$lib/server';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({}) => {
	const product = em.create(Product, {
		name: 'Pierla chmielowa',
		image: 'https://piweczko.net/piwo,19,perla-chmielowa',
		description: 'Dobre piwko',
		price: 1488
	});

	await em.persistAndFlush([product]);

	return new Response();
};
