import { render, screen } from "@testing-library/react";
import { withHookSegregation } from "./withHookSegregation";
import { useState } from "react";
import { withEnv } from "./util";

function MyComponent(props: { name: string; country: string; age: number }) {
  return (
    <div>
      <ul>
        <li>Name: {props.name}</li>
        <li>Country: {props.age}</li>
        <li>Age: {props.country}</li>
      </ul>
    </div>
  );
}

function Loading() {
  return <h1>Loading</h1>;
}

it("returns a new component", () => {
  const Wrapped = withHookSegregation(
    MyComponent,
    { name: "John", age: 30, country: "US" },
    () => ({ data: {} })
  );

  // does not throw error
  render(<Wrapped />);
});

it("injects a initial state into the component", () => {
  const Wrapped = withHookSegregation(
    MyComponent,
    { name: "John", age: 30, country: "US" },
    () => ({ data: {} })
  );

  render(<Wrapped />);

  expect(screen.getByText(/John$/)).toBeInTheDocument();
});

it("injects async hook state into the component", () => {
  const Wrapped = withHookSegregation(MyComponent, {}, () => {
    useState(false);
    return {
      data: { name: "John", age: 30, country: "US" },
    };
  });

  render(<Wrapped />);

  expect(screen.getByText(/John$/)).toBeInTheDocument();
});

it("merge static props with async hook data", () => {
  const Wrapped = withHookSegregation(
    MyComponent,
    { age: 30, country: "US" },
    () => ({
      data: { name: "John" },
    })
  );

  render(<Wrapped />);

  expect(screen.getByText(/John$/)).toBeInTheDocument();
});

it("works with withEnv", () => {
  const Wrapped = withHookSegregation(
    MyComponent,
    withEnv({
      test: { age: 10, country: "US" },
      development: { age: 20, country: "US" },
      production: { age: 30, country: "US" },
    }),
    () => ({
      data: { name: "John" },
    })
  );

  render(<Wrapped />);

  expect(screen.getByText(/10$/)).toBeInTheDocument();
});

it("throws error when hook returns error field", () => {
  const Wrapped = withHookSegregation(
    MyComponent,
    { name: "John", age: 30, country: "US" },
    () => ({
      error: new Error(),
    })
  );

  expect(() => Wrapped({})).toThrowError();
});

it("allows invoking react hook inside of it", () => {
  const Wrapped = withHookSegregation(
    MyComponent,
    { name: "John", age: 30, country: "US" },
    () => {
      useState(false);
      return {};
    }
  );

  // does not throw error
  render(<Wrapped />);
});

it("ignores the field of the async hook overlapping with the initial props", () => {
  const Wrapped = withHookSegregation(
    MyComponent,
    { name: "John", age: 30, country: "US" },
    () => ({
      data: { name: "Alice" },
    })
  );

  render(<Wrapped />);

  expect(screen.getByText(/John$/)).toBeInTheDocument();
});

it("renders a given component until data received", () => {
  const Wrapped = withHookSegregation(
    MyComponent,
    { name: "John", age: 30, country: "US" },
    () => ({}),
    Loading
  );

  render(<Wrapped />);

  expect(screen.getByText(/^Loading$/)).toBeInTheDocument();
});

it("renders nothing if data field is not set", () => {
  const Wrapped = withHookSegregation(
    MyComponent,
    { name: "John", age: 30, country: "US" },
    () => ({})
  );

  const res = render(<Wrapped />);

  expect(res.container).toBeEmptyDOMElement();
});

it("conventionally has a displayName prefixed with `WithHookSegregation*` for debugging", () => {
  const c = withHookSegregation(MyComponent, {}, () => ({}));
  expect(c.displayName).toEqual("WithHookSegregationMyComponent");
});
