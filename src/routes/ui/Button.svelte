<script lang="ts">
	import type { Snippet } from 'svelte';

	type ButtonStyle = 'primary' | 'danger';

	interface ButtonProps {
		onClick: () => void;
		children: Snippet;
		after?: string;
		isActive?: boolean;
		style?: ButtonStyle;
		type?: 'submit' | null;
        fill?: boolean;
	}

	let {
		onClick,
		children,
		after,
		isActive,
		style = 'primary',
		type = null,
        fill
	}: ButtonProps = $props();
</script>

<button onclick={() => onClick()} class={style} {type} class:active={isActive} class:fill={fill}>
	<div class="contents">
		{#if after}
			{after}
			<div class="separator"></div>
		{/if}
		{@render children()}
	</div>
</button>

<style>
    .contents {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
    }

    .separator {    
        width: .9px;
        background-color: var(--secondary);
        height: 20px;
    }

	button {
		cursor: pointer;
		font-size: 16px;
		padding: 8px 16px;
		transition: 0.25s ease-out;
		border-radius: 8px;
		/* backdrop-filter: blur(10px) */
	}

	button:hover {
		scale: 105%;
		backdrop-filter: blur(10px);
	}

	button:active {
		transition: 0s;
		scale: 100%;
	}

	.primary {
		color: var(--secondary);
		border: 1px solid var(--secondary);
		background: rgba(0, 0, 0, 0);
	}

	.primary:hover {
		background: var(--secondary);
		color: var(--primary);
	}

	.primary.active {
		background: var(--secondary);
		color: var(--primary);
	}

	.danger {
		color: red;
		border: 1px solid red;
		background: rgba(0, 0, 0, 0);
	}

	.danger:hover {
		background: rgba(255, 0, 0, 0.2);
		color: var(--primary-text);
	}

    .fill {
        flex: 1;
    }
</style>
