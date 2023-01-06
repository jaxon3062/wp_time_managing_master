import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ManageProvider } from "./containers/hooks/useManage.js";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "https://wptimemanagingmaster-production.up.railway.app/graphql"
    : "http://localhost:4000/graphql";

const WS_URL =
  process.env.NODE_ENV === "production"
    ? window.location.origin.replace(/^http/, "ws")
    : "ws://localhost:4000/graphql";

const httpLink = new HttpLink({
  uri: API_ROOT,
});
const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_URL,
    lazy: true,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ManageProvider>
        <App />
      </ManageProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
