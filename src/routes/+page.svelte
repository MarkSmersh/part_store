<script>
	import Image from "./ui/Image.svelte";
	import img from "$lib/assets/8a6c2e45cfb9e32859e9e7fa80350ad1.jpg"
</script>
<main>
	<div class="container">
		<div class="text">
			<h2>Witamy w naszym sklepie z podzespołami komputerowymi!</h2>

			Cieszymy się, że odwiedzasz nasz sklep internetowy, w którym znajdziesz wszystko, co potrzebne
			do stworzenia idealnego systemu komputerowego. Specjalizujemy się w sprzedaży wysokiej jakości
			komponentów do PC, które spełniają najwyższe standardy.
			<h4>Nasza oferta obejmuje:</h4>
			<ul>
				<li>
					Płyty główne: wybieraj spośród najnowszych modeli, które obsługują różnorodne procesory i
					technologie.
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

			<h4>Dlaczego warto nas wybrać?</h4>
			<ul>
				<li>
					Szeroki asortyment: oferujemy tylko sprawdzone i wysokiej jakości produkty od renomowanych
					producentów.
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

			Bądź na bieżąco! Zapisz się do naszego newslettera, aby otrzymywać najnowsze informacje o
			promocjach i nowościach. Śledź nas w mediach społecznościowych, aby być na bieżąco ze
			wszystkimi aktualizacjami. Zrób swój komputer mocniejszym razem z nami! Odwiedź nasz sklep już
			dziś i znajdź idealne części do swojego systemu!
		</div>
		<Image src={img} alt={"Komputer normalny taki podstawowy"} height={500} />
	</div>
</main>

<style scoped>
	.container {
		display: flex;
		align-items: center;
		gap: 64px;
	}

	.text > * {
		margin: 16px 0px;
	}

	img {
		height: 300px;
	}

	h4 {
		font-size: 20px;
	}

	ul {
		padding-left: 50px;
	}
</style>
