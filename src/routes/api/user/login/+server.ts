import { em, User } from '$lib/server';
import { passwordCompare, passwordHash } from '$lib/server/crypto';
import { jwtAccessToken, jwtSessionToken } from '$lib/server/jwt';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const username = url.searchParams.get('username');
	const password = url.searchParams.toString().split('password=')[1];

	if (!username || !password) {
		return new Response('No required params', { status: 400 });
	}

	const user = await em.findOne(User, { username: username });

	if (!user) {
		return new Response('No user with such username.', { status: 404 });
	}

	const isPasswordSame = await passwordCompare(password, user.password);

	if (!isPasswordSame) {
		return new Response('Incorrect auth data.', { status: 400 });
	}

	const sessionToken = jwtSessionToken(username);
	const accessToken = jwtAccessToken(username);

	const updateUser = await em.upsert(User, { id: user.id, sessionToken: sessionToken });

	await em.persistAndFlush([updateUser])

	cookies.set('access-token', accessToken, { path: '/' });

	return new Response('Signed successfully', { status: 200 });
};
