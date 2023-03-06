import { validate } from "./index";
import { Schema } from "./models";

describe("validate", () => {
  it("should fail when object is null", () => {
    let schema: Schema = {};
    let obj = {
      additionalProperty: true,
    };
    let validationResult = validate(null, schema);
    expect(validationResult.valid).toBe(false);
    expect(validationResult.errors[0]).toBe(
      "Passed object should not be null or undefined"
    );
  });

  it("should fail when object is undefined", () => {
    let schema: Schema = {};
    let validationResult = validate(undefined, schema);
    expect(validationResult.valid).toBe(false);
    expect(validationResult.errors[0]).toBe(
      "Passed object should not be null or undefined"
    );
  });

  it("should fail when object has key not in schema", () => {
    let schema: Schema = {};
    let obj = {
      additionalProperty: true,
    };
    let validationResult = validate(obj, schema);
    expect(validationResult.valid).toBe(false);
    expect(validationResult.errors[0]).toBe(
      "Not all keys present in passed object"
    );
  });

  it('should fail when object property does not correspond with property "string" in schema', () => {
    let schema: Schema = {
      property: "string",
    };
    let obj = {
      property: 1,
    };
    let validationResult = validate(obj, schema);
    expect(validationResult.valid).toBe(false);
    expect(validationResult.errors[0]).toBe("Property should be a string");
  });

  it('should fail when object property does not correspond with property "number" in schema', () => {
    let schema: Schema = {
      property: "number",
    };
    let obj = {
      property: "string",
    };
    let validationResult = validate(obj, schema);
    expect(validationResult.valid).toBe(false);
    expect(validationResult.errors[0]).toBe("Property should be a number");
  });

  it('should fail when object property does not correspond with property "array" in schema', () => {
    let schema: Schema = {
      property: "array",
    };
    let obj = {
      property: "string",
    };
    let validationResult = validate(obj, schema);
    expect(validationResult.valid).toBe(false);
    expect(validationResult.errors[0]).toBe("Property should be a array");
  });

  it('should fail when object property does not correspond with property "object" in schema', () => {
    let schema: Schema = {
      property: "object",
    };
    let obj = {
      property: "string",
    };
    let validationResult = validate(obj, schema);
    expect(validationResult.valid).toBe(false);
    expect(validationResult.errors[0]).toBe("Property should be a object");
  });

  it('should fail when object property does not correspond with property "boolean" in schema', () => {
    let schema: Schema = {
      property: "boolean",
    };
    let obj = {
      property: "string",
    };
    let validationResult = validate(obj, schema);
    expect(validationResult.valid).toBe(false);
    expect(validationResult.errors[0]).toBe("Property should be a boolean");
  });

  it("should succeed when all object and properties match schema", () => {
    let schema: Schema = {
      string: "string",
      number: "number",
      array: "array",
      obj: "object",
      boolean: "boolean",
    };
    let obj = {
      string: "string",
      number: 0,
      array: [],
      obj: {},
      boolean: true,
    };
    let validationResult = validate(obj, schema);
    expect(validationResult.valid).toBe(true);
  });
});
