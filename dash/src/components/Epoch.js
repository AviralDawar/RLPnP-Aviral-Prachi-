import React, { useState } from "react";
import CustomizedSlider from "./Slider";
import CustomTooltip from "./Tooltip";
import "./Info.css";

const text = `
Breakdown of total iterations into smaller epochs
`;

export default function Epoch(props) {
  const [options, setOptions] = useState([]);

  const childToParent = (childData) => {
    setOptions(childData);
    props.childToParent(childData);
    console.log(childData);
  };

  return (
    <>
      <div className="parent">
        <h5 style={{ color: "#556A7F", textAlign: "left" }}>Epochs</h5>
        <CustomTooltip longText={text} />
      </div>

      <CustomizedSlider childToParent={childToParent} />
    </>
  );
}
