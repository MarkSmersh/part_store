import { Cart, User } from '$lib/server';
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
	const password = url.searchParams.toString().split('password=')[1];

	if (!username || !password) {
		return new Response('No required params', { status: 400 });
	}

	const users = await User.findAll({ where: { username: username } });

	if (users.length !== 0) {
		return new Response('User with such username exists', { status: 409 });
	}

	const sessionToken = jwtSessionToken(username);
	const accessToken = jwtAccessToken(username);
	const hashedPassword = await passwordHash(password);

	const cart = await Cart.create();

	const user  = await User.create({
		username: username,
		password: hashedPassword,
		sessionToken: sessionToken,
		CartId: cart.dataValues.id
	});

	await cart.update({ UserId: user.dataValues.id });

	cookies.set('access-token', accessToken, { path: '/' });

	return new Response('Registered succesfully', { status: 201 });
};
