import { em } from '$lib/server';
import { jwtDecode } from '$lib/server/jwt';
import { Address, Order, OrderItem, User } from '$lib/server/models/models';
import type { RequestHandler } from './$types';

function isOk(data: string | null) {
	if (!data) return false;
	if (data === '') return false;
	if (data.replaceAll(' ', '') === '') return false;
	return true;
}

export const POST: RequestHandler = async ({ cookies, request }) => {
	const data: Body = await request.json();

	const username = jwtDecode(cookies.get('access-token'))?.username;

	if (!username) {
		return new Response('Nie ma access tokenu.', { status: 404 });
	}

	if (
		!data ||
		!isOk(data.firstName) ||
		!isOk(data.secondName) ||
		!isOk(data.postal) ||
		!isOk(data.street) ||
		!isOk(data.phone)
	) {
		return new Response('Nie ma potrzebowanych atrybutów albo są nieprawidlowo zapisane.', {
			status: 400
		});
	}

	const { firstName, secondName, postal, street, comment, phone } = data;

	const user = await em.findOne(
		User,
		{
			username: username
		},
		{ populate: ['cart.itemCarts.product'] }
	);

	if (!user) {
		return new Response('Nie ma takiego użytkownika.', { status: 404 });
	}

	if (user.cart.itemCarts.length <= 0) {
		return new Response('Koszyk jest pusty.', { status: 400 });
	}

	const orderItems = user.cart.itemCarts.map((ic) =>
		em.create(OrderItem, {
			product: ic.product,
			quantity: ic.quantity,
			pricePerOne: ic.product.price
		})
	);

	const address = em.create(Address, {
		user: user.id,
		firstName: firstName as string,
		secondName: secondName as string,
		street: street as string,
		postal: postal as string,
		phone: phone as string
	});

	let total = 0;

	orderItems.forEach((o) => (total += o.pricePerOne * o.quantity));

	const order = em.create(Order, {
		user: user.id,
		address: address,
		orderItems: orderItems,
		comment: comment,
		createdAt: new Date(),
		total: total
	});

	user.cart.itemCarts.removeAll();

	await em.persistAndFlush([address, ...orderItems, order]);

	return new Response('Zamówienie jest stworzone.', { status: 201 });
};

interface Body {
	firstName: string | null;
	secondName: string | null;
	postal: string | null;
	street: string | null;
	comment: string | null;
	phone: string | null;
}
