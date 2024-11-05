<script lang="ts">
	import type { PageData } from './$types';

	let { children, data }: { children: any, data: PageData } = $props();
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
</script>

<Header username={data.username} />
{@render children()}
<Footer />

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		border: 0;
	}
</style>