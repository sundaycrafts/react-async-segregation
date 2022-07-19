import { screen, waitFor } from "@testing-library/react";
import { renderHookedComponent } from "./__fixtures__/helpers/renderHookedComponent";
import { asyncHookPassingThroughInitialProps } from "./__fixtures__/helpers/asyncHookPassingThroughInitialProps";

it("returns a new component", () => {
  // does not throw error
  renderHookedComponent(asyncHookPassingThroughInitialProps);
});

it("injects a initial state into the component", () => {
  renderHookedComponent(asyncHookPassingThroughInitialProps);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

it("updates the state by the client", async () => {
  renderHookedComponent(asyncHookPassingThroughInitialProps);

  await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());
});
