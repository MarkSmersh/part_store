<script lang="ts">
	import type { PageData } from "./$types";

    const { data }: { data: PageData } = $props();
</script>

<div class="order">
    <h2>ID: {data.id}</h2>

    <div class="products">
        {#each data.products as p}
            <div class="product">
                <a href="/product/{p.product.id}">
                    <h3>{p.product.name}</h3>
                </a>
                <img src="{p.product.image}" alt="{p.product.name}" />
                <h4>{p.pricePerOne} zł za sztukę</h4>
                <h4>Ilość: {p.quantity}</h4>
            </div>
        {/each}
    </div>

    <div class="address">
        <h4>Address:</h4>
        <p>Firstname: {data.address.firstName}</p>
        <p>Secondname: {data.address.secondName}</p>
        <p>Phone: {data.address.phone}</p>
        <p>Street: {data.address.street}</p>
    </div>

    <h2>Suma ogólna: {data.total} zł</h2>
    
    {#if data.comment}
        <h2>Comentarz:</h2>
        <p>{data.comment}</p>
    {/if}

    <h2>Stworzono o: {data.createdAt.toLocaleString()}</h2>
</div>

<style>
    * {
        /* color: red;
        transform: scaleY(150%) rotate(5deg);
        border-radius: 900px;
        box-shadow: 20px 20px yellow;
        opacity: 95%; */
    }

    .order {
        border: 1px solid grey;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        /* background-color: brown; */
    }

    .products {
        display: flex;
        gap: 20px;
        /* background-color: greenyellow; */
    }

    .product {
        border: 1px solid gray;
        padding: 20px;
        /* background-color: blueviolet; */
    }

    .address {
        border: 1px solid grey;
        padding: 20px;
        /* background-color: magenta; */
    }

    img {
        height: 100px;
    }
</style>