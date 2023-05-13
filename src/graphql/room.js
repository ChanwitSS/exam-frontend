import { gql } from "@apollo/client";

export const CREATE_ROOM = gql`
  mutation CreateRoom($roomName: String!) {
    createRoom(roomName: $roomName) {
      successful
    }
  }
`;

export const JOIN_ROOM = gql`
  mutation JoinRoom($roomName: String!) {
    joinRoom(roomName: $roomName) {
      successful
    }
  }
`;
