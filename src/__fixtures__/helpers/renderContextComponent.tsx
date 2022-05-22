import { createContext, ReactNode, useContext, useState } from "react";
import { withContextSegregation } from "../../withContextSegregation";
import { render } from "@testing-library/react";
import { CountComponent, CountComponentProps } from "../CountComponent";

export function renderContextComponent() {
  const Context = createContext<CountComponentProps>({ count: 0 });

  const myContext = () => useContext(Context);

  const MyComponentWithContext = withContextSegregation(
    CountComponent,
    myContext
  );

  const MyProvider = (props: {
    value: CountComponentProps;
    children: ReactNode;
  }) => {
    return (
      <Context.Provider value={props.value}>{props.children}</Context.Provider>
    );
  };

  const Root = () => {
    const [count, setCount] = useState(0);
    return (
      <MyProvider value={{ count }}>
        <MyComponentWithContext />
        <button onClick={() => setCount((c) => c + 1)}>Count up</button>
      </MyProvider>
    );
  };
  return render(<Root />);
}
