<script lang="ts">
    interface Product {
        id: number;
        name: string;
        description: string;
        image: string;
        price: number;
    }

    let string = $state("");
    let isShow = $state(false);
    let products: Product[] = $state([])

    async function search() {
        try {
            products = JSON.parse(await (await fetch(`/api/search?q=${string}`)).json())
        } catch (e) {
            products = []
        }
    }
</script>

<div class="input-wrapper">
    <input
        bind:value={string}
        oninput={() => search()}
        placeholder="Search for..."
        onfocus={() => isShow = true}
    />
    <div class="products-wrapper">
        {#if isShow}
            {#each products as p}
                <a class="product-preview" href="/product/{p.id}">
                    <img src={p.image} alt="img" />
                    <div class="text-wrapper">
                        <h5>{p.name}</h5>
                        <p>{p.description}</p>
                        <h6>{p.price}</h6>
                    </div>
                </a>
            {/each}
        {/if}
    </div>
</div>


<style scoped>
    .input-wrapper {
        width: 300px;
    }

    input {
        width: 100%;
    }

    .products-wrapper {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: black;
        position: absolute;
        width: 306px;

        * {
            text-decoration: none;
            color: black;
        }
    }

    .product-preview {
        display: flex;
        background-color: grey;
        height: 70px;
        padding: 8px;
        gap: 8px;

        img {
            height: 100%;
            border-radius: 8px;
        }

        transition: .2s;
    }

    .product-preview:hover {
        background-color: darkgray;
    }

    .text-wrapper {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        gap: 0px;

        h6 {
            align-self: flex-end;
        }

        * {
            margin: 0;
        }
    }
</style>