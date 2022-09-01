import { ComponentType } from "react";

/**
 * HOC's convention: Wrap the Display Name for Easy Debugging
 * see https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
 */
export function getDisplayName(Comp: ComponentType<any>) {
  return Comp.displayName || Comp.name || "Component";
}
