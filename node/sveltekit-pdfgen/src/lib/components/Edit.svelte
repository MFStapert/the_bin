<script lang="ts">
	import { DocumentComponentType, DocumentTemplate } from '$lib/models';
	import { mongoObjectId } from '$lib/helpers';
	export let docTemplate: DocumentTemplate;

	function addPage(): void {
		const newPage = { _id: mongoObjectId(), components: [] };
		if (docTemplate.pages) {
			docTemplate.pages.push(newPage);
		} else {
			docTemplate['pages'] = [newPage];
		}
		docTemplate = docTemplate;
		updateTemplate();
	}

	function deletePage(id: string): void {
		docTemplate.pages = docTemplate.pages.filter((pages) => pages._id !== id);
		docTemplate = docTemplate;
		updateTemplate();
	}

	function addComponent(pageId: string) {
		if (!docTemplate.pages) {
			docTemplate['pages'] = [];
		}
		docTemplate.pages
			.find((p) => p._id === pageId)
			.components.push({
				_id: mongoObjectId(),
				componentType: DocumentComponentType.HELLO_WORLD
			});
		docTemplate = docTemplate;
		updateTemplate();
	}

	function deleteComponent(pageId: string, componentId: string): void {
		let page = docTemplate.pages.find((p) => p._id === pageId);
		page.components = page.components.filter((c) => c._id !== componentId);

		docTemplate = docTemplate;
		updateTemplate();
	}

	function updateTemplate() {
		fetch(`/api/templates/${docTemplate._id}`, {
			method: 'put',
			body: JSON.stringify(docTemplate)
		});
	}
</script>

{#each docTemplate.pages ?? [] as page}
	<section class="mx-auto">
		<div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
			<div class="w-full overflow-x-auto">
				<table class="table-auto w-full">
					<thead>
						<tr
							class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-gray-600"
						>
							<th class="px-4 py-3">Pagina</th>
							<th class="px-4 py-3">
								<div on:click={() => deletePage(page._id)} class="inline-block cursor-pointer">
									<svg
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
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										/>
									</svg>
								</div>
							</th>
						</tr>
					</thead>
					<tbody class="bg-white">
						{#each page.components ?? [] as component}
							<tr class="text-gray-700">
								<td class="px-4 py-3 border font-bold">Component</td>
								<td class="px-4 py-3 w-px border">
									<div
										on:click={() => deleteComponent(page._id, component._id)}
										class="inline-block cursor-pointer"
									>
										<svg
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
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											/>
										</svg>
									</div>
								</td>
							</tr>
						{/each}
						<tr class="text-gray-700">
							<td class="px-4 py-3 border font-bold" />
							<td class="px-4 py-3 w-px border">
								<div on:click={() => addComponent(page._id)} class="inline-block cursor-pointer">
									<svg
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
											d="M12 4v16m8-8H4"
										/>
									</svg>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>
{/each}

<footer class="fixed flex flex-row-reverse bottom-0 left-0 p-2 w-full">
	<button
		on:click={addPage}
		class="block ml-auto p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg border-blue-300"
	>
		New page</button
	>
</footer>
