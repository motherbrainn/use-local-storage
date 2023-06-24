"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * useLocalStorage
 *
 * A lightweight hook that makes storing and modifying data in local storage as easy as setting state.
 *
 * @param key key for local storage instance
 * @param initialValue initial value for local storage instance
 * @returns current value, setter function, and exception object
 */
const useLocalStorage = (key, initialValue) => {
    let exception = null;
    const [value, setValue] = (0, react_1.useState)(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue === null) {
            return initialValue;
        }
        else {
            exception = {
                error: `Cannot recreate existing key: ${initialValue}`,
            };
            return JSON.parse(storedValue);
        }
    });
    (0, react_1.useEffect)(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    const updateValue = (newValue) => {
        setValue(newValue);
    };
    return [value, updateValue, exception];
};
exports.default = useLocalStorage;
