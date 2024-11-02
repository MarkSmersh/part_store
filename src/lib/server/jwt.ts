import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '$env/static/private';
import { User } from './models';

export function jwtAccessToken(username: string): string {
	//TODO: this is why server wont work in the future
	return jwt.sign({ data: username }, JWT_TOKEN, { expiresIn: '60s' });
}

export function jwtSessionToken(username: string): string {
	return jwt.sign({ data: username }, JWT_TOKEN, { expiresIn: '30d' });
}

export function jwtVerify(userToken: string): boolean {
	try {
		jwt.verify(userToken, JWT_TOKEN);

		return true;
	} catch (e) {
		return false;
	}
}

export async function accessFromSession(userToken: string) {
	try {
		const accessToken = jwt.decode(userToken) as JWTToken;

		if (!accessToken) return undefined;

		const user = await User.findOne({ where: { username: accessToken.data } });

		if (!user) return undefined;

		const sessionToken = jwt.verify(user.dataValues.sessionToken, JWT_TOKEN);

		if (!sessionToken) return undefined;

		return jwtAccessToken(accessToken.data);
	} catch (e) {
		return undefined;
	}
}

interface JWTToken {
	data: string;
}
