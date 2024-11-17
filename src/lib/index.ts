import { createNotify } from "./notify";

export async function hash(str: string) {
	return btoa(str);
}

export async function request(
	url: string,
	method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
	body: string | null = null
) {
	const res= await fetch(url, {
		method: method,
		headers: 
			body ?
				{
					"Content-Type": "application/json"
				}
				:
				{},
		body: body
	})

	const text = await res.text();

	createNotify({
		message: text,
		statusText: res.statusText,
		status: res.status
	})

	return res;
}