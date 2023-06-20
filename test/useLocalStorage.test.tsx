import { render, screen, fireEvent } from "@testing-library/react";
import useLocalStorage from "../src/useLocalStorage";
import React from "react";

describe("useLocalStorage", () => {
  beforeEach(() => {
    // Mock localStorage methods
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };

    // Override the global localStorage object with the mock implementation
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
    localStorage.clear();
  });

  it("should initialize with the initial value", () => {
    function TestComponent() {
      const [value] = useLocalStorage("test-key", "initial");
      return <div>{value}</div>;
    }

    render(<TestComponent />);
    expect(screen.getByText("initial")).toBeInTheDocument();
  });

  it("should update the value and persist it to local storage", () => {
    function TestComponent() {
      const [value, setValue] = useLocalStorage("test-key", "initial");

      const handleButtonClick = () => {
        setValue("updated");
      };

      return (
        <div>
          <div>{value}</div>
          <button onClick={handleButtonClick}>Update</button>
        </div>
      );
    }

    render(<TestComponent />);
    expect(screen.getByText("initial")).toBeInTheDocument();

    const updateButton = screen.getByText("Update");
    fireEvent.click(updateButton);

    expect(screen.getByText("updated")).toBeInTheDocument();
    expect(localStorage.getItem("test-key")).toBe(JSON.stringify("updated"));
  });
});
