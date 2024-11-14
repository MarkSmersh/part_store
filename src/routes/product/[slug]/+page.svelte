<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	async function addToCart() {
		await fetch(`/api/cart/${data.id}`, {
			method: "PATCH",
		})
	}

	$inspect(data);
</script>

<div class="product-wrapper">
	<div class="product-data">
		<div class="text">
			<h1>{data.name}</h1>
			<p>{data.description}</p>
		</div>
		<div class="price">
			<h2>Price: {data.price}</h2>
			<button class="cart" onclick={() => addToCart()}>Add to the cart</button>
		</div>	
	</div>
	<img src={data.image} alt="123" />
</div>

<style>
	img {
		width: 400px;
	}

	.product-wrapper {
		display: flex;
		width: calc(100% - 192px);
		justify-content: space-between;
		padding: 48px 96px;
		gap: 200px;

		.product-data {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}


	}
</style>
