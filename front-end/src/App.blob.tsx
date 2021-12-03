import { act, screen } from "@testing-library/react";
import App from "./App";
import { render } from "./utils/testUtils";

test("renders app", () => {
  act(() => {
    const component = <App />;

    render(component, undefined);
  });

  const toFind = screen.getAllByText("Marvel");
  expect(toFind[0]).toBeInTheDocument();
}, 200);

// test("UserContext shows value from provider", () => {
//   const component = (
//     <MockedProvider mocks={mocks} addTypename={false}></MockedProvider>
//   );
//   const tree = component.toJSON();
//   render(
//     <UserContext.Provider value={{ token: null, setToken: () => {} }}>
//       <Home />
//     </UserContext.Provider>
//   );
//   const toFind = screen.getByText(/'login/);
//   expect(toFind).toBeInTheDocument();
// });
