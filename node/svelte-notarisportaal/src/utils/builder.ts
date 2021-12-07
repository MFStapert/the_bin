// credit to brianvanburken

export type AbstractBuilder<T, B = Record<string, unknown>> = {
  // Take each key from T and define a function that takes an argument of the
  // same type as the property in T which returns an instance of the builder
  [K in keyof T & string as `with${Capitalize<K>}`]: (
    arg: T[K]
    // "B & Record<K, T[K]>" merges the generic record with a record that contains
    // the property with the same type as the interface
  ) => AbstractBuilder<T, B & Record<K, T[K]>>;
} & {
  // Add build property that returns T in case B fully matches the interface.
  // Else it will return "never". This enforces completion
  build: B extends T ? () => T : () => never;

  // This takes a completed instance of T and returns a completed builder T
  from: (t: T) => AbstractBuilder<T, T>;
};

export function Builder<T>(): AbstractBuilder<T> {
  let state: Record<string, unknown> = {};

  const Builder = new Proxy(
    {},
    {
      get(_target, prop: string) {
        // If property is "build" we return our internal state to finish
        // the builder.
        if (prop === "build") {
          return () => state;
        }

        // Clone all properties from given "completed" object
        if (prop === "from") {
          return (a: T): AbstractBuilder<T> => {
            state = { ...state, ...a };
            return Builder as AbstractBuilder<T>;
          };
        }

        // Remove "with" and uncapitalize property
        prop = prop.charAt(4).toLowerCase() + prop.slice(5);

        return (x: unknown): AbstractBuilder<T> => {
          state[prop.toString()] = x;
          return Builder as AbstractBuilder<T>;
        };
      },
    }
  );

  return Builder as AbstractBuilder<T>;
}
