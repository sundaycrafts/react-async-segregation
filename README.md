Encourage side effects segregation for React component

# Usage

```tsx
import {FC} from 'react';
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
        .then((data: MyProps) => setState((current) => ({...current, ...data, loading: false})));
}

const MyComponentWithSideEffects = withAsyncSegregation(MyComponent, {loading: true}, asyncClient);
export default MyComponentWithSideEffects;
```
