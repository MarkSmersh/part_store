<script lang="ts">
	import { request } from '$lib';
	import Button from '../../ui/Button.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	async function addToCart() {
		await request(`/api/cart/${data.id}`, 'PATCH');
	}
</script>

<main>
	<div class="product-wrapper">
		<div class="product-data">
			<div class="text">
				<h1>{data.name}</h1>
				<p>{data.description}</p>
			</div>
			<div class="price">
				<h2>Price: {data.price}</h2>
				<Button onClick={() => addToCart()}>Add to the cart</Button>
			</div>
		</div>
		<img src={data.image} alt="123" />
	</div>
</main>

<style>
	img {
		width: 400px;
	}

	.product-wrapper {
		display: flex;
		justify-content: space-between;
		gap: 200px;

		.product-data {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
</style>
