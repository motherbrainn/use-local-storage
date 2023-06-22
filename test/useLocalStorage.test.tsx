import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "../src/useLocalStorage";

beforeEach(() => {
  localStorage.clear();
});

describe("useLocalStorage", () => {
  test("create and update key value pair", () => {
    //initialize local storage key and value
    const testKey = "test-key";
    const testValue1 = "value-1";
    const testValue2 = "value-2";

    const { result } = renderHook(() => useLocalStorage(testKey, testValue1));

    const localStorageSetter = result.current[1];
    const valueFromHook = result.current[0];
    const exception = result.current[2];

    const actual = JSON.parse(localStorage.getItem(testKey));
    const expected = testValue1;

    //verify the actual value from localStorage and the return from the hook
    expect(actual).toBe(expected);
    expect(actual).toBe(valueFromHook);
    expect(exception).toBe(null);

    //update local storage entry using hook
    act(() => {
      localStorageSetter(testValue2);
    });

    const updatedActual = JSON.parse(localStorage.getItem(testKey));
    const updatedValueFromHook = result.current[0];
    const exception2 = result.current[2];
    const expectedUpdated = testValue2;

    //verify the actual value from localStorage and the return from the hook
    expect(updatedActual).toBe(expectedUpdated);
    expect(updatedValueFromHook).toBe(expectedUpdated);
    expect(exception2).toBe(null);
  });

  test("attempt to create a duplicate key", () => {
    //initialize local storage key and value
    const testKey = "test-key";
    const testValue1 = "value-1";
    const testValue2 = "value-2";

    const { result } = renderHook(() => useLocalStorage(testKey, testValue1));
    console.log(result);

    const localStorageSetter = result.current[1];
    const valueFromHook = result.current[0];
    const exception = result.current[2];

    const actual = JSON.parse(localStorage.getItem(testKey));
    const expected = testValue1;

    //verify the actual value from localStorage and the return from the hook
    expect(actual).toBe(expected);
    expect(actual).toBe(valueFromHook);
    expect(exception).toBe(null);

    //attempt to re create existing key with different value
    const { result: result2 } = renderHook(() =>
      useLocalStorage(testKey, testValue2)
    );

    const updatedActual = JSON.parse(localStorage.getItem(testKey));
    const exception2 = result2.current[2];
    const updatedValueFromHook = result2.current[0];

    const expecetedException = {
      error: "Cannot recreate existing key: value-2",
    };

    //verify the actual value from localStorage and the return from the hook were not updated
    expect(updatedActual).toBe(expected);
    expect(updatedActual).toBe(updatedValueFromHook);
    expect(exception2).toEqual(expecetedException);
  });
});
