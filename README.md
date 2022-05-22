Encourage side effects segregation for React component

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

# `withContextSegregation`

```tsx
import {createContext, useContext} from "react";
import {withContextSegregation, CurriedUseContext} from "react-async-segregation";

type MyProps = {
    name: string;
}

export const MyComponent: FC<MyProps> = ({name}) => {
    return <h1>Hello {name}</h1>;
};

export const MyContext = createContext<MyProps>({name: ""});
const curriedContext: CurriedUseContext<MyProps> = () => useContext(MyContext);

const MyComponentWithSideEffects = withContextSegregation(MyComponent, curriedContext);
export default MyComponentWithSideEffects;
```
