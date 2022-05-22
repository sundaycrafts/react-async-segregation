import { FC } from "react";

export type CountComponentProps = {
  count: number;
};

export const CountComponent: FC<CountComponentProps> = ({ count }) => {
  return <h1>count: {count}</h1>;
};
