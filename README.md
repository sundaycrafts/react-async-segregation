Encourage side effects segregation to make testing easier for React components

# `withAsyncSegregation`

```tsx
import {FC} from "react";
import {withAsyncSegregation, AsyncClient} from "react-async-segregation";

type MyProps = {
    loading: boolean
    /* other props... */
}

export const MyComponent: FC<MyProps> = ({loading}) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    return <div>Content</div>;
};

const asyncClient: AsyncClient<MyProps> = async (setState) => {
    fetch('/api/data')
        .then(res => res.json())
        .then((data: Partial<MyProps>) => setState((current) => ({...current, ...data, loading: false})));
}

const MyComponentWithSideEffects = withAsyncSegregation(MyComponent, {loading: true}, asyncClient);
export default MyComponentWithSideEffects;
```

# `withHookSegregation`

Segregate [React hooks](https://reactjs.org/docs/hooks-intro.html) such as [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext), [SWR](https://swr.vercel.app/) which (potentially) contains side-effects.

```tsx
import {FC} from "react";
import {withHookSegregation, AsyncHook} from "react-async-segregation";
import useFetch from "useFetch";

type MyProps = {
    loading: boolean;
    error: boolean;
    /* other props... */
}

export const MyComponent: FC<MyProps> = ({loading, error}) => {
    if (error) {
      return <div>Error Occurred</div>;
    }
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return <div>Content</div>;
};

const useAsyncHook: AsyncHook<MyProps> = (initialState) => {
  const { data, error } = useFetch('/api/data')
  
  if (error) {
    return {...initialState, loading: false, error: true}
  } else if (data) {
    return {...initialState, ...data, loading: false}
  } else {
    return initialState
  }
}

const MyComponentWithSideEffects = withHookSegregation(MyComponent, {loading: true, error: false}, useAsyncHook);
export default MyComponentWithSideEffects;
```
