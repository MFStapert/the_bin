type SchemaType = 'string' | 'number' | 'array' | 'object' | 'boolean';

export type Schema = {
    [key: string]: SchemaType;
};
