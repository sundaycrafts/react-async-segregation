Encourage side effects segregation to make testing easier for React components

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

# `withAsyncSegregation`

This HOC injects asynchronous function to prepare the initial data from remote hosts.
You can keep the component pure and test the function without React.

```tsx
/* ... */
import { withAsyncSegregation, AsyncClient } from "react-async-segregation";

type MyProps = {
  loading: boolean;
  error: boolean;
}

export const MyComponent: FC<MyProps> = ({ loading }) => {/* ...*/};

export const asyncClient: AsyncClient<MyProps> = async (setState) => {
  let data: Partial<MyProps>;
  
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
  } catch {
    setState((current) => ({...current, error: true}));
  }
  
  setState((current) => ({ ...current, ...data, loading: false }));
}

const defaultState = { loading: true, error: false };
const MyComponentWithSideEffects = withAsyncSegregation(MyComponent, defaultState, asyncClient);
export default MyComponentWithSideEffects;
```

# `withHookSegregation`

This HOC segregates [React hooks](https://reactjs.org/docs/hooks-intro.html) such
as [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext), [SWR](https://swr.vercel.app/) which
(potentially) contains side-effects.

```tsx
/* ... */
import { withHookSegregation, AsyncHook } from "react-async-segregation";

type MyProps = {
  loading: boolean;
  error: boolean;
}

export const MyComponent: FC<MyProps> = ({ loading, error }) => {/* ...*/};

const useAsyncHook: AsyncHook<MyProps> = (initialState) => {
  const [data, error] = useFetch('/api/data');

  if (error) {
    return { ...initialState, loading: false, error: true };
  } else if (data) {
    return { ...initialState, ...data, loading: false };
  } else {
    return initialState;
  }
}

const defaultState = { loading: true, error: false };
const MyComponentWithSideEffects = withHookSegregation(MyComponent, defaultState, useAsyncHook);
export default MyComponentWithSideEffects;
```
