<script context="module">
	export async function load({ page, fetch }) {
		const url = `/api/templates`;
		const res = await fetch(url);
		const json = await res.json();

		if (res.ok) {
			return {
				props: {
					templates: json.templates
				}
			};
		}
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import type { DocumentTemplate } from '$lib/models';

	export let templates: DocumentTemplate[];
	let newTemplateReq = null;

	function newTemplate() {
		newTemplateReq = fetch('/api/templates', { method: 'post' });
		newTemplateReq.then((req) => req.json()).then((res) => goto(`/templates/${res.template._id}`));
	}
</script>

<header class="flex flex-row items-baseline">
	<h1
		class="flex-auto my-4 text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-8"
	>
		Templates
	</h1>
	<button
		disabled={newTemplateReq}
		on:click={newTemplate}
		class="p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg border-blue-300"
		>New template</button
	>
</header>
{#if newTemplateReq}
	<div class="flex items-center justify-center space-x-2 animate-bounce">
		<div class="w-8 h-8 bg-blue-400 rounded-full" />
	</div>
{:else}
	<section class="mx-auto">
		<div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
			<div class="w-full overflow-x-auto">
				<table class="table-auto w-full">
					<thead>
						<tr
							class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-gray-600"
						>
							<th class="px-4 py-3">Template</th>
							<th class="px-4 py-3" />
						</tr>
					</thead>
					<tbody class="bg-white">
						{#each templates as template}
							<tr class="text-gray-700">
								<td class="px-4 py-3 border">{template.name}</td>
								<td class="px-4 py-3 w-px border"
									><a class="inline-block" href="/templates/{template._id}"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
											/>
										</svg></a
									></td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</section>
{/if}
