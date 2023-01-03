import { useState } from "react";
import Papa from "papaparse";
import Table from "react-bootstrap/Table";
import React from "react";
import axios from "axios";
import "./Info.css";



export default function TemporalData(props){
    let value = {
        isTemporal : "",
      };
    const handleChange = (selectedOption) => {
        console.log(selectedOption.target.value)
        value.isTemporal = selectedOption.target.value;
        props.childToParent(value);
      };

    return(
        <>
        <div className="parent">
            <div>
            <h5 className = "input_heading">Is the data Temporal?</h5>
            <div onChange = {handleChange}>
                <input type = "radio" value = "True" name = "isTemporal" align = "left"/>True
                <input type = "radio" value = "False" name = "isTemporal" align = "right"/>False
            </div>
            </div>
        </div>
    </>
    )
}