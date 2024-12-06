<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { countdown } from '$lib/countdown';
	import { hash, request } from '$lib/index';
	import Button from '../ui/Button.svelte';

	let username = $state('');
	let password = $state('');
	let created = $state(false);
	let timer = $state(5);

	async function signup() {
		const hashedPassword = await hash(password);
		const res = await request(`./api/user/signup?username=${username}&password=${hashedPassword}`);

		if (res.status == 201) {
			created = true;
			invalidateAll();
			countdown(
				timer,
				(n) => (timer = n),
				() => {
					goto('/');
				}
			);
			return;
		}
	}
</script>

<main>
	{#if !created}
		<div class="container">
			<div class="form">
				<h2>Rejestracja</h2>
				<label>
					Nazwa użytkownika
					<input bind:value={username} />
				</label>
				<label>
					Hasło
					<input type="password" bind:value={password} />
				</label>
				<Button style="primary" onClick={() => signup()}>Zarejestrować się</Button>
			</div>
		</div>
	{:else}
		<p>Successfully registered. You will be redirected to the main page in... {timer}</p>
	{/if}
</main>

<style>
	main {
		background-image: url('../../lib/assets/kompudahter.png');
		background-position: center;
	}

	.container {
		display: flex;
		justify-content: center;
		padding: 100px 0px;
	}

	.form {
		display: flex;
		flex-direction: column;
		width: 40%;
		background-color: var(--primary);
		background-color: var(--primary-transparent);
		backdrop-filter: blur(20px) brightness(40%);
		border: 2px var(--primary-text) solid;
		border-radius: 8px;
		padding: 32px;
		gap: 32px;

		h2 {
			text-align: center;
			color: var(--primary-text);
		}

		label {
			display: flex;
			flex-direction: column;
			color: var(--primary-text);
			position: relative;

			input {
				margin-top: 16px;
				padding: 8px;
				border-radius: 8px;
			}
		}
	}
</style>
