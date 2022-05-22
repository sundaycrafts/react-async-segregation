import { AsyncClient } from "../../withAsyncSegregation";
import { MyComponentProps } from "../MyComponent";

export const clientUpdatingLoadingProps: AsyncClient<MyComponentProps> = (
  setState
) => setState((s) => ({ ...s, loading: !s.loading }));
