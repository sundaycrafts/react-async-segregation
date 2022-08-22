import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

export type AsyncClient<Props> = (
  setState: Dispatch<SetStateAction<Props>>
) => void | Promise<void>;

export function withAsyncSegregation<Props,
  CurriedFields extends keyof Props = keyof Props>(
  Component: FC<Props>,
  curriedProps: Pick<Props, CurriedFields>,
  asyncClient: AsyncClient<Props>
): FC<Omit<Props, CurriedFields>> {
  return (props: Omit<Props, CurriedFields>) => {
    const [s, ss] = useState<Props>({ ...curriedProps, ...props } as Props);
    useEffect(() => {
      asyncClient(ss);
    }, [ss]);
    return Component(s);
  };
}
