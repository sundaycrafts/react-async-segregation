import { AsyncClient } from "../../withAsyncSegregation";
import { MyComponentProps } from "../MyComponent";

export const clientPassingThroughInitialProps: AsyncClient<MyComponentProps> = (
  setState
) => setState((s) => s);
