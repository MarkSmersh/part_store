<script lang="ts">
	import { goto } from '$app/navigation';
	import Accordion from '../../ui/Accordion.svelte';
	import Card from '../../ui/Card.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<main>
	<div class="order">
		<h2>Identyfikator zamówenia: #{data.id}</h2>

		<Accordion title="Produkty">
            <div class="products">
                {#each data.products as p}
                    <Card
                        title={p.product.name}
                        img={p.product.image}
                        price={p.pricePerOne}
                        quantity={p.quantity}
                        onClick={() => goto(`/product/${p.product.id}`)}
                    />
                {/each}
            </div>
        </Accordion>

		<Accordion title={'Dane adresowe'}>
			<div class="address">
				<p>Imię: {data.address.firstName}</p>
				<p>Nazwisko: {data.address.secondName}</p>
				<p>Numer telefonu komórkowego: {data.address.phone}</p>
				<p>Ulica i nr: {data.address.street}</p>
			</div>
		</Accordion>

		{#if data.comment}
			<Accordion title={"Komentarz do zamówenia"}>
                <p>"{data.comment}"</p>
            </Accordion>
		{/if}

        <h2>Suma ogólna: {data.total}.00 zł</h2>
		<h2>Stworzono o: {data.createdAt.toLocaleString("pl-PL", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })}</h2>
	</div>
</main>

<style>
	.order {
		border: 1px solid var(--secondary);
        border-radius: 8px;
		display: flex;
		flex-direction: column;
		gap: 20px; 
		padding: 20px;
		background: linear-gradient(225deg, var(--accent) 0%, rgba(0,0,0,0) 100%);
	}

	.products {
		display: flex;
		gap: 20px;
        flex: 1;

		@media screen and (max-width: 1200px) {
			display: grid;
		}
		/* background-color: greenyellow; */
	}
</style>
