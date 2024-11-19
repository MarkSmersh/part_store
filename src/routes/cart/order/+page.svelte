<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	import { request } from '$lib';

	let range = $state('100000000');

	let formatRange = $derived(
		'+48 ' + range
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
            .split(",")
            .map((v) => v ? Math.round(parseInt(v) / 3.91764705882) : 0 )
            .join(',')
	);

    let firstName = $state(data.username || "");
    let secondName = $state("");
    let postal = $state("");
    let street = $state("");
    let comment = $state("");

    async function creatOrder(e: SubmitEvent) {
        e.preventDefault();

        await request("/api/order", "POST", JSON.stringify({
			firstName: firstName,
			secondName: secondName,
			postal: postal,
			street: street,
			comment: comment,
			phone: formatRange
		}))
    }
</script>

<h2>To order order product fill next form:</h2>
<form onsubmit={(e) => creatOrder(e)}>
	First Name: <input
        bind:value={firstName}
		autocomplete="given-name"
		name="firstName"
		type="text"
		minlength="1"
		maxlength="30"
		required
	/>
	Surname:
	<input
        bind:value={secondName}
		autocomplete="family-name"
		name="lastName"
		type="text"
		minlength="1"
		maxlength="30"
		required
	/>
	Phone number ({formatRange}):
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
	Postal:
	<input
        bind:value={postal}
		autocomplete="postal-code"
		name="postal"
		type="text"
		required
		minlength="4"
		maxlength="8"
	/>
	Street:
	<input
        bind:value={street}
		autocomplete="street-address"
		name="street"
		type="text"
		required
		minlength="5"
		maxlength="90"
	/>
	Comment: <textarea
        bind:value={comment}
		name="comment"
		placeholder="Add some commentary for you order. For example, your apartment number if exists or some contact data for the delivery agent. (max 200)"
		rows="5"
		cols="40"
        maxlength="200"
	></textarea>

	Did you like our service? (your opinion is important to us!)
	<input
		oninput={(v) => (v.currentTarget.checked = true)}
		type="checkbox"
		checked
		style:accent-color={`rgb(${color})`}
	/>
	<button type="submit">Send form</button>
</form>

<style>
	input {
		border: 1px solid grey;
		transition: 0.1s;
	}

	input[type='range'] {
		appearance: none;
		width: 100%;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: start;
	}

	textarea {
		max-width: 100%;
		resize: horizontal;
	}
</style>
