import { FC } from "react";

export type MyComponentProps = {
  loading: boolean;
};

export const MyComponent: FC<MyComponentProps> = ({ loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Content</div>;
};
