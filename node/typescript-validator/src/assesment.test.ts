import { validate } from "./index";
import { Schema } from "./models";

describe("bars", () => {
  const barSchema: Schema = {
    name: "string",
    address: "string",
    drinks: "object",
  };

  it("Should validate true", () => {
    expect(
      validate(
        {
          name: "Jimmys drinks",
          address: "Somewhere over the rainbow",
          drinks: {
            beer: ["Straffe Hendrik", "Rochefort", "St Bernard"],
          },
        },
        barSchema
      ).valid
    ).toBe(true);
  });

  it("Should validate false", () => {
    expect(
      validate(
        {
          name: "Sjonnies",
          address: "Centrum 001",
          drinks: [
            // < No object
            "Heineken",
          ],
        },
        barSchema
      ).valid
    ).toBe(false);
  });
});

describe("cars", () => {
  const carSchema: Schema = {
    brand: "string",
    type: "string",
    milage: "number",
    extras: "array",
  };

  it("Should validate true", () => {
    expect(
      validate(
        {
          brand: "Mazda",
          type: "MX5 NB 1.8",
          milage: 199999.99,
          extras: ["2001 Special Edition"],
        },
        carSchema
      ).valid
    ).toBe(true);
  });

  it("Should validate false", () => {
    expect(
      validate(
        {
          type: "335",
          milage: "100000", // < No number
          extras: ["LCI", "KW Coilovers"],
        },
        carSchema
      ).valid
    ).toBe(false);
  });
});

describe("persons", () => {
  const personSchema: Schema = {
    name: "string",
    age: "number",
    siblings: "array",
    metaData: "object",
    active: "boolean",
  };

  it("Should validate true", () => {
    expect(
      validate(
        {
          name: "James",
          age: 25,
          siblings: ["Johnnathan"],
          metaData: {},
          active: true,
        },
        personSchema
      ).valid
    ).toBe(true);
  });

  it("Should validate false", () => {
    expect(
      validate(
        {
          name: "James",
          age: 25,
          active: true,
        },
        personSchema
      ).valid
    ).toBe(false);
  });
});