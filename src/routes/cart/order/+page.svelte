<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	import { request } from '$lib';
	import Button from '../../ui/Button.svelte';

	let range = $state('100000000');

	let formatRange = $derived(
		'+48 ' +
			range
				.split('')
				.map((v, i) => ((i + 1) % 3 === 0 ? v + '-' : v))
				.join('')
				.slice(0, -1)
	);
	let color = $derived(
		parseInt(range)
			.toString()
			.split('')
			.map((v, i) => ((i + 1) % 3 === 0 ? v + ',' : v))
			.join('')
			.slice(0, -1)
			.split(',')
			.map((v) => (v ? Math.round(parseInt(v) / 3.91764705882) : 0))
			.join(',')
	);

	let firstName = $state(data.username || '');
	let secondName = $state('');
	let postal = $state('');
	let street = $state('');
	let comment = $state('');

	async function creatOrder(e: SubmitEvent) {
		e.preventDefault();

		await request(
			'/api/order',
			'POST',
			JSON.stringify({
				firstName: firstName,
				secondName: secondName,
				postal: postal,
				street: street,
				comment: comment,
				phone: formatRange
			})
		);
	}
</script>

<main>
	<h2>Uzupełnij dane, aby założyć zamówienie:</h2>
	<form onsubmit={(e) => creatOrder(e)}>
		Imię:
		<input
			bind:value={firstName}
			autocomplete="given-name"
			name="firstName"
			type="text"
			minlength="1"
			maxlength="30"
			required
		/>
		Nazwisko:
		<input
			bind:value={secondName}
			autocomplete="family-name"
			name="lastName"
			type="text"
			minlength="1"
			maxlength="30"
			required
		/>
		Numer telefonu komórkowego ({formatRange}):
		<input
			style:accent-color={`rgb(${color})`}
			style:background-color={`rgb(${color})`}
			oninput={(v) => (range = v.currentTarget.value)}
			name="phone"
			type="range"
			min="100000000"
			max="999999999"
			minlength="1"
			required
		/>
		Kod pocztowy:
		<input
			bind:value={postal}
			autocomplete="postal-code"
			name="postal"
			type="text"
			required
			minlength="4"
			maxlength="8"
		/>
		Ulica i nr:
		<input
			bind:value={street}
			autocomplete="street-address"
			name="street"
			type="text"
			required
			minlength="5"
			maxlength="90"
		/>
		Komentarz:
		<textarea
			bind:value={comment}
			name="comment"
			placeholder="Dodaj komentarz do zamówenia (maks. 200)"
			rows="5"
			cols="40"
			maxlength="200"
		></textarea>

		Czy podoba Cię nasz sklep? (twoja opinia jest ważna dla nas!)
		<input
			oninput={(v) => (v.currentTarget.checked = true)}
			type="checkbox"
			checked
			style:accent-color={`rgb(${color})`}
		/>
		<Button onClick={() => {}} type="submit">Gotowo</Button>
	</form>
</main>

<style>
	main {
		display: flex;
		gap: 16px;
		flex-direction: column;
	}

	input {
		border: 1px solid var(--secondary);
		background-color: var(--secondary-transparent);
		transition: 0.1s;
		padding: 8px;
		border-radius: 8px;
		width: calc(100% - 16px);
		color: var(--primary-text);
	}

	input[type='range'] {
		appearance: none;
	}

	form {
		display: flex;
		flex-direction: column;
		align-self: center;
		gap: 8px;
	}

	textarea {
		width: calc(100% - 16px);
		resize: horizontal;
		border-radius: 8px;
		padding: 8px;
		background-color: var(--secondary-transparent);
		color: var(--primary-text);
	}
</style>
