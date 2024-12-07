<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import { request } from '$lib';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';

	let { data }: { data: PageData } = $props();

	async function deleteCartItem(cartItem: number) {
		await request(`/api/cart/${cartItem.toString()}`, 'DELETE');
		invalidateAll();
	}
</script>

<main>
	{#if data.cartItems && data.cartItems?.length !== 0}
		<div class="cart">
			<div class="cart-items">
				{#each data.cartItems as ci}
					<Card
						title={ci.product.name}
						description={ci.product.description}
						img={ci.product.image}
						price={ci.product.price}
						quantity={ci.quantity}
						onClick={() => goto(`/product/${ci.product.id}`)}
						onRemove={() => deleteCartItem(ci.product.id)}
					/>
				{/each}
			</div>
			<h2>Cena ogólna: { data.total }.00 zł</h2>
			<Button onClick={() => goto('/cart/order')}>Założyć zamówenie</Button>
		</div>
	{:else}
		Koszyka niema
	{/if}
</main>

<style>
	main

	.cart {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.cart-items {
		display: flex;
		gap: 16px;
	}
</style>
