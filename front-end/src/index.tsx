import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
require("dotenv").config();

const ENVIRONMENT = process.env.NODE_ENV || "production";
const backendUri =
  ENVIRONMENT === "production"
    ? "https://ec2-13-38-1-89.eu-west-3.compute.amazonaws.com:443/graphql"
    : "http://localhost:4000/graphql";

const client = new ApolloClient({
  uri: backendUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
