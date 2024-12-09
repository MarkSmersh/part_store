<script lang="ts">
	interface ArrayProps {
		images: string[];
	}

	let { images }: ArrayProps = $props();
</script>

<div class="array">
	{#each images as i, index}
		<div class="image-origin">
			<div class="image-wrapper">
				<img class="image" src={i} alt={'icon'} />
			</div>
		</div>
	{/each}
</div>

<style>
	.array {
		display: flex;
		flex-wrap: wrap;
		/* justify-content: flex-start;
		flex-wrap: wrap;
		height: 100%;
		position: relative;
		flex: 1; */
		grid: auto-flow;
	}

	.image-wrapper {
		border: 1px solid var(--secondary);
		border-radius: 100%;
		padding: 8px;
		height: calc(100% - 16px);
		position: absolute;
		background: var(--primary-transparent);
		backdrop-filter: blur(10px);
		transition: 0.2s;
		grid-row: 1;
	}

	.image-wrapper:hover {
		z-index: 1;
		transform: translateY(-10%);
	}

	.image-origin {
		position: relative;
		height: 100px;
		width: 75px;
	}

	.image {
		height: 100%;
		border-radius: 100%;
		object-fit: cover;
		aspect-ratio: 1 / 1;
	}
</style>
