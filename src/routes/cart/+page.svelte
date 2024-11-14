<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

    async function deleteProduct(productId: string) {
        await fetch(`/api/cart/${productId}`, {
            method: "DELETE"
        });
		invalidateAll();
    }

	$inspect(data);
</script>

{#if data.cartItems && data.cartItems?.length !== 0}
	{#each data.cartItems as item}
		<div class="product">
			<div>
				<img height="100" src={item.product.image} alt="productimage" />
				<div>
					<h3>{item.product.name}</h3>
					<p>{item.product.description}</p>
				</div>
			</div>
			<div>
				<p>{item.quantity} szt.</p>
				<button onclick={() => deleteProduct(item.product.id.toString())}> DELETE </button>
			</div>
		</div>
	{/each}
{:else}
	Your cart is currently empty. Search somethind and than add it to cart via button on the bottom!
{/if}

<style>
	.product {
		border: 1px solid black;
		margin: 20px 100px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px 20px;
	}

    .product > div {
        display: flex;
        gap: 20px;
    }
</style>
