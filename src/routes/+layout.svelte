<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { PageData } from './$types';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Notify from './Notify.svelte';
	import Menu from './Menu.svelte';
	import Search from './Search.svelte';

	let { children, data }: { children: Snippet; data: PageData } = $props();
</script>

<Header username={data.username} />
<Notify />
<Menu username={data.username} />
<Search />
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
		font-family: 'Lato', sans-serif;
	}

	:root {
		--primary: #222222;
		--primary-transparent: rgb(51, 51, 51, 0.2);
		--primary-text: #ffffff;

		--secondary: #f3f3f3;
		--secondary-transparent: rgb(243, 243, 243, 0.5);
		--secondary-text: #000000;

		--accent: hsl(240, 100%, 20%);

		--mobile-screen: 1200px;
	}

	:global(main) {
		padding: 20px 100px;
		min-height: 100vh;
		background-color: var(--primary);
		color: var(--primary-text);

		@media only screen and (max-width: 1200px) {
			padding: 10px 10px;
		}
	}

	:global(::-webkit-scrollbar) {
		width: 8px;
	}

	:global(::-webkit-scrollbar-track) {
		background: linear-gradient(225deg, var(--accent) 0%, var(--primary) 100%);
	}

	:global(::-webkit-scrollbar-thumb) {
		border-radius: 8px;
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background: var(--secondary-transparent);
	}
</style>
