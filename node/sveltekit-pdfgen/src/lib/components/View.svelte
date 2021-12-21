<script lang="ts">
	const pdfServer = import.meta.env.VITE_PDF_SERVER as string;
	import { onMount } from 'svelte';
	import * as Handlebars from 'handlebars';
	import type { DocumentTemplate } from '$lib/models';
	import { renderTemplate } from '$lib/engine';

	export let docTemplate: DocumentTemplate;
	let template: string;

	onMount(async () => {
		template = renderTemplate(docTemplate, Handlebars.create());
	});

	function exportPage() {
		fetch(`${pdfServer}/${docTemplate._id}`)
			.then((res) => res.blob())
			.then((blob) => {
				const url = URL.createObjectURL(blob);
				var a = document.createElement('a');
				a.href = url;
				a.download = 'filename.xlsx';
				document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
				a.click();
				a.remove();
			});
	}
</script>

{@html template}

<footer class="fixed flex flex-row-reverse bottom-0 left-0 p-2 w-full">
	<button
		on:click={exportPage}
		class="block ml-auto p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg border-blue-300"
	>
		Export to pdf</button
	>
</footer>

<style>
	:global(.page) {
		margin: 0 auto 32px;
		box-shadow: 2px 2px 5px 2px;
		outline: 0;
		width: 21cm;
		min-height: 29.7cm;
		padding-left: 2cm;
		padding-top: 2cm;
		padding-right: 2cm;
		padding-bottom: 2cm;
	}

	:global(.page h1, h2, h3, h4, h5, h6) {
		page-break-after: avoid;
	}

	:global(.page p) {
		margin: 0;
	}

	:global(.page p + p) {
		margin-top: 0.5cm;
	}

	:global(.page a) {
		text-decoration: none;
		color: black;
	}

	:global(.page table) {
		page-break-inside: avoid;
	}
</style>
