import { act, screen } from "@testing-library/react";
import { render } from "../utils/testUtils";
import TopBar from "./TopBar";

test("Generates topBar", async () => {
  act(() => {
    const component = <TopBar />;

    render(component, undefined);
  });

  const toFind = screen.getByText("MarvelProject");
  expect(toFind).toBeInTheDocument();
});
