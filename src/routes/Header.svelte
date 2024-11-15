<script lang="ts">
	import { goto, invalidate, invalidateAll } from "$app/navigation";
	import { request } from "$lib";
	import Search from "./Search.svelte";
    let { username } = $props();

</script>

<header>
    <a href="/">Sklep z częściami do komputera.</a>
    <div>
        {#if username}
                <button onclick={() => goto("/cart")}>
                    Cart
                </button>
                <p>{username}</p>
                <button onclick={async () => {
                    await request("/api/user/logout");
                    invalidateAll();
                }}>Log out</button>
            {:else}
                <button onclick={() => goto("/login")}>Log in</button>
                <button onclick={() => goto("/signup")}>Sign up</button>
        {/if}
        <Search/>
    </div>
</header>

<style>
    header {
        background-color: #333333;
        display: flex;
        justify-content: space-between;
        padding: 24px;
        width: calc(100% - 48px);
        /* position: fixed; */
        top: 0;
    }

    div {
        display: flex;
        gap: 16px;
        align-items: center;
    }

    a {
        color: white;
        text-decoration: solid;
        font-size: 24px;
        justify-self: flex-end;
    }
</style>