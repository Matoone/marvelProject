import { Grid } from "react-flexbox-grid";
import "ui-neumorphism/dist/index.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TopBar from "./components/TopBar";

import CharacterDetails from "./pages/CharacterDetails";
import Squad from "./pages/Squad";
import Home from "./pages/Home";
import SignupLogin from "./pages/SignupLogin";
import { UserContext } from "./userContext";
import { useLocalStorage } from "./hooks";
import { useState } from "react";

function App() {
  // Similar to useState but first arg is key to the value in local storage.
  const [localToken, setLocalToken] = useLocalStorage("token", "");
  const [marvelMessage, setMarvelMessage] = useState<string | null>(null);
  const contextValue = {
    token: localToken,
    setToken: setLocalToken,
    marvelMessage: marvelMessage ?? undefined,
    setMarvelMessage: setMarvelMessage,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <Router>
        <Grid fluid>
          <TopBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <SignupLogin mode="login" />
            </Route>
            <Route path="/signup">
              <SignupLogin mode="signup" />
            </Route>
            <Route path="/characters/:id">
              <CharacterDetails />
            </Route>
            <Route path="/squad">
              <Squad />
            </Route>
          </Switch>

          <footer
            style={{ position: "fixed", bottom: 0, right: 0, padding: 20 }}
          >
            Repo git de l'auteur:
            <a
              href="https://github.com/Matoone"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/Matoone
            </a>
          </footer>
        </Grid>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
