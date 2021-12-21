import pkg from 'mongoose';
import type { DocumentTemplate } from './models';
const { Schema, model, connect } = pkg;
const dbhost = import.meta.env.VITE_DB_HOST as string;

const schema = new Schema<DocumentTemplate>({
	name: { type: String, required: true },
	pages: [
		{
			components: [
				{
					componentType: String,
					fields: [String]
				}
			]
		}
	]
});

const TemplateModel = model<DocumentTemplate>('Template', schema, 'templates');

export async function getTemplates(): Promise<DocumentTemplate[]> {
	await connect(dbhost);
	return await TemplateModel.find();
}

export async function getTemplate(id: string): Promise<DocumentTemplate> {
	await connect(dbhost);
	return await TemplateModel.findById(id);
}

export async function createTemplate(name: String): Promise<DocumentTemplate> {
	await connect(dbhost);
	const doc = new TemplateModel({ name: name });
	return await doc.save();
}

export async function saveTemplate(template: DocumentTemplate): Promise<DocumentTemplate> {
	await connect(dbhost);
	const doc = await TemplateModel.findOneAndUpdate({ _id: template._id }, template);
	return doc;
}
