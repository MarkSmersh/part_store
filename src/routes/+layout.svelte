<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { PageData } from './$types';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Notify from './Notify.svelte';

	let { children, data }: { children: Snippet, data: PageData } = $props();
</script>

<Header username={data.username} />
<Notify  />
<!-- <main> -->
	{@render children()}
<!-- </main> -->
<Footer />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

	:global(html, body, *) {
		margin: 0;
		padding: 0;
		border: 0;
		font-family: "Lato", sans-serif;
	}

	:root {
		--primary: #222222;
		--primary-transparent: rgb(51, 51, 51, .2);
		--primary-text: #ffffff;

		--secondary: #f3f3f3;
		--secondary-text: #333333;
	}

	:global(main) {
		padding: 20px 100px;
		min-height: 100vh;
	}
</style>