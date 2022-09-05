import { FC } from "react";
import { getDisplayName } from "./util/get-display-name";

export type AsyncHook<
  Props,
  PickedFields extends keyof Props = keyof Props
> = () => {
  data?: {
    [P in Extract<keyof Props, PickedFields>]: Props[P];
  };
  error?: Error;
};

export function withHookSegregation<Props, StaticPropsKeys extends keyof Props>(
  Component: FC<Props>,
  staticProps: { [P in StaticPropsKeys]: Props[P] },
  asyncHook: AsyncHook<Props, Exclude<keyof Props, StaticPropsKeys>>,
  Loading: FC<{}> = () => null
): FC<{}> {
  const fn = () => {
    const { data, error } = asyncHook();

    if (error) throw error;
    if (!data) return <Loading />;

    return <Component {...({ ...data, ...staticProps } as Props)} />;
  };

  fn.displayName = `WithHookSegregation${getDisplayName(Component)}`;

  return fn;
}
