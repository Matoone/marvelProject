import React from "react";

export interface UserContextInterface {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = React.createContext({
  token: null,
  setToken: ((token: string | null) => {}) as React.Dispatch<
    React.SetStateAction<string | null>
  >,
} as UserContextInterface);
