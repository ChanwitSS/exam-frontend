import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_MESSAGE, NEW_MESSAGE, SEND_MESSAGE } from "./graphql/message";
import { CREATE_ROOM, JOIN_ROOM } from "./graphql/room";

const App = () => {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [step, setStep] = useState(1);
  const [messages, setMessages] = useState();
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
        console.log("dup");
      }
    });
  };

  const onJoinRoom = () => {
    createRoom().then((res) => {
      if (res.data.createRoom.successful) {
        setStep(5);
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
        <>
          <label className="title" style={{ margin: 16 }}>
            ชื่อของคุณ
          </label>
          <input
            type="text"
            name="name"
            className="input"
            onChange={onChangeName}
          />
          {name.length > 0 && (
            <button
              className="button"
              style={{ margin: 24 }}
              onClick={() => {
                setStep(2);
              }}
            >
              <label className="textButton">ยืนยัน</label>
            </button>
          )}
        </>
      )}
      {step === 2 && (
        <>
          <label className="title" style={{ margin: 80 }}>
            คุณ {name}
          </label>
          <button
            className="button"
            style={{ marginTop: 24 }}
            onClick={() => {
              setStep(3);
            }}
          >
            <label className="textButton">สร้างห้องใหม่</label>
          </button>
          <button
            className="button"
            style={{
              marginBottom: 24,
              backgroundColor: "#ffffff",
              backgroundImage: null,
            }}
            onClick={() => {
              setStep(4);
            }}
          >
            <label className="textButton">เข้าร่วมแชท</label>
          </button>
        </>
      )}
      {(step === 3 || step === 4) && (
        <>
          <label className="title" style={{ margin: 16 }}>
            {step === 3 ? "สร้างห้องใหม่" : "เข้าร่วมแชท"}
          </label>
          <input
            type="text"
            name="roomName"
            className="input"
            onChange={onChangeRoomName}
          />
          <div style={{ margin: 24 }}>
            <button
              // className="button"
              style={{
                height: 48,
                width: 120,
                backgroundColor: "#ffffff",
                borderRadius: 10,
                border: "none",
              }}
              onClick={() => {
                setStep(2);
              }}
            >
              <label className="textButton" style={{ color: "#383838" }}>
                กลับ
              </label>
            </button>
            <button
              className="button"
              style={{ width: 120 }}
              onClick={() =>
                step === 3 ? onCreateRoom(roomName) : onJoinRoom()
              }
            >
              <label className="textButton">
                {step === 3 ? "ยืนยัน" : "เข้าร่วม"}
              </label>
            </button>
          </div>
        </>
      )}
      {step === 5 && (
        <>
          <label className="title" style={{ margin: 16 }}>
            ห้อง {roomName}
          </label>
          <div
            id="chat"
            style={{
              backgroundColor: "#f4f4f4",
              width: "95%",
              height: "73%",
              borderRadius: 10,
              overflowY: "scroll",
              flexDirection: "row",
              paddingTop: 12,
              paddingBottom: 12,
            }}
          >
            {messages?.map((message) => {
              return (
                <div
                  key={message?.id}
                  style={{
                    alignSelf: "center",
                    // width: "",
                    // height: "83%",
                    borderRadius: 10,
                    marginBottom: 8,
                    flexDirection: "row",
                    display: "flex",
                    ...(message.from.name == name
                      ? { justifyContent: "flex-end", marginRight: 12 }
                      : {
                          justifyContent: "flex-start",
                          marginLeft: 12,
                        }),
                  }}
                >
                  <div style={{ justifyContent: "flex-end" }}>
                    {message.from.name !== name && (
                      <label style={{ fontSize: 12, color: "#383838" }}>
                        คุณ {message?.from?.name}
                      </label>
                    )}

                    <div
                      style={{
                        backgroundColor: "#eee",
                        width: "fit-content",
                        padding: 4,
                        marginLeft: 12,
                      }}
                    >
                      <label
                        style={{ overflowX: "hidden", wordWrap: "break-word" }}
                      >
                        {message?.body}
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              backgroundColor: "#f4f4f4",
              width: "95%",
              // height: "3%",
              borderRadius: 10,
            }}
          >
            <input
              type="text"
              name="newMessage"
              className="input"
              style={{
                width: "100%",
                height: 40,
                fontSize: 20,
                textAlign: "start",
                padding: 4,
              }}
              value={newMessage}
              onKeyDown={handleKeyDown}
              onChange={onChangeNewMessage}
            />
            <label style={{ float: "right", fontSize: 12, color: "#383838" }}>
              Enter เพื่อส่ง
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
