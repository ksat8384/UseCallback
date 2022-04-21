import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import ListItem from "../../../src/components/ListItem";

describe("ListItem Component", () => {
  let component;
  const mockOnRemove = jest.fn();
  const mockItem = { id: "a", name: "Batman" };

  beforeEach(() => {
    component = render(<ListItem item={mockItem} onRemove={mockOnRemove} />);
  });

  afterEach(cleanup);

  it("renders correctly", () => {
    const { getByText } = component;
    expect(getByText("Batman")).toBeTruthy();
    expect(getByText("Remove")).toBeTruthy();
  });

  it("On remove callback works correctly", async () => {
    const { getByText } = component;
    const button = getByText("Remove");

    fireEvent.press(button);

    await waitFor(() => {
      expect(mockOnRemove).toBeCalledWith("a");
    });
  });
});
