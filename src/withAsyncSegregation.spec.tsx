import { render, screen } from "@testing-library/react";
import { renderWrappedComponent } from "./__fixtures__/helpers/renderWrappedComponent";
import { clientPassingThroughInitialProps } from "./__fixtures__/helpers/clientPassingThroughInitialProps";
import { clientUpdatingLoadingProps } from "./__fixtures__/helpers/clientUpdatingLoadingProps";
import { FC } from "react";
import { MultiPropsComponent, MultiPropsComponentProps } from "./__fixtures__/MultiPropsComponent";
import { withAsyncSegregation } from "./withAsyncSegregation";

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

it("build curried component when given a partial props", async () => {
  const Curried: FC<Omit<MultiPropsComponentProps, "loading">> = withAsyncSegregation(
    MultiPropsComponent,
    { loading: false },
    (setState) => setState(s => s)
  );
  render(<Curried label={"label"} />);

  expect(screen.queryByText("label")).toBeInTheDocument();
});
