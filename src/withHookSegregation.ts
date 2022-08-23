import { FC } from "react";

export type AsyncHook<Props> = (
  currentState: Props
) => Props;

export function withHookSegregation<Props>(
  Component: FC<Props>,
  initialProps: Props,
  useAsyncHook: AsyncHook<Props>
): FC {
  return () => Component(useAsyncHook(initialProps));
}
