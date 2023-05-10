import { gql } from "@apollo/client";

export const GET_MESSAGE = gql`
  query Messages($roomName: String!) {
    messages(roomName: $roomName) {
      id
      body
      image
    }
  }
`;

export const SEND_MESSAGE = gql`
  query SendMessage($roomName: String!, $message: String!) {
    sendMessage(roomName: $roomName, message: $message) {
      id
      body
      image
    }
  }
`;
