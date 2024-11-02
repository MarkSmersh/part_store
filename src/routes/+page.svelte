<script lang="ts">
	async function createProduct() {
		await fetch('./api/db');
	}
</script>

<div>
	<button onclick={() => createProduct()}> Create a new product </button>
</div>

<style scoped>
	div {
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button {
		height: fit-content;
	}
</style>