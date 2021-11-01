<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let id: number;
	export let title: string;
	export let completed: boolean;

	const dispatch = createEventDispatcher();

	function complete() {
		dispatch('complete', id);
	}

	function remove() {
		dispatch('remove', id);
	}
</script>

<li in:fly="{{ x: 200, duration: 1000 }}">  
	<input type="checkbox" on:click={complete} checked={completed} />
	<span class:strikethrough={completed === true}>{title}</span>
	<button on:click={remove}>x</button>
</li>

<style>
	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	input {
		margin-right: 8px;
	}

	span {
		flex-grow: 2;
	}

	.strikethrough {
		text-decoration: line-through;
	}
	button {
		margin-left: 8px;
		color: gray;
	}
</style>
