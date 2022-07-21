import { screen } from "@testing-library/react";
import { renderContextComponent } from "./__fixtures__/helpers/renderContextComponent";
import userEvent from "@testing-library/user-event";

xit("returns a new component", () => {
  // does not throw error
  renderContextComponent();
});

xit("injects a context value into the component", () => {
  renderContextComponent();

  expect(screen.getByRole("heading")).toHaveTextContent("0");
});

xit("updates the context value by state", async () => {
  const user = userEvent.setup();
  renderContextComponent();

  await user.click(screen.getByRole("button"));

  expect(screen.getByRole("heading")).toHaveTextContent("1");
});
