import { AsyncClient } from "../../index";
import { MyComponentProps } from "../MyComponent";

export const clientUpdatingLoadingProps: AsyncClient<MyComponentProps> = (
  setState
) => setState((s) => ({ ...s, loading: !s.loading }));
