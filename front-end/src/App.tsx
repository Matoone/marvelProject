import React from "react";
import { Grid, Row } from "react-flexbox-grid";
import "ui-neumorphism/dist/index.css";
import "./App.css";
import TopBar from "./components/TopBar";
import CharacterCard from "./components/CharacterCard";

const chars = [
  { name: "GI-Joe", image: "" },
  { name: "Lala", image: "" },

  { name: "Trululu", image: "" },
  { name: "Trululu", image: "" },
  { name: "Trululu", image: "" },
  { name: "Trululu", image: "" },
  { name: "Trululu", image: "" },
  { name: "Trululu", image: "" },
];
function App() {
  return (
    <Grid fluid>
      <TopBar />
      <div className="Container">
        {chars.map((character) => (
          <CharacterCard name={character.name} />
        ))}
      </div>

      <footer style={{ position: "fixed", bottom: 0, right: 0, padding: 20 }}>
        Repo git de l'auteur:
        <a href="https://github.com/Matoone" target="_blank" rel="noreferrer">
          https://github.com/Matoone
        </a>
      </footer>
    </Grid>
  );
}

export default App;
