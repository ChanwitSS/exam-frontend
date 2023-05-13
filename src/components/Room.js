import React from "react";

export const Room = ({
  step,
  setStep,
  roomName,
  onChangeRoomName,
  onCreateRoom,
  onJoinRoom,
}) => {
  return (
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
          onClick={() => (step === 3 ? onCreateRoom(roomName) : onJoinRoom())}
        >
          <label className="textButton">
            {step === 3 ? "ยืนยัน" : "เข้าร่วม"}
          </label>
        </button>
      </div>
    </>
  );
};
