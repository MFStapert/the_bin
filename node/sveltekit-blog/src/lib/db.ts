import pkg from 'mongoose';
const { Schema, model, connect } = pkg;
const dbhost = import.meta.env.VITE_DB_HOST as string;

export interface Article {
	_id: string;
	title: string;
	date: string;
	content?: string;
}

const schema = new Schema<Article>({
	title: { type: String, required: true },
	date: { type: String, required: true },
	content: String
});

const ArticleModel = model<Article>('Article', schema, 'Article');

export async function getPosts(): Promise<Article[]> {
	await connect(dbhost);
	return await ArticleModel.find();
}

export async function getPost(id: string): Promise<Article> {
	await connect(dbhost);
	return await ArticleModel.findById(id);
}
