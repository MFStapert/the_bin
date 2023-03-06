import { validate } from "./index";
import { Schema } from "./models";

describe("validate", () => {
  it('should fail when object is null', () => {
    let schema: Schema = {};
    expect(validate(null, schema)).toBe(false);
  });

  it('should fail when object is undefined', () => {    
    let schema: Schema = {};  
    expect(validate(undefined, schema)).toBe(false);
  });

  it('should fail when object has more keys then schema', () => {
    let schema: Schema = {};  
    let obj = {
      additionalProperty: true
    };
    expect(validate(obj, schema)).toBe(false);
  });

  it('should succeed when all object and properties match schema', () => {
    let schema: Schema = {
      string: 'string',
      number : 'number',
      array: 'array',
      object: 'object',
      boolean: 'boolean'
    };  
    let obj = {
      string: 'string',
      number : 0,
      array: [],
      object: {},
      boolean: true
    };
    expect(validate(obj, schema)).toBe(true);
  });

  it('should fail when object property does not correspond with property "string" in schema', () => {
    let schema: Schema = {
      property: 'string'
    };  
    let obj = {
      property: 1
    };
    expect(validate(obj, schema)).toBe(false);
  });
  
  it('should fail when object property does not correspond with property "number" in schema', () => {
    let schema: Schema = {
      property: 'number'
    };  
    let obj = {
      property: 'string'
    };
    expect(validate(obj, schema)).toBe(false);
  });

  it('should fail when object property does not correspond with property "array" in schema', () => {
    let schema: Schema = {
      property: 'array'
    };  
    let obj = {
      property: 'string'
    };
    expect(validate(obj, schema)).toBe(false);
  });

  it('should fail when object property does not correspond with property "object" in schema', () => {
    let schema: Schema = {
      property: 'object'
    };  
    let obj = {
      property: 'string'
    };
    expect(validate(obj, schema)).toBe(false);
  });

  it('should fail when object property does not correspond with property "boolean" in schema', () => {
    let schema: Schema = {
      property: 'boolean'
    };  
    let obj = {
      property: 'string'
    };
    expect(validate(obj, schema)).toBe(false);
  });
});
