<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	<title>Blog</title>
</svelte:head>

<header>
	<div class="container">
		<h1 class="site-title">
			<a href="/"><span class="color-primary">Site</span></a>
		</h1>
		<nav class="main-nav">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/blog">Blog</a></li>
			</ul>
		</nav>
	</div>
</header>

<main>
	<div class="container"><slot /></div>
</main>

<footer>
	<div class="container">
		<h2>Footer</h2>
	</div>
</footer>

<style lang="scss">
	:global {
		@import '../styles/main.scss';
	}
</style>
