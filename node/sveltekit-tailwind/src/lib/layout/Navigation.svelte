<script lang="ts">
	let items = ['Maatwerksoftware', 'Consultancy', 'Cloud services', 'Kennisdeling', 'Werken bij'];
</script>

<nav class="flex flex-wrap items-baseline p-2 mb-6">
	<img class="mr-4" src="/static/avisi.svg" alt="geen" />
	{#each items as item}
		<a class="flex-grow mx-6 hover:underline" href="/">{item}</a>
	{/each}

	<button class="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
		>Neem contact op</button
	>
</nav>
