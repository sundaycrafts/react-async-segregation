[![npm](https://img.shields.io/npm/v/react-async-segregation)](https://npmjs.com/package/react-async-segregation)

Encourage side effects segregation to make testing easier for React components

# Usage

This HOC injects initial rendering data from asynchronous [React hooks](https://reactjs.org/docs/hooks-intro.html) such
as [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext), [SWR](https://swr.vercel.app/).

You can keep the component pure with this HOC to make it easy to test.

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
    error: undefined // withHookSegregation simply throws this if it's given
  }
}, /* (option) LoadingComponent */);
```

# Utilities

## `withEnv`

It allows you to switch dependencies by environment variables.
It is useful for building a testable component that is called by others.

Its precedence order of entries is corresponding env > `development` > `default`.

```tsx
//...
import { withEnv } from 'react-async-segregation/util'

const Frame = (props: {
  children: string,
  remoteData: any,
  useFetchData: () => {data: any; error: Error }
}) => {/* ... */}

const ConfiguredFrame = (children: string) => withHookSegregation(
  Frame,
  {
    children,
    useFetchData: () => {/* ... */}
  },
  withEnv({
    test: () => ({data: { remoteData: "remote data" }}),
    default: asyncHook,
  }))

export default ConfiguredFrame

// Page.tsx
const Page = () => (<ConfiguredFrame>Hello World!</ConfiguredFrame>)
```
