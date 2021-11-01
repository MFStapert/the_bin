import { base, assets } from '$app/paths';
import { getPost } from '$lib/db';

export async function get({ params }) {
	const { id } = params;

	const article = await getPost(id);

	if (article) {
		return {
			body: {
				article
			}
		};
	}
}
