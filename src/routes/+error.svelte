<script>
	import cat from '$lib/assets/cat.webp';
	import blackflash from '$lib/assets/blackflash.gif';
	import { page } from '$app/stores';
	import Image from './ui/Image.svelte';
</script>

<main>
	<div class="error">
		<div class="text">
			<h1>⚠️ Wystąpil problem</h1>
			<h2>Kod błedu: {$page.status}</h2>
			<p>{$page.error?.message}</p>
		</div>
		{#if $page.status >= 500}
			<Image alt={'To same ty zrobiłes z serwerem'} src={blackflash} height={400} />
		{:else}
			<Image alt={'AXAXAXAXAXAXAXAXAX'} src={cat} height={500} />
		{/if}
	</div>
</main>

<style>
	.error {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 200px;

		@media only screen and (max-width: 1200px) {
			flex-direction: column;
			gap: 32px;
			text-align: center;
		}
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
	}
</style>
