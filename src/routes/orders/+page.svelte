<script lang="ts">
	import type { PageData } from './$types';
	const { data }: { data: PageData } = $props();
</script>

<main>
	{#if data.orders.length != 0}
		<h1>Orders:</h1>

		<div class="orders">
			{#each data.orders as o}
				<div class="order">
					<a href="/orders/{o.id}"> <h3>ID: {o.id}</h3></a>
					<div class="address">
						<h4>Adresa:</h4>
						<p>Imię: {o.address.firstName}</p>
						<p>Nazwisko: {o.address.secondName}</p>
						<p>Numer telefonu komórkowego: {o.address.phone}</p>
						<p>Ulica i nr: {o.address.street}</p>
					</div>
					<h4>{o.createdAt.toLocaleString()}</h4>
					<h3>{o.total} zł</h3>
				</div>
			{/each}
		</div>
	{:else}
		Aby zobaczyć zamówenia najpierw muszą być dodane
	{/if}
</main>

<style>
	.orders {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.order {
		border: 1px solid gray;
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.address {
		border: 1px solid grey;
		padding: 10px;
	}
</style>
