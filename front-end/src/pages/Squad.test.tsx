import { act, screen } from "@testing-library/react";
import { render } from "../utils/testUtils";
import Squad from "./Squad";

test("Squad working", async () => {
  act(() => {
    const component = <Squad></Squad>;

    render(component, undefined);
  });

  const toFind = screen.getAllByText("Joe");
  expect(toFind[0]).toBeInTheDocument();
});
