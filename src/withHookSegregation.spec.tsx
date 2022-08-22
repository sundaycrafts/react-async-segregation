import { render, screen, waitFor } from "@testing-library/react";
import { renderHookedComponent } from "./__fixtures__/helpers/renderHookedComponent";
import { asyncHookPassingThroughInitialProps } from "./__fixtures__/helpers/asyncHookPassingThroughInitialProps";
import { withHookSegregation } from "./withHookSegregation";
import { MultiPropsComponent, MultiPropsComponentProps } from "./__fixtures__/MultiPropsComponent";
import { FC } from "react";

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

it("build curried component when given a partial props", async () => {
  const Curried: FC<Omit<MultiPropsComponentProps, "loading">> = withHookSegregation(
    MultiPropsComponent,
    { loading: false },
    (p) => p
  );
  render(<Curried label={"label"} />);

  expect(screen.queryByText("label")).toBeInTheDocument();
});
