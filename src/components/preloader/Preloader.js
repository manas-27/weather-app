import React, { useEffect } from "react";
import "./preloader.css";
import { preLoaderAnim } from "../animations";

function Preloader() {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div>
      <div className="preloader">
        <div className="text-container">
          <video loop autoPlay>
            <source src={require("../../preloader.mp4")} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
