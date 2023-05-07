import React, { useState } from "react";
import "./current-weather.css";

const Clock = () => {
  let time = new Date().toLocaleTimeString();
  let date = new Date().toLocaleDateString();

  const [ctime, setCtime] = useState(time);

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCtime(time);
  };

  setInterval(updateTime, 1000);
  return (
    <div className="weather" id="dateTime">
      <div className="time">{ctime}</div>
      <div className="date">{date}</div>
    </div>
  );
};

export default Clock;
