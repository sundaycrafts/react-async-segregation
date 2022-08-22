import { FC } from "react";

export type AsyncHook<Props> = (
  props: Props
) => Props;

export function withHookSegregation<Props,
  CurriedFields extends keyof Props = keyof Props>(
  Component: FC<Props>,
  curriedProps: Pick<Props, CurriedFields>,
  useAsyncHook: AsyncHook<Props>
): FC<Omit<Props, CurriedFields>> {
  return (props: Omit<Props, CurriedFields>) =>
    Component(useAsyncHook({ ...curriedProps, ...props } as Props));
}
