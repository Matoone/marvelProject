import { act, screen } from "@testing-library/react";
import { render } from "../utils/testUtils";
import CharacterCardsList from "./CharacterCardsList";

const characters = [
  {
    __typename: "Character" as "Character",
    id: "1",
    name: "Bob",
    image: {
      __typename: "ImageResult" as "ImageResult",
      url: "http://www.test.co",
      extension: "jpg",
    },
  },
  {
    __typename: "Character" as "Character",
    id: "2",
    name: "John",
    image: {
      __typename: "ImageResult" as "ImageResult",
      url: "http://www.test.co",
      extension: "jpg",
    },
  },
];

test("Generates character", async () => {
  act(() => {
    const component = (
      <CharacterCardsList characters={characters} onLoadMore={jest.fn} />
    );

    render(component, undefined);
  });

  const toFind1 = screen.getByText("Bob");
  const toFind2 = screen.getByText("John");
  expect(toFind1).toBeInTheDocument();
  expect(toFind2).toBeInTheDocument();
});
