import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import React, { useState } from "react";
import { Chat } from "./components/Chat";
import { FillName } from "./components/FillName";
import { Room } from "./components/Room";
import { RoomOptions } from "./components/RoomOptions";
import { GET_MESSAGE, NEW_MESSAGE, SEND_MESSAGE } from "./graphql/message";
import { CREATE_ROOM, JOIN_ROOM } from "./graphql/room";

const App = () => {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [step, setStep] = useState(1);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [getMessage, getMessageQuery] = useLazyQuery(GET_MESSAGE, {
    document: NEW_MESSAGE,
    variables: { roomName },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });
  const [sendMessage, sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      roomName,
      message: newMessage,
      senderName: name,
    },
    fetchPolicy: "network-only",
  });
  const [createRoom, createRoomMutation] = useMutation(CREATE_ROOM, {
    variables: {
      roomName,
    },
  });
  const [joinRoom, joinRoomMutation] = useMutation(JOIN_ROOM, {
    variables: {
      roomName,
    },
  });
  const newMessageSubscription = useSubscription(NEW_MESSAGE, {
    variables: { roomName },
    onData: (res) => {
      setMessages(messages.concat([res.data.data.newMessage]));
      var elem = document.getElementById("chat");
      elem.scrollTop = elem.scrollHeight;
    },
  });

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeRoomName = (event) => {
    setRoomName(event.target.value);
  };

  const onCreateRoom = () => {
    createRoom().then((res) => {
      if (res.data.createRoom.successful) {
        setStep(5);
      } else {
        alert("ห้องชื่อนี้ถูกสร้างแล้ว กรุณากดปุ่มเข้าร่วม!!")
      }
    });
  };

  const onJoinRoom = () => {
    createRoom().then((res) => {
      if (res.data.createRoom.successful) {
        setStep(5);
        alert(`สร้างห้อง!`)
      } else {
        getMessage()
          .then((res) => setMessages(res.data.messages))
          .then(() => setStep(5))
          .then(() => {
            var elem = document.getElementById("chat");
            elem.scrollTop = elem.scrollHeight;
          });
      }
    });
  };

  const onChangeNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && newMessage.length > 0) {
      sendMessage().then(() => {
        getMessage()
          .then((res) => setMessages(res.data.messages))
          .then(() => {
            setNewMessage("");
            var elem = document.getElementById("chat");
            elem.scrollTop = elem.scrollHeight;
          });
      });
    }
  };

  return (
    <div className="container-white">
      {step === 1 && (
        <FillName name={name} setStep={setStep} onChangeName={onChangeName} />
      )}
      {step === 2 && <RoomOptions name={name} setStep={setStep} />}
      {(step === 3 || step === 4) && (
        <Room
          step={step}
          setStep={setStep}
          roomName={roomName}
          onChangeRoomName={onChangeRoomName}
          onCreateRoom={onCreateRoom}
          onJoinRoom={onJoinRoom}
        />
      )}
      {step === 5 && (
        <Chat
          name={name}
          roomName={roomName}
          messages={messages}
          newMessage={newMessage}
          onChangeNewMessage={onChangeNewMessage}
          handleKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

export default App;
