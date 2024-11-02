<script lang="ts">
	async function createProduct() {
		await fetch('./api/db');
	}
</script>

<button onclick={() => createProduct()}> Create a new product </button>
