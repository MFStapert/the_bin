export enum DocumentComponentType {
	HELLO_WORLD = 'HELLO_WORLD',
	PARAGRAPH = 'PARAGRAPH',
	PARTIAL = 'PARTIAL'
}

export interface DocumentComponent extends BaseModel {
	componentType: DocumentComponentType;
	fields?: string[];
}

export interface DocumentPage extends BaseModel {
	components?: DocumentComponent[];
}

export interface DocumentTemplate extends BaseModel {
	name: string;
	pages?: DocumentPage[];
}

export interface BaseModel {
	_id: string;
}
