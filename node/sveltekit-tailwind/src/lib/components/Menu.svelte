<script lang="ts">
	export let title = 'title';
	export let items = [];
</script>

<div>
	<span>{title}</span>
	<ul>
		{#each items as item}
			<li>
				<a class="text-blue-400 hover:underline" href="/">{item}</a>
			</li>
		{/each}
	</ul>
</div>
