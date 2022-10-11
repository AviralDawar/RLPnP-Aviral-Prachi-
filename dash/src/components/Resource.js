import React, { useState } from "react";
import CustomizedSlider from "./Slider";
import CustomTooltip from "./Tooltip";
import "./Info.css";

const text = `
Total number of resources available each day and that need to be allocated
`;

export default function Resources(props) {
  const [options, setOptions] = useState([]);

  const childToParent = (childData) => {
    setOptions(childData);
    props.childToParent(childData);
    console.log(childData);
  };

  return (
    <>
      <div className="parent">
        <h5 style={{ color: "#556A7F", textAlign: "left" }}>
          Number of Resources
        </h5>
        <CustomTooltip longText={text} />
      </div>
      <CustomizedSlider childToParent={childToParent} />
    </>
  );
}
