import { em, User } from '$lib/server';
import { passwordCompare } from '$lib/server/crypto';
import { jwtAccessToken, jwtSessionToken } from '$lib/server/jwt';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const username = url.searchParams.get('username');
	const password = url.searchParams.toString().split('password=')[1];

	if (!username || !password) {
		return new Response('Nie ma potrzebowanych atrybutów.', { status: 400 });
	}

	const user = await em.findOne(User, { username: username });

	if (!user) {
		return new Response('Nie ma takiego użytkownika.', { status: 404 });
	}

	const isPasswordSame = await passwordCompare(password, user.password);

	if (!isPasswordSame) {
		return new Response('Nieprawidlowe dane.', { status: 400 });
	}

	const sessionToken = jwtSessionToken(username);
	const accessToken = jwtAccessToken(username);

	user.sessionToken = sessionToken;

	await em.persistAndFlush([user]);

	cookies.set('access-token', accessToken, { path: '/' });

	return new Response('Zalogowany.', { status: 200 });
};
