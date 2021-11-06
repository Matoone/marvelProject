import { Grid } from "react-flexbox-grid";
import "ui-neumorphism/dist/index.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import TopBar from "./components/TopBar";

import CharacterDetails from "./pages/CharacterDetails";
import Squad from "./pages/Squad";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Grid fluid>
        <TopBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/characters/:id">
            <CharacterDetails />
          </Route>
          <Route path="/squad">
            <DndProvider backend={HTML5Backend}>
              <Squad />
            </DndProvider>
          </Route>
        </Switch>

        <footer style={{ position: "fixed", bottom: 0, right: 0, padding: 20 }}>
          Repo git de l'auteur:
          <a href="https://github.com/Matoone" target="_blank" rel="noreferrer">
            https://github.com/Matoone
          </a>
        </footer>
      </Grid>
    </Router>
  );
}

export default App;
