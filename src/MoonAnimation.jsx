import React from "react";
import "./MoonAnimation.css";

const MoonAnimation = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className="moon-animation">
      <div className="moon"></div>
      <div className="crater crater1"></div>
      <div className="crater crater2"></div>
    </div>
  );
};

export default MoonAnimation;
