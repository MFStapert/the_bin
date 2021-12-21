import { getTemplate, saveTemplate } from '$lib/db';

export async function get({ params }) {
	const { id } = params;

	const template = await getTemplate(id);

	if (template) {
		return {
			body: {
				template
			}
		};
	}
}

export async function put({ body }) {
	const template = await saveTemplate(JSON.parse(body));

	if (template) {
		return {
			body: {
				template
			}
		};
	}
}
