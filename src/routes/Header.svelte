<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { request } from '$lib';
	import Search from './Search.svelte';
	import Button from './ui/Button.svelte';
	let { username } = $props();
</script>

<header>
	<a href="/">Sklep z częściami do komputera.</a>
	<div>
		{#if username}
			<Button onClick={() => goto('/cart')} style="secondary">Cart</Button>
			<Button onClick={() => goto('/orders')} style="secondary">Orders</Button>
			<Button
				onClick={async () => {
					await request('/api/user/logout');
					invalidateAll();
				}}
				style="secondary"
			>
				{username} | Log out
			</Button>
		{:else}
			<Button onClick={() => goto('/login')} style="secondary">Log In</Button>
			<Button onClick={() => goto('/signup')} style="secondary">Sign Up</Button>
		{/if}
		<Search />
	</div>
</header>

<style>
	header {
		background-color: var(--primary);
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
		color:var(--primary-text);
		text-decoration: solid;
		font-size: 24px;
		justify-self: flex-end;
	}
</style>
