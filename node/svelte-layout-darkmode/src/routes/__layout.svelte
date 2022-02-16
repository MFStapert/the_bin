<script>
	import Topbar from '$lib/components/Topbar.svelte';
	import Sidenav from '$lib/components/Sidenav.svelte';
	import '../styles/app.css';
	import Pageheader from '$lib/components/Pageheader.svelte';
</script>

<header class="topbar">
	<Topbar />
</header>

<nav class="sidebar">
	<Sidenav />
</nav>

<main class="main">
	<Pageheader />
	<div class="w-4/6 mx-auto pt-8">
		<slot />
	</div>
</main>
