import { getPosts } from '$lib/db';

export async function get() {
	const articles = await getPosts();

	if (articles) {
		return {
			body: {
				articles
			}
		};
	}
}
