import { useQuery } from "@apollo/client";
import React from "react";
import { GET_MESSAGE } from "./graphql/message";

const App = () => {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_MESSAGE,
    {
      variables: { roomName: "room1" },
      notifyOnNetworkStatusChange: true,
    }
  );
  console.log(data)
  return <div className="app">Good Luck</div>;
};

export default App;
