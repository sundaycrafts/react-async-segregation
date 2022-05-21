import { AsyncClient, withAsyncSegregation } from "../../index";
import { MyComponent, MyComponentProps } from "../MyComponent";
import { render } from "@testing-library/react";

export function renderWrappedComponent(
  asyncClient: AsyncClient<MyComponentProps>
) {
  const Wrapped = withAsyncSegregation(
    MyComponent,
    { loading: true },
    asyncClient
  );

  return render(<Wrapped />);
}
