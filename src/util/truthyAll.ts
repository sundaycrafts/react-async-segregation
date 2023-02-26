type TruthyRecord<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

export function truthyAll<C extends Record<string, any | (() => any)>, T>(
  conditions: C,
  then: (conditions: TruthyRecord<C>) => T
): T | undefined {
  if (
    Object.values(conditions).every((v) => {
      if (typeof v === "function") {
        return v();
      } else {
        return !!v;
      }
    })
  ) {
    return then(conditions as TruthyRecord<C>);
  } else {
    return undefined;
  }
}
