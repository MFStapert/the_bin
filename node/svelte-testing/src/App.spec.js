/**
 * @jest-environment jsdom
 */

import App from "./App.svelte";
import { render } from "@testing-library/svelte";
import { domainFunction } from "./functions";

it("Component test", async () => {
  // Given
  const testStr = "tst";

  // When
  const { getByText } = render(App, { name: testStr });

  // Then
  expect(getByText(testStr));
});

it("Domain function", async () => {
  // Given
  const testStr = "tst";

  // When
  const res = domainFunction(testStr);

  // Then
  expect(res).toEqual(testStr);
});
