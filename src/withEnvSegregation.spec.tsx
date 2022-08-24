import { withEnvSegregation } from "./withEnvSegregation";
import { MultiPropsComponent, MultiPropsComponentProps } from "./__fixtures__/MultiPropsComponent";
import { screen, render } from "@testing-library/react";

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

it("uses custom environment when it is given", async () => {
  const CUSTOM_ENV = "production";

  const Configured = withEnvSegregation(MultiPropsComponent, {
    test: null as any,
    development: null as any,
    production: {
      loading: false,
      label: "default"
    }
  }, CUSTOM_ENV);

  render(<Configured />);

  expect(await screen.findByText("default")).toBeInTheDocument();
});

it("uses development props when given no environment", async () => {
  const Configured = withEnvSegregation(MultiPropsComponent, {
    test: null as any,
    development: {
      loading: false,
      label: "default"
    },
    production: null as any
  }, null as any);

  render(<Configured />);

  expect(await screen.findByText("default")).toBeInTheDocument();
});

it("uses development props when given unexpected environment", async () => {
  const Configured = withEnvSegregation(MultiPropsComponent, {
    test: null as any,
    development: {
      loading: false,
      label: "default"
    },
    production: null as any
  }, "unexpected" as any);

  render(<Configured />);

  expect(await screen.findByText("default")).toBeInTheDocument();
});
