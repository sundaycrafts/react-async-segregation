/**
 * We need this temporarily to use `act`
 * see: https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
 */
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

/**
 * Extends Jest with custom matchers with @testing-library/jest-dom
 * such as `.toBeInTheDocument()`
 */
import "@testing-library/jest-dom/extend-expect";
