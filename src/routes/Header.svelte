<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { request } from '$lib';
	import Button from './ui/Button.svelte';
	let { username } = $props();
	import logo from '$lib/assets/sklep-komputerowy-high-resolution-logo-grayscale-transparent.png';
	import { isMenu, isSearch } from '$lib/state';
</script>

<header>
	<a class="logo-wrapper" href="/">
		<img class="logo" alt="Sklep komputerowy" src={logo} />
	</a>
	<div>
		<div class="nav">
			{#if username}
				<Button onClick={() => goto('/cart')} style="primary">Koszyk</Button>
				<Button onClick={() => goto('/orders')} style="primary">Zamówenia</Button>
				<Button
					after={username}
					onClick={async () => {
						await request('/api/user/logout');
						invalidateAll();
					}}
					style="primary"
					>Wylogować
				</Button>
			{:else}
				<Button onClick={() => goto('/auth')} style="primary">Autoryzacja</Button>
			{/if}
			<Button onClick={() => isSearch.set(true)}>
				Wyszukiwanie
			</Button>
		</div>
		<div class="menu">
			<Button onClick={() => isMenu.set(true)}>
				Menu
			</Button>
		</div>
	</div>
</header>

<style>
	.menu {
		display: none;
	}

	.logo-wrapper {
		width: 20%;
		display: flex;
		transition: 0.2s;
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
		top: 20;
		z-index: 68;
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

	@media only screen and (max-width: 1200px) {
		.nav {
			display: none;
		}

		.menu {
			display: flex;
		}

		.logo-wrapper {
			width: 50%;
		}
	}
</style>
