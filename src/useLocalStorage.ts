import { useState, useEffect, Dispatch, SetStateAction } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

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
