<script lang="ts">
	import Search from "./Search.svelte";

</script>

<header>
    <a href="/">Sklep z częściami do komputera.</a>
    <Search/>
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

    a {
        color: white;
        text-decoration: solid;
        font-size: 24px;
    }
</style>