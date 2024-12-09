import { createNotify } from './notify';

export async function hash(str: string) {
	return btoa(str);
}

export async function request(
	url: string,
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
	body: string | null = null
) {
	console.log("123")

	const res = await fetch(url, {
		method: method,
		headers: body
			? {
					'Content-Type': 'application/json'
				}
			: {},
		body: body
	});

	const text = await res.text();

	console.log("text: ")
	console.log(res.status);

	createNotify({
		message: text,
		status: res.status
	});

	return res;
}
