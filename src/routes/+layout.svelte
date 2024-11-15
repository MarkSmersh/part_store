<script lang="ts">
	import type { PageData } from './$types';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Notify from './Notify.svelte';

	let { children, data }: { children: any, data: PageData } = $props();
</script>

<Header username={data.username} />
<Notify  />
{@render children()}
<Footer />

<style>
	:global(html, body, *) {
		margin: 0;
		padding: 0;
		border: 0;
	}
</style>