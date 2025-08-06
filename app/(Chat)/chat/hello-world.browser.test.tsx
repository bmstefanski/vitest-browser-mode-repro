import React from "react";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import HelloWorld from "./hello-world";

test("renders name", { repeats: 15 }, async () => {
  const { getByText, getByRole } = render(<HelloWorld name="Vitest" />);

  await expect.element(getByText("Hello Vitest x1!")).toBeInTheDocument();
  await getByRole("button", { name: "Increment " }).click();

  await expect.element(getByText("Hello Vitest x2!")).toBeInTheDocument();
});
