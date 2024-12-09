import { em, User } from '$lib/server';
import { jwtDecode } from '$lib/server/jwt';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const username = jwtDecode(cookies.get('access-token'))?.username;

	if (!username) error(400, 'Musisz najpierw zalogować, aby korzystać z koszyka.');

	const user = await em.findOne(
		User,
		{
			username: username
		},
		{ populate: ['cart.itemCarts'] }
	);

	if (!user) {
		error(404, 'Nie znalieżono użytkownika.');
	}

	if (user.cart.itemCarts.length <= 0) error(400, 'Koszyk jest pusty.');

	return;
};
