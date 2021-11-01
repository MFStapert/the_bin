<script>
	import Menu from '$lib/components/Menu.svelte';
	let contactItems = ['info@avisi.nl', '088-284 74 00'];
	let groupItems = ['Adresgegevens', 'KvK- en BTW-nummers'];
</script>

<footer class="grid grid-cols-2 gap-2">
	<img src="/space.svg" alt="geen" />
	<div class="grid grid-cols-2 gap-2">
		<Menu title="Neem contact op" items={contactItems} />
		<Menu title="Avisi group" items={groupItems} />
	</div>
</footer>
