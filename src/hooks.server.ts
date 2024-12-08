import { redirect, type Handle, type HandleFetch } from '@sveltejs/kit';
import { jwtVerify, accessFromSession } from '$lib/server/jwt';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {	
	return fetch(request);
};

export const handle: Handle = async ({ event, resolve }) => {
	if (
        event.url.pathname.startsWith('/api') &&
        !( 
            event.url.pathname.split('/').includes('user')
            || event.url.pathname.split('/').includes('search')
			|| event.url.pathname.split('/').includes('product')
        )
    ) {
		const accessToken = event.cookies.get('access-token');

		if (!accessToken) {
			return new Response('Odmowa dostępu. Nie zalogowany.', { status: 401 });
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

	// console.log('DATABASE INIT COMPLETE');
})();
