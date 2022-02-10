<script>
import { onMount } from 'svelte';
import * as d3 from 'd3';
import { csv, json } from 'd3-fetch'


	export let name;
	export let world;
	world = "Eunice Esomonu";

	const REMOTE_URL = "";

	$: bookData = [];

	// THIS ACCESSES AND PROCESSES THE GOOGLE SHEET"
	// THIS ACCESSES AND PROCESSES THE GOOGLE SHEET"
// json(url).then(function(data,i){
// 	let rowcount = ((data.feed.entry.length / headings.length)-1)
// 	let loadeddata = []
// 	bookData = loadeddata;
//
// })

</script>

<main>
	<h1>Hello {world}!</h1>
<!-- <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #purple;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
