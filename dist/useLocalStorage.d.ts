import { Dispatch, SetStateAction } from "react";
type SetValue<T> = Dispatch<SetStateAction<T>>;
/**
 * useLocalStorage
 *
 * A lightweight hook that makes storing and modifying data in local storage as easy as setting state.
 *
 * @param key key for local storage instance
 * @param initialValue initial value for local storage instance
 * @returns current value, setter function, and exception object
 */
declare const useLocalStorage: <T>(
  key: string,
  initialValue: T
) => [
  T,
  SetValue<T>,
  {
    error: string;
  }
];
export default useLocalStorage;
//# sourceMappingURL=useLocalStorage.d.ts.map
