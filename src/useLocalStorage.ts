import { useState, useEffect, Dispatch, SetStateAction } from "react";

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
const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, SetValue<T>, null | { error: string }] => {
  let exception = null;
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) {
      return initialValue;
    } else {
      exception = {
        error: `Cannot recreate existing key: ${initialValue}`,
      };
      return JSON.parse(storedValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const updateValue: SetValue<T> = (newValue: SetStateAction<T>) => {
    setValue(newValue);
  };

  return [value, updateValue, exception];
};

export default useLocalStorage;
