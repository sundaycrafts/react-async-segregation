import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

export type AsyncClient<Props> = (
  setState: Dispatch<SetStateAction<Props>>
) => void | Promise<void>;

export function withAsyncSegregation<Props>(
  Component: FC<Props>,
  initialProps: Props,
  asyncClient: AsyncClient<Props>
): FC {
  return () => {
    console.warn(
      "withAsyncSegregation is deprecated. use withHookSegregation with react-async-hook or swr instead"
    );
    const [s, ss] = useState<Props>(initialProps);
    useEffect(() => {
      asyncClient(ss);
    }, [ss]);
    return Component(s);
  };
}
