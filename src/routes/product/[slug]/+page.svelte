<script lang="ts">
	import { request } from '$lib';
	import Button from '../../ui/Button.svelte';
	import Image from '../../ui/Image.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	async function addToCart() {
		await request(`/api/cart/${data.id}`, 'PATCH');
	}
</script>

<main>
	<div class="product">
		<div class="data">
			<div class="text">
				<h1>{data.name}</h1>
				<p>{data.description}</p>
			</div>
			<div class="price">
				<h2>Cena: {data.price} zł</h2>
				<Button onClick={() => addToCart()}>Dodaj do koszyka</Button>
			</div>
		</div>
		<Image src={data.image} alt={data.name} height={300} />
	</div>
</main>

<style>
	.product {
		display: flex;
		justify-content: space-between;
		gap: 200px;

		.data {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 150%;
		}
	}
</style>
