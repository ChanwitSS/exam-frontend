import React from "react";
import ReactDOM from "react-dom";
import "./main.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { createClient } from "graphql-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";


const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: "ws://localhost:4000/graphql",
//   })
// );

const wsLink = new WebSocketLink(
  new SubscriptionClient("ws://localhost:4000/graphql", {
    // connectionParams: {
    //   authToken: user.authToken
    // }
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
  // uri: "http://localhost:4000/",
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
