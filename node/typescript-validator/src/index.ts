import { Schema, SchemaType, ValidationResult } from "./models";

export const validate = (obj: any, schema: Schema): ValidationResult => {
  if (!obj) {
    return {
      valid: false,
      errors: ["Passed object should not be null or undefined"],
    };
  }
  // validate all object keys are actually in schema
  const objectKeys = Object.keys(obj);
  const schemaKeys = Object.keys(schema);

  const checkedKeys = objectKeys.filter((value) => !schemaKeys.includes(value));
  if (checkedKeys.length !== 0) {
    return { valid: false, errors: ["Not all keys present in passed object"] };
  }

  const errors = schemaKeys
    .map((schemaKey) => validateProperty(obj[schemaKey], schema[schemaKey]))
    .filter((error) => error !== null);

  return { valid: errors.length === 0, errors: errors as string[] };
};

const validateProperty = (
  objProperty: unknown,
  type: SchemaType
): string | null => {
  switch (type) {
    case "string":
      let isString = typeof objProperty === "string";
      return isString ? null : "Property should be a string";
    case "number":
      let isNumber = typeof objProperty === "number";
      return isNumber ? null : "Property should be a number";
    case "array":
      return Array.isArray(objProperty) ? null : "Property should be a array";
    case "object":
      let isObject = typeof objProperty === "object";
      let notAnArray = !Array.isArray(objProperty);
      return isObject && notAnArray ? null : "Property should be a object";
    case "boolean":
      let isBool = typeof objProperty === "boolean";
      return isBool ? null : "Property should be a boolean";
  }
};
