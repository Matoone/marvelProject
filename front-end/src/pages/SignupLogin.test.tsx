import { MockedProvider } from "@apollo/client/testing";
import { act, screen } from "@testing-library/react";
import { login, signup } from "../queries";
import { render } from "../utils/testUtils";
import SignupLogin from "./SignupLogin";

const signupMockWithData = {
  request: {
    query: signup,
    variables: { email: "blabla@machin.co", password: "1234567" },
  },
  result: {
    data: {
      signup: {
        email: "signup",
        token: "1234567890",
      },
    },
  },
};

const loginMockWithData = {
  request: {
    query: login,
    variables: { email: "blabla@machin.co", password: "1234567" },
  },
  result: {
    data: {
      login: {
        email: "login",
        token: "1234567890",
      },
    },
  },
};

test("Signup", () => {
  act(() => {
    const component = (
      <MockedProvider mocks={[signupMockWithData]} addTypename={false}>
        <SignupLogin mode="signup" />
      </MockedProvider>
    );

    render(component, undefined);
  });

  const toFind = screen.getByText("SIGNUP");
  expect(toFind).toBeInTheDocument();
});

test("Login", () => {
  act(() => {
    const component = (
      <MockedProvider mocks={[loginMockWithData]} addTypename={false}>
        <SignupLogin mode="login" />
      </MockedProvider>
    );

    render(component, undefined);
  });

  const toFind = screen.getByText("LOGIN");
  expect(toFind).toBeInTheDocument();
});
