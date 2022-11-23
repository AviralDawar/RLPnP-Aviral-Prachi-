import { useState } from "react";
import Papa from "papaparse";
import Table from "react-bootstrap/Table";
import React from "react";
import axios from "axios";
import "./Info.css";



export default function InputText(props){
    let value = {
        resource : "",
        quantity: "",
      };
      
      const handleResourceChange = (selectedOption) => {
        console.log(selectedOption.target.value)
        value.resource = selectedOption.target.value;
        props.childToParent(value);
      };
      const handleQuantityChange = (selectedOption) => {
        value.quantity = selectedOption.target.value;
        props.childToParent(value);
      };
    return(
        <>
        <div className="input">
            <div>
            <h5 className = "input_heading">What resource do you want to allocate?</h5>
            <input type="text" onChange = {handleResourceChange} name = "resource"></input>
            </div>
            <div>
            <h5 className = "input_heading">How many units of the resource do you want to allocate?</h5>
            <input type="text" onChange = {handleQuantityChange} name = "quantity"></input>
            </div>
        </div>
    </>
    )
}