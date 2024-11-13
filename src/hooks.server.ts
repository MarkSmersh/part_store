import { redirect, type Handle } from '@sveltejs/kit';
import { jwtVerify, accessFromSession } from '$lib/server/jwt';
import { orm } from '$lib/server';

export const handle: Handle = async ({ event, resolve }) => {
	if (
        event.url.pathname.startsWith('/api') &&
        !( 
            event.url.pathname.split('/').includes('user')
            || event.url.pathname.split('/').includes('search')
        )
    ) {
		const accessToken = event.cookies.get('access-token');

		if (!accessToken) {
			return new Response('Access Denied', { status: 401 });
		}

		const isTokenOk = jwtVerify(accessToken);

		if (isTokenOk) {
			const response = await resolve(event);
			return response;
		}

        const newAccessToken = await accessFromSession(accessToken);

		if (newAccessToken) {
			event.cookies.set('access-token', newAccessToken, { path: '/', httpOnly: true });
            const response = await resolve(event);
			return response;
		}

		redirect(303, '/login');
	}

	const response = await resolve(event);
	return response;
};

(async () => {
	// DATABASE CURSED TECHNIQUE...
	// ...DISMANTLE

	// await orm.schema.refreshDatabase();

	console.log('DATABASE INIT COMPLETE');
})();
