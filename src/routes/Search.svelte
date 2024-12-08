<script lang="ts">
	import { goto } from '$app/navigation';
	import { isSearch } from '$lib/state';
	import { blur, fly } from 'svelte/transition';

	interface Product {
		id: number;
		name: string;
		description: string;
		image: string;
		price: number;
	}

	let string = $state('');
	let isActive = $state(false);
	let products: Product[] = $state([]);

	async function search() {
		try {
			products = JSON.parse(await (await fetch(`/api/search?q=${string}`)).json());
		} catch (e) {
			products = [];
		}
	}

	isSearch.subscribe((v) => isActive = v);
</script>

{#if isActive}
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of nth) -->
	<div transition:blur class="search-wrapper">
		<div class="close" onclick={() => isSearch.set(false)}>❌</div>
		<div class="search">
			<input
				transition:fly={{ delay: 50, y: -200 }}
				class="input"
				placeholder="Wyszukiwanie..."
				bind:value={string}
				oninput={() => search()}
			/>
			{#if products.length > 0}
				<div class="products" transition:blur>
					{#each products as p}
						<div
							onclick={() => {
								goto(`/product/${p.id}`);
								isSearch.set(false);
							}}
							class="product"
							transition:blur={{ duration: 200 }}
						>
							<img src={p.image} alt={p.name} />
							<div class="text">
								<h2>{p.name}</h2>
								<p>{p.description}</p>
							</div>
							<div class="price">
								<h3>Cena: {p.price}</h3>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style scoped>
	.close {
		position: absolute;
		top: 30px;
		right: 30px;
		font-size: 24px;
		cursor: pointer;
	}

	.search-wrapper {
		width: 600px;
		background-color: var(--primary-transparent);
		backdrop-filter: blur(10px) brightness(40%);
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		z-index: 69;
	}

	.search {
		margin: 20px 100px;
		display: flex;
		flex-direction: column;
		gap: 16px;

		@media screen and (max-width: 1200px) {
			margin: 100px 10px;
		}
	}

	.input {
		width: calc(100% - 32px);
		padding: 16px;
		background-color: var(--secondary-transparent);
		color: var(--primary);
		border-radius: 8px;
		font-size: 18px;
		border: 1px solid var(--primary-text);
	}

	.products {
		display: flex;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		color: white;
		background: var(--primary-transparent);
		border: 1px solid var(--primary-text);
	}

	.product {
		display: flex;
		height: 100px;
		padding: 10px;
		gap: 20px;
		align-items: center;
		cursor: pointer;
		transition: 0.2s;

		@media screen and (max-width: 1200px) {
			display: grid;
			height: fit-content;
		}

		img {
			object-fit: contain;
			width: 100px;
			height: 100%;
			background-color: white;
			border-radius: 8px;
			background: var(--primary-transparent);
			border: 1px solid var(--primary-text);
			object-fit: cover;

			@media screen and (max-width: 1200px) {
				width: 100%;
				height: 120px;
			}
		}

		.text {
			display: flex;
			flex-direction: column;
			border-radius: 8px;
			color: black;
			padding: 8px;
			height: calc(100% - 16px);
			flex: 1;
			overflow: hidden;
			justify-content: center;
			background: var(--primary-transparent);
			border: 1px solid var(--primary-text);
			color: var(--primary-text);

			p,
			h2 {
				width: 100%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}

		.price {
			background-color: white;
			color: black;
			border-radius: 8px;
			height: 100%;
			text-align: right;
			display: flex;
			align-items: center;
			border: 1px solid var(--primary-text);
			background: var(--primary-transparent);
			background: radial-gradient(circle, rgba(255, 0, 0, 1) 0%, var(--primary-transparent) 100%);

			@media screen and (max-width: 1200px) {
				padding: 8px 8px;
				height: calc(100% - 16px);
				justify-content: center;
			}

			h3 {
				transform: rotate(-45deg);
				color: var(--primary-text);
				border: 2px solid var(--primary-text);
				width: 100%;
				text-align: center;

				@media screen and (max-width: 1200px) {
					transform: rotate(0);
					border: 0;
				}
			}
		}
	}

	.product:hover {
		scale: 97%;
	}
</style>
