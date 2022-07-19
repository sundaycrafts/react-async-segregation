import { AsyncHook, withHookSegregation } from "../../withHookSegregation";
import { MyComponent, MyComponentProps } from "../MyComponent";
import { render } from "@testing-library/react";

export function renderHookedComponent(
  asyncHook: AsyncHook<MyComponentProps>
) {
  const Wrapped = withHookSegregation(
    MyComponent,
    { loading: true },
    asyncHook
  );

  return render(<Wrapped />);
}