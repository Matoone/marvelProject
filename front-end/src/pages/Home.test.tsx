import { MockedProvider } from "@apollo/client/testing";
import { act, render, screen } from "@testing-library/react";
import { getCharacters } from "../queries";
import Home from "./Home";

const mockWithData = {
  request: {
    query: getCharacters,
  },
  result: {
    data: {
      characters: [
        {
          id: "1",
          name: "Bob",
          image: {
            url: "http://www.test.co",
            extension: "jpg",
          },
        },
      ],
    },
  },
};

const mockWithError = {
  request: {
    query: getCharacters,
  },

  error: new Error("An error occurred"),
};

test("Home page loading", () => {
  act(() => {
    const component = (
      <MockedProvider mocks={[mockWithData]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    render(component);
  });

  const toFind = screen.getByTestId("loading");
  expect(toFind).toBeInTheDocument();
});

test("Home page data", async () => {
  act(() => {
    const component = (
      <MockedProvider mocks={[mockWithData]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    render(component);
  });
  await new Promise((resolve) => setTimeout(resolve, 0));
  const toFind = screen.getByText("Bob");
  expect(toFind).toBeInTheDocument();
});

test("Home page error", async () => {
  act(() => {
    const component = (
      <MockedProvider mocks={[mockWithError]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    render(component);
  });
  await new Promise((resolve) => setTimeout(resolve, 0));
  const toFind = screen.getByText("Error! An error occurred");
  expect(toFind).toBeInTheDocument();
});
