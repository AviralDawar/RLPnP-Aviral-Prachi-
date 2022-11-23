import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import CustomTooltip from "./Tooltip";
import "./Info.css";

var options = [];

function mapCols(props) {
  var arr = [];
  for (let index = 0; index < props.length; index++) {
    const element = props[index];
    arr.push({ value: element, label: element });
  }
  options = arr;
  // console.log(options);
}

const text1 = `
lorem ipsum
`;

const text2 = `
lorem ipsum
`;

export default function MaxMin(props) {
  let value = {
    max: "",
    min: "",
  };
  const handleMax = (selectedOption) => {
    value.max = selectedOption;
    props.childToParent(value);
  };
  const handleMin = (selectedOption) => {
    value.min = selectedOption;
    props.childToParent(value);
  };

  return (
    <>
      <div>
        {mapCols(props.options)}
        <Form.Group className="mb-3">
          <div className="parent">
            <h5>Maximise</h5>
            <CustomTooltip longText={text1} />
          </div>
          
          <Select
            closeMenuOnSelect={true}
            defaultValue={[]}
            name="max"
            options={options}
            onChange={handleMax}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <div className="parent">
            <h5>Minimise</h5>
            <CustomTooltip longText={text2} />
            
          </div>
          <Select
            closeMenuOnSelect={true}
            defaultValue={[]}
            onChange={handleMin}
            name="min"
            options={options}
          />
        </Form.Group>
      </div>
    </>
  );
}
