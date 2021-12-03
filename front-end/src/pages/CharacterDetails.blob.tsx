import { MockedProvider } from "@apollo/client/testing";
import { act, screen } from "@testing-library/react";
import { getCharacterDetails } from "../queries";
import { render } from "../utils/testUtils";
import CharacterDetails from "./CharacterDetails";

// TODO: fix tests

// const mockWithData = {
//   request: {
//     query: getCharacterDetails,
//     variables: { id: "1" },
//   },
//   result: {
//     data: {
//       character: {
//         id: "1",
//         name: "Bob",
//         image: {
//           url: "http://www.test.co",
//           extension: "jpg",
//         },
//         description: "Une description",
//         comics: {
//           appearances: 4,
//           items: [
//             {
//               name: "Le 1",
//             },
//             {
//               name: "Le 2",
//             },
//             {
//               name: "Le 3",
//             },
//           ],
//         },
//       },
//     },
//   },
// };

// const mockWithError = {
//   request: {
//     query: getCharacterDetails,
//     variables: { id: "1" },
//   },

//   error: new Error("An error occurred"),
// };

// let mock: typeof jest;
// beforeEach(() => {
//   mock = jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useParams: () => ({
//       id: "1",
//     }),
//   }));
// });

// afterEach(async () => {
//   await mock.resetAllMocks();
// });

// test("Character details loading", async () => {
//   act(() => {
//     const component = (
//       <MockedProvider mocks={[mockWithData]} addTypename={false}>
//         <CharacterDetails />
//       </MockedProvider>
//     );

//     render(component, undefined);
//   });

//   const toFind = screen.getByTestId("loading");
//   expect(toFind).toBeInTheDocument();
// });

// test("Character details data", async () => {
//   act(() => {
//     const component = (
//       <MockedProvider mocks={[mockWithData]} addTypename={false}>
//         <CharacterDetails />
//       </MockedProvider>
//     );

//     render(component, undefined);
//   });
//   await new Promise((resolve) => setTimeout(resolve, 0));

//   const toFind = screen.getByTestId("data");
//   expect(toFind).toBeInTheDocument();
// });

// test("Character details error", async () => {
//   act(() => {
//     const component = (
//       <MockedProvider mocks={[mockWithError]} addTypename={false}>
//         <CharacterDetails />
//       </MockedProvider>
//     );

//     render(component, undefined);
//   });
//   await new Promise((resolve) => setTimeout(resolve, 0));
//   const toFind = screen.getByText("Error! An error occurred");
//   expect(toFind).toBeInTheDocument();
// });
