import { act, screen } from "@testing-library/react";
import { CharacterWithPlace, Place } from "../types/gameTypes";
import { render } from "../utils/testUtils";
import GameCharacterCard from "./GameCharacterCard";

const character: CharacterWithPlace = {
  id: "1",
  name: "Bob",
  imageUrl: {
    url: "http://www.test.co",
    extension: "jpg",
  },
  place: Place.Home,
};

test("Generates gameCharacterCard", async () => {
  act(() => {
    const component = <GameCharacterCard character={character} />;

    render(component, undefined);
  });

  const toFind = screen.getByText("Bob");
  expect(toFind).toBeInTheDocument();
});
