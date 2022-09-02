type NODE_ENV = "production" | "development" | "test";

export function withEnv<Data>(
  container:
    | { [key in NODE_ENV]: Data }
    | ({ [key in NODE_ENV]?: Data } & { development: Data })
    | ({ [key in NODE_ENV]?: Data } & { default: Data }),
  env: NODE_ENV = process.env.NODE_ENV as NODE_ENV
): Data {
  return container[env] || container.development || (container as any).default;
}
