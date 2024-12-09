<script lang="ts">
	import { slide } from 'svelte/transition';
	import Button from './Button.svelte';

	interface CardProps {
		img: string;
		title: string;
		description?: string;
		quantity: number;
		price: number;
		onClick: () => void;
		onRemove?: () => void;
	}

	function onMouseMove(
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		}
	) {
		const maxAngleX = 25;
		const maxAngleY = 20;

		// Why you are not using for .offsetX/.offsetY from event?
		// - They are depending on the current element which mouse
		// is moving

		const cursorX = e.pageX - card.offsetLeft;
		const cursorY = e.pageY - card.offsetTop;

		isHover = true;
		yRotate = (cursorX / (card.offsetWidth / 2) - 1) * maxAngleY;
		xRotate = (cursorY / (card.offsetHeight / 2) - 1) * maxAngleX;
	}

	function onMouseLeave() {
		isHover = false;
		yRotate = 0;
		xRotate = 0;
	}

	let { title, description, img, quantity, onClick, onRemove, price }: CardProps = $props();

	let cutDesc: string = $state('');

	$effect(() => {
		if (description) {
			cutDesc = description?.slice(0, 100) + "...";
		} else {
			cutDesc = '';
		}
	});

	let isHover = $state(false);
	let card: HTMLDivElement = $state() as HTMLDivElement;

	let xRotate = $state(0);
	let yRotate = $state(0);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="card-wrapper">
	<div
		class="card shadow"
		onmousemove={(e) => onMouseMove(e)}
		onmouseleave={() => onMouseLeave()}
		style:transform={`rotateX(${xRotate}deg) rotateY(${-yRotate}deg)`}
		bind:this={card}
		style:box-shadow={`${-yRotate}px ${-xRotate}px 16px rgba(0, 0, 0, .8)`}
	>
		<div class="item">
			<div class="image-wrapper">
				<img class="image" src={img} alt={title} />
			</div>
			<p class="title">{title}</p>
			<p class="description">{cutDesc}</p>
			<p class="price">{price}.00 zł</p>
		</div>
		<div class="quantity">
			x{quantity}
		</div>
		{#if isHover}
			<div class="actions" transition:slide>
				<Button style="primary" onClick={() => onClick()}>Przejdź do produktu</Button>
				{#if onRemove !== undefined}
					<Button style="danger" onClick={() => onRemove()}>Usunąc z koszyku</Button>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.card-wrapper {
		display: flex;
		flex: 1 1;
		height: 100%;

		@media screen and (max-width: 1200px) {
			max-width: 100%;
			width: 100%;
		}
	}

	.card {
		position: relative;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: center;
		border: 1px solid var(--secondary);
		border-radius: 8px;
		background: rgb(0, 3, 94);
		background: linear-gradient(225deg, var(--accent) 0%, rgba(0, 0, 0, 0) 100%);
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
	}

	.quantity {
		border: 1px solid var(--secondary);
		border-radius: 8px;
		padding: 8px;
		align-self: self-end;
		margin: 8px;
	}

	.item {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 8px;
		margin: 8px;
		flex: 1 0;

		.image-wrapper {
			height: auto;
			width: calc(100% - 16px);
			border: 1px solid var(--secondary);
			flex: 0;
			padding: 8px;
			border-radius: 8px;

			.image {
				object-fit: contain;
				width: 100%;
				border-radius: 8px;
			}
		}

		.title {
			font-size: 20px;
			text-align: center;
			font-weight: 600;
		}

		.price {
			font-weight: 600;
			font-size: 20px;
		}
	}

	.actions {
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		backdrop-filter: blur(10px) brightness(40%);
		gap: 8px;
		height: 100%;
		position: absolute;
		background-color: var(--primary-transparent);
		width: 100%;
		height: 100%;
	}
</style>
