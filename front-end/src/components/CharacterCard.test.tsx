import { act, screen } from "@testing-library/react";
import { render } from "../utils/testUtils";
import CharacterCard from "./CharacterCard";
import { Character } from "./CharacterCard";

const character = {
  id: "1",
  name: "Bob",
  imageUrl: {
    url: "http://www.test.co",
    extension: "jpg",
  },
} as Character;

test("Generates character", async () => {
  act(() => {
    const component = <CharacterCard character={character} />;

    render(component, undefined);
  });

  const toFind = screen.getByText("Bob");
  expect(toFind).toBeInTheDocument();
});
