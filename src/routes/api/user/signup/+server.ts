import { Cart, em, User } from '$lib/server';
import { passwordHash } from '$lib/server/crypto';
import { jwtAccessToken, jwtSessionToken } from '$lib/server/jwt';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const username = url.searchParams.get('username');

	// FIXME: if not hashed, it will be a big problem for the end user, cause
	// someone, who are listening for incoming data could steal password
	// from user's request. In this case, it need be hashed via client-side bcrypto
	// but I'm kinda tired today, so I'll instead prapare for Kuziola's
	// narzedzia.
	// UPD: Seems HTTPS should deal with that
	const password = url.searchParams.toString().split('password=')[1];

	if (!username || !password) {
		return new Response('Nie ma potrzebowanych atrybutów.', { status: 400 });
	}

	const users = await em.findAll(User, { where: { username: username } });

	if (users.length !== 0) {
		return new Response('Taki użytkownik już istnieje.', { status: 409 });
	}

	const sessionToken = jwtSessionToken(username);
	const accessToken = jwtAccessToken(username);
	const hashedPassword = await passwordHash(password);

	const cart = new Cart();

	const user = em.create(User, {
		username: username,
		password: hashedPassword,
		sessionToken: sessionToken,
		cart: cart
	});

	cart.user = user;

	await em.persistAndFlush([user, cart]);

	cookies.set('access-token', accessToken, { path: '/' });

	return new Response('Zarejestrowany.', { status: 201 });
};
