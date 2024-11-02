<script>
	let { children } = $props();
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
</script>

<Header />
{@render children()}
<Footer />
