<script context="module">
	import * as Handlebars from 'handlebars';
	import { renderTemplate } from '$lib/engine';

	export async function load({ page, fetch }) {
		const url = `/api/templates/${page.params.id}`;
		const res = await fetch(url);
		const json = await res.json();

		if (res.ok) {
			const template = renderTemplate(json.template, Handlebars.create(), {
				pageClass: 'page-print'
			});
			return {
				props: {
					template: template
				}
			};
		}
	}
</script>

<script lang="ts">
	export let template: string;
</script>

<svelte:head>
	<style>
		.page-print {
			margin: 3cm auto;
			background: #fff;
			outline: 0;
		}
		/* Defines a class for manual page breaks via inserted .page-break element */
		div.page-break {
			page-break-after: always;
		}
		/* Simulates the behavior of manual page breaks from `print` mode in `screen` mode */
		@media screen {
			/* Renders the border and shadow at the bottom of the upper virtual page */
			div.page-break::before {
				content: '';
				display: block;
				/* Give a sufficient height to this element so that its drop shadow is properly rendered */
				height: 0.8cm;
				/* Offset the negative extra margin at the left of the non-pseudo element */
				margin-left: 0.5cm;
				/* Offset the negative extra margin at the right of the non-pseudo element */
				margin-right: 0.5cm;
				/* Make the bottom area appear as a part of the page margins of the upper virtual page */
				background-color: #fff;
			}
			/* Renders the empty space as a divider between the two virtual pages that are actually two parts of the same page */
			div.page-break {
				display: block;
				/* Assign the intended height plus the height of the pseudo element */
				height: 1.8cm;
				/* Apply a negative margin at the left to offset the page margins of the page plus some negative extra margin to paint over the border and shadow of the page */
				margin-left: -2.5cm;
				/* Apply a negative margin at the right to offset the page margins of the page plus some negative extra margin to paint over the border and shadow of the page */
				margin-right: -2.5cm;
				/* Create the bottom page margin on the upper virtual page (minus the height of the pseudo element) */
				margin-top: 1.2cm;
				/* Create the top page margin on the lower virtual page */
				margin-bottom: 2cm;
				/* Let this page appear as empty space between the virtual pages */
				background: #eee;
			}
		}
		/* For top-level headings only */
		.page-print h1 {
			/* Force page breaks after */
			page-break-before: always;
		}
		/* For all headings */
		.page-print h1,
		.page-print h2,
		.page-print h3,
		.page-print h4,
		.page-print h5,
		.page-print h6 {
			/* Avoid page breaks immediately */
			page-break-after: avoid;
		}
		/* For all paragraph tags */
		.page-print p {
			/* Reset the margin so that the text starts and ends at the expected marks */
			text-align: center;
			margin: 0;
		}
		/* For adjacent paragraph tags */
		.page-print p + p {
			/* Restore the spacing between the paragraphs */
			margin-top: 0.5cm;
		}
		/* For links in the document */
		.page-print a {
			/* Prevent colorization or decoration */
			text-decoration: none;
			color: black;
		}
		/* For tables in the document */
		.page-print table {
			/* Avoid page breaks inside */
			page-break-inside: avoid;
		}
		/* Use CSS Paged Media to switch from continuous documents to sheet-like documents with separate pages */
		@page {
			/* You can only change the size, margins, orphans, widows and page breaks here */

			/* Require that at least this many lines of a paragraph must be left at the bottom of a page */
			orphans: 4;
			/* Require that at least this many lines of a paragraph must be left at the top of a new page */
			widows: 2;
		}
		/* When the document is actually printed */
		@media print {
			html,
			body {
				/* Reset the document's background color */
				background-color: #fff;
			}
			.page-print {
				/* Reset all page styles that have been for better screen appearance only */
				/* Break cascading by using the !important rule */
				/* These resets are absolute must-haves for the print styles and the specificity may be higher elsewhere */
				width: initial !important;
				min-height: initial !important;
				margin: 0 !important;
				padding: 0 !important;
				border: initial !important;
				border-radius: initial !important;
				background: initial !important;
				box-shadow: initial !important;

				/* Force page breaks after each .page element of the document */
				page-break-after: always;
			}
		}

		.page-print {
			/* Styles for better appearance on screens only -- are reset to defaults in print styles later */

			/* Reflect the paper width in the screen rendering (must match size from @page rule) */
			width: 21cm;
			/* Reflect the paper height in the screen rendering (must match size from @page rule) */
			min-height: 29.7cm;

			/* Reflect the actual page margin/padding on paper in the screen rendering (must match margin from @page rule) */
			padding-left: 2cm;
			padding-top: 2cm;
			padding-right: 2cm;
			padding-bottom: 2cm;
		}
		/* Use CSS Paged Media to switch from continuous documents to sheet-like documents with separate pages */
		@page {
			/* You can only change the size, margins, orphans, widows and page breaks here */

			/* Paper size and page orientation */
			size: A4 portrait;

			/* Margin per single side of the page */
			margin-left: 2cm;
			margin-top: 2cm;
			margin-right: 2cm;
			margin-bottom: 2cm;
		}
	</style>
</svelte:head>
{@html template}
