import { jwtDecode } from '$lib/server/jwt';
import type { LayoutServerLoad } from './$types';

// TODO: Better to check is session token expired here

export const load: LayoutServerLoad = ({ cookies }) => {
	const accessToken = cookies.get('access-token');

	if (!accessToken) return;

	const data = jwtDecode(accessToken);

	if (!data) return;

	return {
		username: data.username
	};
};
