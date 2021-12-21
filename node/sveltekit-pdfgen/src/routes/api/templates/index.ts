import { createTemplate, getTemplates } from '$lib/db';
import { adjectives, animals, uniqueNamesGenerator } from 'unique-names-generator';

export async function get() {
	const templates = await getTemplates();

	if (templates) {
		return {
			body: {
				templates
			}
		};
	}
}

export async function post() {
	const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, animals] });
	const template = await createTemplate(randomName);

	if (template) {
		return {
			body: {
				template
			}
		};
	}
}
