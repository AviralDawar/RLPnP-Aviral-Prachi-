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
Entities among which resources need to be allocated
`;

const text2 = `
Column in the dataset that needs to be minimised by allocating a resource
`;

export default function ResourceAllocate(props) {
  let value = {
    temporalAttribute: "",
  };
  const handleStateChange = (selectedOption) => {
    value.temporalAttribute = selectedOption;
    props.childToParent(value);
  };


  return (
    <>
      <div className="tempdiv">
        {mapCols(props.options)}
        <Form.Group className="mb-3">
          <div className="parent">
            <h5>What is the temporal attribute?</h5>
            <CustomTooltip longText={text1} />
          </div>

          <Select
            closeMenuOnSelect={true}
            defaultValue={[]}
            name="temporal_attribute"
            options={options}
            onChange={handleStateChange} //CHANGE THIS
          />
        </Form.Group>
      </div>
    </>
  );
}
