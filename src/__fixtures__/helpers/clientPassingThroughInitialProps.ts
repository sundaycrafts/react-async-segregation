import { AsyncClient } from "../../index";
import { MyComponentProps } from "../MyComponent";

export const clientPassingThroughInitialProps: AsyncClient<MyComponentProps> = (
  setState
) => setState((s) => s);
