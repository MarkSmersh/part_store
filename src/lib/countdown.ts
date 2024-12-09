export function countdown(count: number, callback: (number: number) => void, finish: () => void) {
	for (let i = 1; i <= count; i++) {
		setTimeout(() => {
			callback(count - i);
			if (i === count) finish();
		}, i * 1000);
	}
}
