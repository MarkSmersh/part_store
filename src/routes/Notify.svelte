<script lang="ts">
	import type { INotify } from '$lib/notify';
	import { notify } from '$lib/notify';
	import { blur } from 'svelte/transition';

	let notifications: INotify[] | undefined = $state([]);

	notify.subscribe((no) => (notifications = no));

	$inspect(notifications);
</script>

<div class="notifications">
	{#if notifications}
		{#each notifications as n}
			<!-- svelte-ignore
            a11y_click_events_have_key_events,
            a11y_no_static_element_interactions (nah id click)
        -->
			<div
				transition:blur
				class="notification"
				onclick={() => notify.update((no) => no.filter((v) => v.id !== n.id))}
			>
				{#if n.status}
					<p class="icon">
						{n.status >= 200 && n.status < 300 ? '✅' : '⚠️'}
					</p>
				{/if}
				<div class="text">
					<!-- For debugging -->
					<!-- <h3 class={n.status >= 200 && n.status < 300 ? 'success' : 'error'}>
						{n.statusText} - {n.status}
					</h3> -->
					<p>{n.message}</p>
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	.notifications {
		position: fixed;
		bottom: 0;
		right: 0;
		margin: 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		z-index: 68;

		@media screen and (max-width: 1200px) {
			width: calc(100% - 40px);
			bottom: auto;
			top: 0;
		}
	}

	.notification {
		display: flex;
		background-color: var(--primary-transparent);
		backdrop-filter: blur(10px);
		padding: 20px;
		cursor: pointer;
		border: 1px solid var(--primary-text);
		color: var(--primary-text);
		user-select: none;
		border-radius: 8px;
		gap: 8px;
		align-items: center;
	}

	.text {
		width: fit-content;
	}

	.icon {
		font-size: 24px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* .success {
		color: green;
	}

	.error {
		color: red;
	} */
</style>
