import React, { useState } from "react";
import CustomizedSlider from "./Slider";
import CustomTooltip from "./Tooltip";
import "./Info.css";

const text = `
Number of iterations that the model needs to run
`;

export default function Episodes(props) {
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
          Number of Iterations
        </h5>
        <CustomTooltip longText={text} />
      </div>
      <CustomizedSlider childToParent={childToParent} />
    </>
  );
}
