<script lang="ts">
	import { onMount } from "svelte";
	import Item from "./Item.svelte";

	export let newTitle = "";
	export let error = false;
	export let items = [];

	onMount(async () => {
		const res = await fetch(`https://jsonplaceholder.cypress.io/todos/`);		
		items = await res.json();
		items = items.slice(0, 10);
	});

	function addItem() {
		if (newTitle.length === 0) {
			error = true;
			return;
		}
		error = false;		
		items = [
			...items,
			{ id: newId(), title: newTitle, completed: false },
		];
		newTitle = "";
	}

	function newId() {
		let id = 0;
		for (let item of items) {
			if (item.id > id) {
				id = item.id;
			}
		}
		return id+1;
	}

	function handleRemove(event) {
		items = items.filter((i) => i.id !== event.detail);
	}

	function handleComplete(event) {
		items = items.map((i) => {
			if (i.id === event.detail) {
				i.completed = !i.completed;
			}
			return i;
		});
	}
</script>

<main>
	<h1>TO-DON'T app</h1>

	<ul>
		{#each items as item}
			<Item {...item} on:remove={handleRemove} on:complete={handleComplete} />
		{/each}
	</ul>

	<div>
		<input type="text" bind:value={newTitle} />
		<button on:click={addItem}>Add todon't</button>
	</div>
	{#if error}
		<span class="error">Vul eerst een titel in</span>
	{/if}
</main>

<style>
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	main {
		padding: 1em;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	ul {
		list-style: none;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.error {
		display: inline-block;
		color: red;
	}
</style>
