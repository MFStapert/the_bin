<script lang="ts">
	let items = ['/hero/consultancy.png', '/hero/maatwerk.png', '/hero/training.png'];
</script>

<h1 class="text-blue-400 text-5xl mb-8">
	Zinvolle software die meetbaar bijdraagt aan bedrijfsresultaten
</h1>
<div class="flex">
	{#each items as item}
		<article class="m-4 flex flex-col">
			<img class="h-4/5" src={item} alt="geen" />
			<a class="flex flex-col flex-auto p-4 bg-blue-400 hover:bg-blue-600" href="/">
				<span class="text-3xl mb-2 text-white">Title</span>
				<span class="text-white">Subtitle</span>
			</a>
		</article>
	{/each}
</div>
