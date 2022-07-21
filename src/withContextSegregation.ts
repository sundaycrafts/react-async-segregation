import { FC } from "react";

/**
 * Curried `useContext` hook.
 *
 * @example
 * import { createContext, useContext } from "react";
 *
 * type MyProps = { foo: string };
 *
 * const MyComponent = (props: MyProps) => (<h1>My Component</h1>);
 * const MyContext = createContext({ foo: "" });
 * const curriedContext = () => useContext(MyContext);
 *
 * withContextSegregation(MyComponent, curriedContext);
 */
export type CurriedUseContext<P> = () => P;

export function withContextSegregation<Props>(
  Component: FC<Props>,
  useContexts: CurriedUseContext<Props>
): FC {
  console.warn("this package is deprecated, use withHookSegregation instead");
  return () => Component(useContexts());
}
