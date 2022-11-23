import React,{ useState } from "react";
import Papa from "papaparse";
import Table from "react-bootstrap/Table"; 

import Row from 'react-bootstrap/Row'
import axios from "axios";
// import "./Info.css";
 
import  Pagination  from '@mui/material/Pagination'; 
import { Box,Stack,Typography} from '@mui/material'; 


function FileUploader({ childToParent }) {
  const [state, setState] = useState({
    filename: null,
  });
  // State to store parsed data
  const [showForm, setshowForm] = useState(false);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);
  
  // Pagination stuffs
  const [slicedValues, setslicedValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    let form_data = new FormData();
    form_data.append("filename", state.filename, state.filename.name);
    setshowForm(true);
    let url = "http://localhost:8000/rlmodels/upfile";
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        childToParent({
          options: res.data.cols,
          filename: res.data.filename,
        });
      })
      .catch((err) => console.log(err));
  };
  const changeHandler = (e) => {
    setState({
      filename: e.target.files[0],
    });
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
        // <Multiselect options = {tableRows} />
        childToParent({
          options: rowsArray[0],
          filename: "",
        });
      },
    });
  }; 
  // Function to slice the data
  const paginate=(event,value)=>{
       setCurrentPage(value); 
       console.log(currentPage);
   const  slicedData=values.slice((currentPage-1)*itemsPerPage,currentPage*itemsPerPage);
       setslicedValues(slicedData);
 
  }

   


  return (
    < >
      {showForm ? null : (
        <form onSubmit={handleSubmit}>
          <div class="row g-3">
            <div class="col-sm-7">
              <input
                type="file"
                id="image"
                accept=".csv"
                name="filename"
                onChange={changeHandler}
                className="form-control"
                style={{ display: "block", margin: "10px auto" }}
              />
            </div>
            <div class="col-sm">
              <input
                type="submit"
                value="Upload"
                className="btn btn-primary py-2 px-4"
              />
            </div>
          </div>
        </form>
      )}
      <br />
      <br />
      {/* Table */}
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {slicedValues.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
  
  <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {values.length > 6 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(values.length / itemsPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>


    </ >
  );
}

export default FileUploader;