<script>
	import Footer from '$lib/layout/Footer.svelte';
	import Navigation from '$lib/layout/Navigation.svelte';
	import '../app.css';
</script>

<div class="bg-white p-6">
	<Navigation />
	<main>
		<slot />
	</main>
	<Footer />
</div>
