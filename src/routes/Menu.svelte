<script lang="ts">
	import { blur } from 'svelte/transition';
	import Button from './ui/Button.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { request } from '$lib';
	import { isMenu, isSearch } from '$lib/state';

	function click(callback?: () => void | Promise<void>) {
		if (callback) {
			callback();
		}
		isMenu.set(false);
	}

	interface MenuProps {
		username: string | undefined;
	}

	let { username }: MenuProps = $props();
	let isActive = $state(false);

	isMenu.subscribe((v) => (isActive = v));
</script>

{#if isActive}
	<div class="menu" transition:blur>
		<div class="close">
			<Button onClick={() => isMenu.set(false)}>❌</Button>
		</div>
		<h2>Menu</h2>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="actions">
			{#if username}
				<Button fill onClick={() => click(() => goto('/cart'))} style="primary">Koszyk</Button>
				<Button fill onClick={() => click(() => goto('/orders'))} style="primary">Zamówenia</Button>
				<Button
					fill
					after={username}
					onClick={() =>
						click(async () => {
							await request('/api/user/logout');
							invalidateAll();
						})}
					style="primary"
					>Wylogować
				</Button>
			{:else}
				<Button fill onClick={() => click(() => goto('/auth'))} style="primary">Autoryzacja</Button>
			{/if}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<Button onClick={() => click(() => isSearch.set(true))}>Wyszukiwanie</Button>
		</div>
	</div>
{/if}

<style>
	.close {
		align-self: self-end;
	}

	.menu {
		display: flex;
		position: fixed;
		flex-direction: column;
		align-items: center;
		gap: 32px;
		padding: 32px 16px;
		top: 0;
		left: 0;
		background-color: var(--primary-transparent);
		backdrop-filter: blur(10px) brightness(40%);
		width: calc(100vw - 32px);
		height: 100vh;
		z-index: 68;
		color: var(--primary-text);
	}

	.actions {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 100%;
	}
</style>
