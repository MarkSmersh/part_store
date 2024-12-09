<script lang="ts">
	import { request } from '$lib';
	import Accordion from '../../ui/Accordion.svelte';
	import Button from '../../ui/Button.svelte';
	import Image from '../../ui/Image.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	async function addToCart() {
		console.log("12331")
		await request(`/api/cart/${data.id}`, 'PATCH');
	}
</script>

<main>
	<div class="product">
		<div class="data">
			<div class="text">
				<h1>{data.name}</h1>

				<Accordion title={'Opis produktu'}>
					<p>{data.description}</p>
				</Accordion>

				<Accordion title={'Dane dodatkowe'}>
					<p>ID produktu: {data.id}</p>
				</Accordion>
			</div>
			<div class="price">
				<h2>Cena produktu: {data.price}.00 zł</h2>
				<Button style="primary" onClick={() => addToCart()}>Dodaj do koszyka</Button>
			</div>
		</div>
		<Image src={data.image} alt={data.name} height={400} />
	</div>
</main>

<style>
	main {
		background-color: var(--primary);
		padding: 100px 100px;

		@media screen and (max-width: 1200px) {
			padding: 20px 20px;
		}
	}

	.product {
		color: var(--primary-text);
		display: flex;
		gap: 100px;
		align-items: center;

		@media screen and (max-width: 1200px) {
			flex-direction: column-reverse;
			gap: 32px;
		}

		.data {
			display: flex;
			flex-direction: column;
			width: 150%;
			gap: 32px;

			@media screen and (max-width: 1200px) {
				width: 100%;
			}

			.text {
				display: flex;
				flex-direction: column;
				gap: 16px;
				white-space: pre-line;
			}

			.price {
				display: flex;
				flex-direction: column;
				gap: 16px;
			}
		}
	}
</style>
