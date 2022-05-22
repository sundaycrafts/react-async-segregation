import { screen } from "@testing-library/react";
import { renderContextComponent } from "./__fixtures__/helpers/renderContextComponent";
import userEvent from "@testing-library/user-event";

it("returns a new component", () => {
  // does not throw error
  renderContextComponent();
});

it("injects a context value into the component", () => {
  renderContextComponent();

  expect(screen.getByRole("heading")).toHaveTextContent("0");
});

it("updates the context value by state", async () => {
  const user = userEvent.setup();
  renderContextComponent();

  await user.click(screen.getByRole("button"));

  expect(screen.getByRole("heading")).toHaveTextContent("1");
});
