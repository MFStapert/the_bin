<script context="module">
	export async function load({ page, fetch }) {
		const url = `/api/templates/${page.params.id}`;
		const res = await fetch(url);
		const json = await res.json();

		if (res.ok) {
			return {
				props: {
					docTemplate: json.template
				}
			};
		}
	}
</script>

<script lang="ts">
	import Edit from '$lib/components/Edit.svelte';

	import View from '$lib/components/View.svelte';
	import type { DocumentTemplate } from '$lib/models';
	export let docTemplate: DocumentTemplate;

	let isView = false;
</script>

<header class="flex flex-row items-baseline">
	<h1
		class="flex-auto my-4 text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-8"
	>
		Template: <span class="font-normal">{docTemplate.name}</span>
	</h1>
	<a class="p-2 pl-5 pr-5 bg-gray-500 text-gray-100 text-lg rounded-lg border-gray-300" href="/"
		>home</a
	>
</header>

<ul class="flex cursor-pointer mb-8">
	<li
		on:click={() => (isView = false)}
		class:bg-gray-100={!isView}
		class="py-2 px-6 bg-white rounded-lg text-md font-semibold tracking-wide text-left text-gray-900 uppercase border-gray-600"
	>
		Edit
	</li>
	<li
		on:click={() => (isView = true)}
		class:bg-gray-100={isView}
		class="py-2 px-6 bg-white rounded-lg text-md font-semibold tracking-wide text-left text-gray-900  uppercase border-gray-600"
	>
		View
	</li>
</ul>
{#if isView}
	<View {docTemplate} />
{:else}
	<Edit {docTemplate} />
{/if}
