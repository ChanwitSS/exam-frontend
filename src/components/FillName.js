import React from "react";

export const FillName = ({ name, setStep, onChangeName }) => {
  
  return (
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
  );
};

export default FillName;
