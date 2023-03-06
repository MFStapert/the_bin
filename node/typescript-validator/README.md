# Typescript validator

A validator library that checks javascript object against a schema.

## Usage
```
let schema = {
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
// validationResult.valid === true
// validationResult.errors contains possible validation errors
```

## Running localy
To install dependencies:
```
npm ci
```

To run tests:
```
npm run test
```

To compile typescript:
```
npm run build
```

No steps have been taken to ensure this works outside of the test suite, so proceed at your own peril.