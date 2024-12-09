import { em, Product } from '$lib/server';
import type { RequestHandler } from '@sveltejs/kit';
import { ADMIN_TOKEN } from "$env/static/private"

export const POST: RequestHandler = async ({ request }) => {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (token !== ADMIN_TOKEN) {
        return new Response('Odmowa dostępu.', { status: 401 });
    }

	const data: Body[] = await request.json();

    if (data.length === undefined || data.length <= 0) {
        return new Response('Dane są nieprawidlowe.', { status: 400 });
    }

    let count = 0;

    for (let i = 0; i < data.length; i++) {
        const p = data[i];

        if (!p.name || !p.image || !p.description || !p.price) {
            return new Response(`W elemencie #${count} nie ma potrzebowanych atrybutów. Są potrzebowane: name, image, description, price.`, {
                status: 400
            })
        }

        const { name, image, description, price } = p;

        if (p.description.length > 4000) {
            return new Response(`W elemencie #${count} atrybut jest większy o ${4000} bajtów`, {
                status: 400
            })
        }

        const product = em.create(Product, {
            name: name,
            image: image,
            description: description,
            price: parseInt(price)
        });

        em.persist(product);

        count++;
    }

    await em.flush();

	return new Response(`Są stworzono o ${count} produktów.`, { status: 201 });
};

interface Body {
	name: string | null,
	image: string | null,
	description: string | null,
	price: string | null
}