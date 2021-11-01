<script context="module">
	export async function load({ page, fetch }) {
		const url = `/api/blog/${page.params.id}`;
		const res = await fetch(url);
		const json = await res.json();

		if (res.ok) {
			return {
				props: {
					article: json.article
				}
			};
		}
	}
</script>

<script lang="ts">
	import type { Article } from '$lib/db';
	export const prerender = true;
	export let article: Article;
</script>

<h1>{article.title}</h1>
<p>{article.content}</p>

<style lang="scss">
	h1 {
		width: 100%;
		margin-bottom: $size-large;
	}
</style>
