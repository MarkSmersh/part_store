<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { countdown } from '$lib/countdown';
	import { hash, request } from '$lib/index';
	import Button from '../ui/Button.svelte';

	async function counter() {
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

	async function signup() {
		const hashedPassword = await hash(password);
		const res = await request(`./api/user/signup?username=${username}&password=${hashedPassword}`);

		if (res.status == 201) {
			created = true;
			invalidateAll();
			counter();
		}
	}

	async function login() {
		const hashedPassword = await hash(password);
		const urlParams = new URLSearchParams(`username=${username}&password=${hashedPassword}`);
		const res = await request(`./api/user/login?${urlParams.toString()}`);

		if (res.status == 200) {
			logged = true;
			counter();
		}
	}

	let username = $state('');
	let password = $state('');

	let created = $state(false);
	let logged = $state(false);

	let timer = $state(5);
	let type = $state<'login' | 'signup'>('login');
</script>

<main>
	{#if !created && !logged}
		<div class="container">
			<div class="selector backdrop">
				<Button fill onClick={() => (type = 'login')} isActive={type === 'login'}>
					<h4>Logowanie</h4>
				</Button>
				<Button fill onClick={() => (type = 'signup')} isActive={type === 'signup'}>
					<h4>Rejestracja</h4>
				</Button>
			</div>
			{#if type === 'signup'}
				<div class="form backdrop">
					<label>
						Nazwa użytkownika
						<input autocomplete="username" bind:value={username} />
					</label>
					<label>
						Hasło
						<input autocomplete="new-password" type="password" bind:value={password} />
					</label>
					<Button style="primary" onClick={() => signup()}>Zarejestrować się</Button>
				</div>
			{:else if type === 'login'}
				<div class="form backdrop">
					<label>
						Nazwa użytkownika
						<input autocomplete="username" bind:value={username} />
					</label>
					<label>
						Hasło
						<input autocomplete="current-password" type="password" bind:value={password} />
					</label>
					<Button style="primary" onClick={() => login()}>Zalogować się</Button>
				</div>
			{/if}
		</div>
	{:else}
		<div class="finish">
			<p class="backdrop">Jesteś autoryzowany. Za... {timer} sekund powrócimy Cię do strony głównej</p>
		</div>
	{/if}
</main>

<style>
	main {
		background-image: url('../../lib/assets/kompudahter.png');
		background-position: center;
	}

	.finish {
		display: flex;
		width: 100%;
		height: 300px;
		justify-content: center;
		align-items: center;
		

		p {
			font-size: 18px;
			padding: 32px;
		}
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 100px 0px;
		width: 100%;
		gap: 16px;
	}

	.selector {
		display: flex;
		border: 2px solid var(--secondary);
		width: 40%;
		padding: 8px 32px;
		gap: 16px;
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

	.backdrop {
		border-radius: 8px;
		background-color: var(--primary);
		background-color: var(--primary-transparent);
		backdrop-filter: blur(20px) brightness(40%);
	}
</style>
