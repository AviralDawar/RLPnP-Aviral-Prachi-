import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CustomTooltip from "./Tooltip";
import { useState } from "react";
import "./Info.css";

export default function Multiselect(props) {
  var options = [];
  const [state, setState] = useState({});
  const handleChange = (selectedOption) => {
    setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    props.childToParent(selectedOption);
  };

  const animatedComponents = makeAnimated();
  function mapCols(props) {
    var arr = [];
    for (let index = 0; index < props.length; index++) {
      const element = props[index];
      arr.push({ value: element, label: element });
    }
    options = arr;
    // console.log(options);
  }
  const text = `
Columns in the dataset that impact the allocation of resources
`;
  return (
    <>
      <div className="parent">
        <h5 style={{ color: "#556A7F", textAlign: "left" }}>Features</h5>
        <CustomTooltip longText={text} />
      </div>
      {mapCols(props.options)}
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[]}
        value={state.selectedOption}
        isMulti
        name="colors"
        onChange={handleChange}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </>
  );
}
