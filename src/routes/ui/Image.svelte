<script lang="ts">
	import { fly } from 'svelte/transition';

	interface ImageProps {
		src: string;
		alt: string;
		height: number;
	}

	type DivMouseEvent = MouseEvent & {
		currentTarget: EventTarget & HTMLDivElement;
	};

	function onMouseMove(e: DivMouseEvent) {
		isHover = true;
		curX = -e.offsetX;
		// console.log(e.currentTarget.clientWidth)
		// console.log(e.currentTarget.clientHeight)
		// console.log(e.currentTarget.clientWidth / e.currentTarget.clientHeight)
		// let magic = e.currentTarget.clientWidth / e.currentTarget.clientHeight;
		// let diff =  e.currentTarget.clientHeight - e.currentTarget.clientWidth
		// curY = -(e.offsetY * 4);
		// console.log(`MOUSE X, Y ${curX}, ${curY}`)
	}

	function onMouseLeave(e: DivMouseEvent) {
		isHover = false;
		curX = 0;
		// curY = 0;
	}

	let { src, alt, height }: ImageProps = $props();

	let isHover = $state(false);
	let curX = $state(0);
	// let curY = $state(0);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="image-wrapper">
	<div
		onmousemove={(e) => onMouseMove(e)}
		onmouseleave={(e) => onMouseLeave(e)}
		class="image"
		style:background-image={`url("${src}")`}
		style:height={`${height}px`}
		class:zoomed={isHover}
		style:background-position={isHover ? `${curX}px center` : 'center'}
	>
		<!-- <img class="image" {alt} {src} /> -->
		{#if isHover}
			<div transition:fly class="description">
				<p>
					🖼️ {alt}
				</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.image-wrapper {
		display: flex;
		width: calc(100% - 16px);
		padding: 8px;
		border: 1px solid var(--primary-text);
		border-radius: 8px;
		height: fit-content;
		background-color: var(--primary-transparent);
	}

	.image {
		display: flex;
		justify-content: center;
		align-items: end;
		border-radius: 8px;
		overflow: hidden;
		cursor: pointer;
		flex: 1;
		background-size: cover;
	}

	.description {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		color: var(--primary-text);
		background-color: var(--primary-transparent);
		text-align: center;
		padding: 8px 0px;
		backdrop-filter: blur(4px) brightness(40%);
		font-size: 12px;
	}

	.zoomed {
		background-size: 200%;
		background-repeat: no-repeat;
	}
</style>
