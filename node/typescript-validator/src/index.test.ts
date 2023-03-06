import { validate } from "./index";

describe("validate", () => {
  it('should return true', () => {
    expect(validate(null, null)).toBe(true);
  });
});
