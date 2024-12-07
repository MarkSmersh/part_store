<script lang="ts">
	interface ArrayProps {
		images: string[];
	}

	let { images }: ArrayProps = $props();
</script>

<div class="array">
	{#each images as i, index}
		<div
            style:transform={`translateX(-${(index) * 50}%)`}
            class="image-wrapper"
        >
			<img class="image" src={i} alt={'icon'} />
		</div>
	{/each}
</div>

<style>
	.array {
		display: flex;
		justify-content: flex-start;
		height: 100%;
		position: relative;
		flex: 1;
	}

	.image-wrapper {
		border: 1px solid var(--secondary);
		height: 100%;
		border-radius: 100%;
		padding: 8px;
		height: calc(100% - 32px);
		position: static;
        background: var(--primary-transparent);
        backdrop-filter: blur(10px);
	}

	.image-wrapper:first-child {
		transform: none;
	}

	.image {
		height: 100%;
		border-radius: 100%;
		object-fit: cover;
		aspect-ratio: 1 / 1;
	}
</style>
