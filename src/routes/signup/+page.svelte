<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { hash } from '$lib/index';

	let username = $state('');
	let password = $state('');
	let error = $state();
	let created = $state(false);
	let timer = $state(5);

	async function signup() {
		const hashedPassword = await hash(password);
		const res = await fetch(`./api/user/signup?username=${username}&password=${hashedPassword}`);

		if (res.status == 201) {
			created = true;
			invalidateAll();

			setTimeout(() => (timer = 4), 1000);
			setTimeout(() => (timer = 3), 2000);
			setTimeout(() => (timer = 2), 3000);
			setTimeout(() => (timer = 1), 4000);
			setTimeout(() => {
				timer = 0;
				goto('./');
			}, 5000);
			return;
		}

		error = (await res.text()) || 'Unknown error occured. Reload page and try again';
	}
</script>

{#if !created}
	{#if error}
		<h1 class="error">{error}</h1>
	{/if}

	<input bind:value={username} />
	<input type="password" bind:value={password} />
	<button onclick={() => signup()}>Log in</button>

	<style>
		.error {
			color: red;
		}
	</style>
{:else}
	<p>Successfully registered. You will be redirected to the main page in... {timer}</p>
{/if}
