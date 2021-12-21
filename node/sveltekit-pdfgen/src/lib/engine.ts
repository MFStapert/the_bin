import type { DocumentComponent, DocumentTemplate } from '$lib/models';
import { DocumentComponentType } from '$lib/models';
import type * as Handlebars from 'handlebars';

export const renderTemplate = (
	docTemplate: DocumentTemplate,
	handlebars: typeof Handlebars,
	config = { pageClass: 'page' }
) => {
	registerHelpers(handlebars);
	registerPartials(handlebars);

	// compile template and use data
	const template = buildTemplateString(docTemplate, config.pageClass);

	const compliledTemplate = handlebars.compile(template);

	return compliledTemplate({});
};

const buildTemplateString = (template: DocumentTemplate, pageClass: string): string => {
	let result = '';
	template.pages?.forEach((p) => {
		result += `<div class="${pageClass}">`;
		p.components?.forEach((c) => {
			result += buildComponent(c);
		});
		result += '</div>';
	});
	return result;
};

const buildComponent = (component: DocumentComponent): string => {
	switch (component.componentType) {
		case DocumentComponentType.HELLO_WORLD:
			return buildHelloWorld();
		case DocumentComponentType.PARAGRAPH:
			return buildParagraph(component);
		case DocumentComponentType.PARTIAL:
			return buildPartial(component);
		default:
			return buildUnknowComponent();
	}
};

const buildHelloWorld = (): string => {
	return '<p>hi world</p>';
};

const buildParagraph = (component: DocumentComponent): string => {
	return `<p>{{${component.fields?.find((f) => f)}}}</p>`;
};

const buildPartial = (component: DocumentComponent): string => {
	return `{{> ${component.fields?.find((f) => f)}}}'`;
};

const buildUnknowComponent = (): string => {
	return 'BUILDER ENCOUNTERED COMPONENT FOR WHICH NO BUILDER IS AVAILABLE';
};

export const registerHelpers = (hb: typeof Handlebars) => {
	// hb.registerHelper('capitalize', (text: string) => text.toUpperCase());
};

export const registerPartials = (hb: typeof Handlebars) => {
	// hb.registerPartial('helloWorld', '<p>{{capitalize partial}}</p>');
};
