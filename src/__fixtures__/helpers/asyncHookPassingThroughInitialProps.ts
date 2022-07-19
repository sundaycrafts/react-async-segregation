import { AsyncHook } from "../../withHookSegregation";
import { MyComponentProps } from "../MyComponent";
import { useEffect, useState } from "react";

export const asyncHookPassingThroughInitialProps: AsyncHook<MyComponentProps> = (initialState) => {
  const [loading, setLoading] = useState(initialState.loading);

  useEffect(() => {
    // use setTimeout to simulate React lifecycle events
    setTimeout(() => setLoading((x) => !x), 0);
  }, [setLoading]);

  return { loading };
};