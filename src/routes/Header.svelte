<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { request } from '$lib';
	import Search from './Search.svelte';
	import Button from './ui/Button.svelte';
	let { username } = $props();
	import logo from '$lib/assets/sklep-komputerowy-high-resolution-logo-grayscale-transparent.png';
</script>

<header>
	<a class="logo-wrapper" href="/">
		<img class="logo" alt="Sklep komputerowy" src={logo} />
	</a>
	<div>
		{#if username}
			<Button onClick={() => goto('/cart')} style="primary">Koszyk</Button>
			<Button onClick={() => goto('/orders')} style="primary">Zamówenia</Button>
			<Button
				onClick={async () => {
					await request('/api/user/logout');
					invalidateAll();
				}}
				style="primary"
			>
				{username} | Wylogowanie
			</Button>
		{:else}
			<Button onClick={() => goto('/login')} style="primary">Logowanie</Button>
			<Button onClick={() => goto('/signup')} style="primary">Rejestracja</Button>
		{/if}
		<Search />
	</div>
</header>

<style>
	.logo-wrapper {
		width: 20%;
		display: flex;
		transition: .2s;
	}

	.logo-wrapper:hover {
		scale: 105%;
	}

	.logo {
		object-fit: contain;
		width: 100%;
	}

	header {
		/* background-color: var(--primary); */
		
		background: var(--primary);
		background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 70%, var(--primary) 100%);
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
		color: var(--primary-text);
		text-decoration: solid;
		font-size: 24px;
		justify-self: flex-end;
	}
</style>
