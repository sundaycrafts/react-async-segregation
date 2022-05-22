import { screen } from "@testing-library/react";
import { renderWrappedComponent } from "./__fixtures__/helpers/renderWrappedComponent";
import { clientPassingThroughInitialProps } from "./__fixtures__/helpers/clientPassingThroughInitialProps";
import { clientUpdatingLoadingProps } from "./__fixtures__/helpers/clientUpdatingLoadingProps";

it("returns a new component", () => {
  // does not throw error
  renderWrappedComponent(clientPassingThroughInitialProps);
});

it("injects a initial state into the component", () => {
  renderWrappedComponent(clientPassingThroughInitialProps);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

it("updates the state by the client", () => {
  renderWrappedComponent(clientUpdatingLoadingProps);

  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
});
