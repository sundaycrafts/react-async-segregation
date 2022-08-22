import { FC } from "react";

export type MultiPropsComponentProps = {
  label: string;
  loading: boolean;
};

export const MultiPropsComponent: FC<MultiPropsComponentProps> = ({ label, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{label}</div>;
};
