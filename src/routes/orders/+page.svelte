<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '../ui/Button.svelte';
	import Image from '../ui/Image.svelte';
	import type { PageData } from './$types';
	import Array from './Array.svelte';
	import box from '$lib/assets/box.webp';

	const { data }: { data: PageData } = $props();
</script>

<main>
	{#if data.orders.length != 0}
		<div class="orders">
			{#each data.orders as o}
				<div class="order-wrapper">
					<div class="order">
						<div class="address-wrapper">
							Adresa:
							<div class="adress">
								<p><b>Imię:</b> {o.address.firstName}</p>
								<p><b>Nazwisko:</b> {o.address.secondName}</p>
								<p><b>Numer telefonu:</b> {o.address.phone}</p>
								<p><b>Ulica i nr:</b> {o.address.street}</p>
							</div>
						</div>
						<div class="products">
							<b>Produkty:</b>
							<Array images={o.productImages} />
						</div>
						<div class="date">
							Stworzno o:
							<p>
								{o.createdAt.toLocaleString('pl-PL', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
									hour: '2-digit',
									minute: '2-digit'
								})}
							</p>
						</div>
						<div class="price">
							Cena ogólna:
							<p>
								{o.total}.00 zł
							</p>
						</div>
					</div>
					<Button onClick={() => goto(`/orders/${o.id}`)}>Szczególy zamówenia</Button>
				</div>
			{/each}
		</div>
	{:else}
		<div class="no-orders">
			<div class="text">
				<h1>📦 Na teraz nie masz zamówień</h1>
				<p>Najpierw musisz założyc chociażby jedną zamówienie</p>
			</div>
			<Image src={box} alt={'Bazowane takie zamówienie'} height={400} />
		</div>
	{/if}
</main>

<style>
	.no-orders {
		display: flex;
		gap: 200px;
	}

	.text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 16px;
		width: 100%;
	}

	.orders {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.order-wrapper {
		border: 1px solid var(--secondary);
		border-radius: 8px;
		padding: 20px;
		background: linear-gradient(225deg, var(--accent) 0%, rgba(0, 0, 0, 0) 100%);
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.order {
		display: flex;
		align-items: center;
		height: 120px;
		gap: 32px;
	}

	.products {
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-items: flex-start;
		height: 100%;
		flex: 1;
	}

	.date,
	.price,
	.address-wrapper {
		display: flex;
		font-weight: 600;
		flex-direction: column;
		height: 100%;
		gap: 20%;
	}

	.date {
		width: 15%;
	}

	p {
		font-weight: 500;
	}
</style>
