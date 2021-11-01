<script context="module">
	export async function load({ page, fetch }) {
		const url = `/api/blog`;
		const res = await fetch(url);
		const json = await res.json();

		if (res.ok) {
			return {
				props: {
					articles: json.articles
				}
			};
		}
	}
</script>

<script lang="ts">
	import type { Article } from '$lib/db';
	export let articles: Article[];
</script>

<h1 class="page-title">Articles</h1>

{#each articles as article}
	<div class="blog-item">
		<a sveltekit:prefetch href="/blog/{article._id}">
			<h1>{article.title}!</h1>
			<h3>{article.date}</h3>
		</a>
	</div>
{/each}

<style lang="scss">
	.page-title {
		margin-bottom: $size-large;
	}
</style>
