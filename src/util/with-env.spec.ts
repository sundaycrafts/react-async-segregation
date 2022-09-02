import { withEnv } from "./with-env";

it("uses a data corresponding to given environment variables - 1", () => {
  const data = withEnv(
    {
      test: { name: "test" },
      development: { name: "development" },
      production: { name: "production" },
    },
    "test"
  );

  expect(data.name).toEqual("test");
});

it("uses a data corresponding to given environment variables - 2", () => {
  const data = withEnv(
    {
      test: { name: "test" },
      development: { name: "development" },
      production: { name: "production" },
    },
    "production"
  );

  expect(data.name).toEqual("production");
});

it("uses development container as a default", () => {
  const data = withEnv(
    {
      development: { name: "development" },
      production: { name: "production" },
    },
    "none" as any
  );

  expect(data.name).toEqual("development");
});

it("uses default container as a default", () => {
  const data = withEnv(
    {
      test: { name: "test" },
      production: { name: "production" },
      default: { name: "default" },
    },
    "none" as any
  );

  expect(data.name).toEqual("default");
});

it("uses development container when a default container is also given", () => {
  const data = withEnv(
    {
      development: { name: "development" },
      default: { name: "default" },
    },
    "none" as any
  );

  expect(data.name).toEqual("development");
});
