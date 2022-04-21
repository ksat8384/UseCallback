import React from "react";
import App from "../App";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react-native";

describe("App Component", () => {
  let component;
  beforeEach(() => {
    component = render(<App />);
  });
  afterEach(cleanup);

  it("renders correctly", () => {
    const { toJSON } = component;
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders input field, button and list correctly", () => {
    const { findByTestId, findByText } = component;

    const input = findByTestId("input");
    const addUserButton = findByText("Add User");
    const list = findByTestId("flat-list");

    expect(input).toBeTruthy();
    expect(addUserButton).toBeTruthy();
    expect(list).toBeTruthy();
  });

  it("Adds the user to the list", async () => {
    const { getByTestId } = component;

    const mockInputText = "Hulk";

    const input = getByTestId("input");
    const addUserButton = getByTestId("add-user");

    fireEvent.changeText(input, mockInputText);
    fireEvent.press(addUserButton);

    await waitFor(() => {
      const list = within(getByTestId("flat-list"));
      expect(list.getByText("Hulk")).toBeTruthy();
    });
  });
});
