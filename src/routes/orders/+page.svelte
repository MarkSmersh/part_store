<script lang="ts">
	import type { PageData } from "./$types";
    const { data }: { data: PageData } = $props();
</script>

{#if data.orders.length != 0}
    <h1>Orders:</h1>
    
    <div class="orders">
        {#each data.orders as o}
            <div class="order">
                <h3>ID: {o.id}</h3>
                <div class="address">
                    <h4>Address:</h4>
                    <p>Firstname: {o.address.firstName}</p>
                    <p>Secondname: {o.address.secondName}</p>
                    <p>Phone: {o.address.phone}</p>
                    <p>Street: {o.address.street}</p>
                </div>
                <h4>{o.createdAt.toLocaleString()}</h4>
                <h3>{o.total} zł</h3>
            </div>
        {/each}
    </div>
{:else}
    There are no orders before it creation
{/if}

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