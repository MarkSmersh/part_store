<script>
	import Image from './ui/Image.svelte';
	import img from '$lib/assets/8a6c2e45cfb9e32859e9e7fa80350ad1.jpg';
	import Accordion from './ui/Accordion.svelte';
</script>

<main style:background-image={`url("${img}")`}>
	<div class="container">
		<div class="text">
			<h1>Witamy w naszym sklepie!</h1>

			Cieszymy się, że odwiedzasz nasz sklep internetowy, w którym znajdziesz wszystko, co potrzebne
			do stworzenia idealnego systemu komputerowego. Specjalizujemy się w sprzedaży wysokiej jakości
			komponentów do PC, które spełniają najwyższe standardy.

			<Accordion title={'Nasza oferta obejmuje:'}>
				<ul>
					<li>
						Płyty główne: wybieraj spośród najnowszych modeli, które obsługują różnorodne procesory
						i technologie.
					</li>

					<li>
						Procesory: mocne i niezawodne procesory od czołowych producentów, idealne do wszelkich
						zadań.
					</li>

					<li>Karty graficzne: najlepsze rozwiązania graficzne dla graczy i profesjonalistów.</li>

					<li>Pamięć RAM: szybkie moduły, które zapewnią twojemu systemowi potrzebną wydajność.</li>

					<li>
						Dyski twarde i SSD: wybierz pomiędzy tradycyjnymi HDD a szybkimi SSD do przechowywania
						danych.
					</li>

					<li>Zasilacze: niezawodne zasilacze dla stabilnej pracy twojego systemu.</li>

					<li>Obudowy: stylowe i funkcjonalne obudowy, które pasują do każdego wnętrza.</li>
				</ul>
			</Accordion>

			<Accordion title={'Dlaczego warto nas wybrać?'}>
				<ul>
					<li>
						Szeroki asortyment: oferujemy tylko sprawdzone i wysokiej jakości produkty od
						renomowanych producentów.
					</li>

					<li>
						Konkurencyjne ceny: stale śledzimy trendy rynkowe, aby zaproponować ci najlepsze ceny.
					</li>

					<li>Szybka dostawa: otrzymuj swoje zamówienia w najkrótszym czasie.</li>

					<li>
						Profesjonalne wsparcie: nasz zespół ekspertów zawsze gotowy jest pomóc w wyborze
						komponentów.
					</li>
				</ul>
			</Accordion>
		</div>
		<Image src={img} alt={'Komputer normalny taki podstawowy'} height={500} />
	</div>
</main>

<style scoped>
	main {
		background-size: cover;
		background-size: 150%;
	}

	.container {
		display: flex;
		align-items: center;
		gap: 64px;
		padding: 32px;
		border-radius: 8px;
		color: var(--primary-text);
		backdrop-filter: blur(10px) brightness(40%);
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: 32px;
		font-size: 18px;
	}
</style>
