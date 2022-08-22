import { withEnvSegregation } from "./withEnvSegregation";
import { MultiPropsComponent, MultiPropsComponentProps } from "./__fixtures__/MultiPropsComponent";
import { render } from "@testing-library/react";

it("returns a new component", () => {
  // does not throw error
  withEnvSegregation(MultiPropsComponent, {
    test: {},
    development: {},
    production: {}
  });
});

it("returns a curried component", () => {
  const defaultProps = {
    loading: false
  };

  const CurriedComp = withEnvSegregation(MultiPropsComponent, {
    test: defaultProps,
    development: defaultProps,
    production: defaultProps
  });

  render(<CurriedComp label={"label"} />);
});

it("specifies curried props by Generics", () => {
  const defaultProps = {
    loading: false
  };

  // does not throw error
  withEnvSegregation<MultiPropsComponentProps, "loading">(MultiPropsComponent, {
    test: defaultProps,
    development: defaultProps,
    production: defaultProps
  });
});
