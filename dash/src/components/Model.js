import React from 'react'
import Form from "react-bootstrap/Form";
import Select from "react-select";
import CustomTooltip from "./Tooltip";

const options = [
    { value: 'DQN', label: 'DQN' },
    { value: 'ACKTR', label: 'ACKTR' }
  ]

const text = `
Lorem Ipsum
`;

export default function Model(props) {

    const handleStateChange = (selectedOption) => {
        props.childToParent(selectedOption);
        console.log("Model Selected: ",selectedOption);
      };

  return (
      <>
         <Form.Group className="mb-3">
          <div className="parent">
            <h5>Model</h5>
            <CustomTooltip longText={text} />
          </div>
          
          <Select
            closeMenuOnSelect={true}
            defaultValue={[]}
            options={options}
            onChange={handleStateChange}
          />
        </Form.Group>
    </>
    
  )
}
