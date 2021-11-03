import { useState, useEffect } from "react";
import { Grid, Row } from "react-flexbox-grid";
import "ui-neumorphism/dist/index.css";
import "./App.css";
import TopBar from "./components/TopBar";
import CharacterCard from "./components/CharacterCard";
import CharacterDetails from "./components/CharacterDetails";
import { getCharacters } from "./queries";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { buildImageUrl } from "./utils";

// const chars = [
//   { name: "GI-Joe", image: "" },
//   { name: "Lala", image: "" },

//   { name: "Trululu", image: "" },
//   { name: "Trululu", image: "" },
//   { name: "Trululu", image: "" },
//   { name: "Trululu", image: "" },
//   { name: "Trululu", image: "" },
//   { name: "Trululu", image: "" },
// ];
enum ImageResolutions {
  portraitSmall = "portrait_small",
  portraitMedium = "portrait_medium",
  portraitXLarge = "portrait_xlarge",
  portraitFantastic = "portrait_fantastic",
  portraitUncanny = "portrait_uncanny",
  portraitIncredible = "portrait_incredible",
}

function App() {
  const { loading, error, data } = useQuery(getCharacters);
  const history = useHistory();

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <Router>
      <Grid fluid>
        <TopBar />
        <Switch>
          <Route exact path="/">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{`Error! ${error.message}`}</div>
            ) : (
              <div className="Container">
                {
                  // console.log('data', data)
                  data.characters.map((character: any) => (
                    <CharacterCard
                      character={{
                        id: character.id,
                        name: character.name,
                        imageUrl: character.image,
                      }}
                    />
                  ))
                }
              </div>
            )}
          </Route>
          <Route path="/characters/:id">
            <CharacterDetails></CharacterDetails>
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
