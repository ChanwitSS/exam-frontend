import React from "react";

export const Chat = ({
  name,
  roomName,
  messages,
  newMessage,
  onChangeNewMessage,
  handleKeyDown,
}) => {
  return (
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
  );
};
