import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "../src/useLocalStorage";

describe("useLocalStorage", () => {
  test("create and update key value pair", () => {
    //initialize local storage key and value
    const testValue1 = "value-1";
    const testValue2 = "value-2";

    const { result } = renderHook(() =>
      useLocalStorage("test-key", testValue1)
    );

    const actual = result.current[0];
    const expected = testValue1;
    expect(result.current[0]).toBe(testValue1);

    //update local storage entry
    act(() => {
      result.current[1](testValue2);
    });
    expect(result.current[0]).toBe(testValue2);
  });
});
