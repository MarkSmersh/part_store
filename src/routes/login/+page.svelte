<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { hash, request } from '$lib/index';

	let username = $state('');
	let password = $state('');
	let error = $state();
	let logged = $state(false);
	let timer = $state(5);

	async function login() {
		const hashedPassword = await hash(password);
		const urlParams = new URLSearchParams(`username=${username}&password=${hashedPassword}`);
		const res = await request(`./api/user/login?${urlParams.toString()}`);

		if (res.status == 200) {
			logged = true;
			invalidateAll();

			setTimeout(() => (timer = 4), 1000);
			setTimeout(() => (timer = 3), 2000);
			setTimeout(() => (timer = 2), 3000);
			setTimeout(() => (timer = 1), 4000);
			setTimeout(() => {
				timer = 0;
				goto('/');
			}, 5000);
			return;
		}

		error = (await res.text()) || 'Unknown error occured. Reload page and try again';
	}
</script>

{#if !logged}
	{#if error}
		<h1 class="error">{error}</h1>
	{/if}
	<input bind:value={username} />
	<input type="password" bind:value={password} />
	<button onclick={() => login()}>Log in</button>

	<style>
		.error {
			color: red;
		}
	</style>
{:else}
	<p>Successfully logged in. You will be redirected to the main page in... {timer}</p>
{/if}
