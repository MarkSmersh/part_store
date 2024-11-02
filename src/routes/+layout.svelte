<script>
	let { children } = $props();
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
</script>

<Header />
{@render children()}
<Footer />

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		border: 0;
	}
</style>