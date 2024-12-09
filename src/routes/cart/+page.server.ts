import { em, User } from '$lib/server';
import { jwtDecode } from '$lib/server/jwt';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const username = jwtDecode(cookies.get('access-token'))?.username;

	if (!username) error(400, 'Musisz najpierw zalogować, aby korzystać z koszyka');

	// TODO: Refactor code by doing populate on all
	// of cases where data was fetched instead
	// not for overall performance, but for the
	// sake like it should be done

	const user = await em.findOne(
		User,
		{
			username: username
		},
		{ populate: ['cart.itemCarts.product'] }
	);

	if (!user) {
		return new Response('Nie ma takiego użytkownika.', { status: 404 });
	}

	let total = 0;

	const cartItemsSorted = user.cart.itemCarts.map((ic) => {
		total += ic.product.price * ic.quantity;

		return {
			id: ic.id,
			product: {
				id: ic.product.id,
				name: ic.product.name,
				description: ic.product.description,
				image: ic.product.image,
				price: ic.product.price
			},
			quantity: ic.quantity
		};
	});

	return {
		cartItems: cartItemsSorted,
		total: total
	};
};
