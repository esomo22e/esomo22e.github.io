<script>
import { onMount, afterUpdate } from 'svelte';
import * as d3 from 'd3';
import {csv} from "d3-fetch";
	// import * as portfolioTest from '../public/datasets/project-list.json'
	// import * as bannedLearning from '../public/datasets/banned-learning.json'
	// import data from '../public/datasets/banned-learning.json';
	import dataPortfolio from '../public/datasets/portfolio-list.json';


		export let name;
	export let world;
	world = "Eunice Esomonu";

	// const REMOTE_URL = "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";
</script>

<main>
<h1>Hello {world}!</h1>
<div class = "total-wrapper">
{#each dataPortfolio as item}
<div class = "content-container">
	<div class = "project-name">{item.project_name}</div>
	<div class = "project-excerpt">{item.tile_content}</div>
	</div>
	{/each}
	</div>
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

	.content-container{
		margin: 20px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
