import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '$env/static/private';
import { User } from './models';
import { em } from './db';

export function jwtAccessToken(username: string): string {
	//TODO: this is why server wont work in the future
	return jwt.sign({ username: username }, JWT_TOKEN, { expiresIn: '30d' });
}

export function jwtSessionToken(username: string): string {
	return jwt.sign({ username: username }, JWT_TOKEN, { expiresIn: '60s' });
}

export function jwtVerify(userToken: string) {
	try {
		return jwt.verify(userToken, JWT_TOKEN);
	} catch (e) {
		return false;
	}
}

export async function accessFromSession(userToken: string) {
	try {
		const accessToken = jwt.decode(userToken) as JWTToken;

		if (!accessToken) return undefined;

		const user = await em.findOne(User, { username: accessToken.username });

		if (!user) return undefined;

		const sessionToken = jwt.verify(user.sessionToken, JWT_TOKEN);

		if (!sessionToken) return undefined;

		return jwtAccessToken(accessToken.username);
	} catch (e) {
		return undefined;
	}
}

export function jwtDecode(userToken: string): JWTToken {
	return (jwt.decode(userToken) as JWTToken);
}

interface JWTToken {
	username: string;
}
