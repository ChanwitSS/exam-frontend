import React from "react";

export const RoomOptions = ({ name, setStep }) => {
  return (
    <>
      <label className="title" style={{ margin: 80 }}>
        คุณ {name}
      </label>
      <button
        className="button"
        style={{ marginTop: 24, width: 200, marginBottom: 12 }}
        onClick={() => {
          setStep(3);
        }}
      >
        <label className="textButton">สร้างห้องใหม่</label>
      </button>
      <button
        style={{
          height: 48,
          width: 200,
          backgroundColor: "#ffffff",
          borderRadius: 10,
          border: "none",
        }}
        onClick={() => {
          setStep(4);
        }}
      >
        <label className="textButton" style={{ color: "#c41417" }}>
          เข้าร่วมแชท
        </label>
      </button>
    </>
  );
};
