import React from "react";
import { Text } from "react-native";
import { render, cleanup } from "@testing-library/react-native";
import List from "../../../src/components/List";

describe("List Component", () => {
  let component;
  const mockOnRemove = jest.fn();
  const mockList = [
    { id: "a", name: "Batman" },
    { id: "b", name: "Superman" },
    { id: "c", name: "Ironman" },
    { id: "d", name: "Hulk" },
    { id: "e", name: "BlackWidow" },
    { id: "f", name: "Thor" },
    { id: "g", name: "Captain America" },
    { id: "h", name: "Hawkeye" },
    { id: "i", name: "Spiderman" },
    { id: "j", name: "Antman" },
  ];

  beforeEach(() => {
    component = render(<List list={mockList} onRemove={mockOnRemove} />);
  });

  afterEach(cleanup);

  it("renders list correctly", () => {
    const { findByTestId } = component;
    expect(findByTestId("flat-list")).toBeTruthy();
  });
});
