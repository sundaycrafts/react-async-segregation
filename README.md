[![npm](https://img.shields.io/npm/v/react-async-segregation)](https://npmjs.com/package/react-async-segregation)

Encourage side effects segregation to make testing easier for React components

# `withHookSegregation`

This HOC injects initial rendering data from asynchronous [React hooks](https://reactjs.org/docs/hooks-intro.html) such
as [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext), [SWR](https://swr.vercel.app/).

You can keep the component pure with this HOC to easy to test.

```tsx
import { withHookSegregation } from "react-async-segregation";

export function MyComponent(props: {
  name: string;
  country: string;
  age: number;
  useFetcher: () => { data: any; error: Error; }
}) {/* ...*/}

const staticProps = { country: "Neverland", useFetcher: () => {/*...*/} };
export default withHookSegregation(MyComponent, staticProps, () => {
  // ... call more asynchronous hooks here ...
  return {
    data: { name: "Alice", age: 18 },
    error: undefined // withHookSegregation simpliy throws this if it's given
  }
}, /* (option) LoadingComponent */);
```

# `withEnvSegregation`

This HOC injects dependencies for each environment.
This is useful for building a testable component which is called from others.

It uses `development` props as a default in case `NODE_ENV` is not given or given an unexpected value for some reason.

```tsx
/* ... */
import { withEnvSegregation } from "react-async-segregation";

type HooksTuple = [data?: string, error?: Error];

type MyProps = {
  useAsync: () => HooksTuple;
  children: ReactNode;
};

export const MyComponent: FC<MyProps> = (props) => {/* ...*/};

const stubHook = () => ["data", undefined] as HooksTuple;

const ConfiguredMyComponent = withEnvSegregation(
  MyComponent,
  {
    production: { useAsync: useSideEffect },
    development: { useAsync: useSideEffect },
    test: { useAsync: stubHook },
  },
  /* option: you can pass custom environment variable here */
  // process.env.MY_ENV as "development" | "production" | "test"
);

export default ConfiguredMyComponent;

/* === in other file === */
import ConfiguredMyComponent from "./MyComponent";

const OtherComponent = () => (
  <ConfiguredMyComponent>Content</ConfiguredMyComponent>
);
```
