import { gql } from "@apollo/client";

export const GET_MESSAGE = gql`
  query Messages($roomName: String!) {
    messages(roomName: $roomName) {
      id
      body
      roomName
      createAt
      from {
        name
      }
      # image
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage(
    $roomName: String!
    $message: String!
    $senderName: String!
  ) {
    sendMessage(
      roomName: $roomName
      message: $message
      senderName: $senderName
    ) {
      successful
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription NewMessage($roomName: String!) {
    newMessage(roomName: $roomName) {
      id
      body
      roomName
      createAt
      from {
        name
      }
    }
  }
`;
