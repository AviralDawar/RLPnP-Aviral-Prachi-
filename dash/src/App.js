import "./App.css";
import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import ResourceAllocate from "./components/ResourceAllocate";
import Episodes from "./components/Episode";
import Epoch from "./components/Epoch";
import Multiselect from "./components/Multiselect";
import Resources from "./components/Resource";
import Plotnew from "./components/Plotnew";
import axios from "axios";
import MaxMin from "./components/MaxMin";
import Model from "./components/Model";
import InputText from "./components/InputText";

function App() {
  const data = {
    filename: "",
    episodes: 30,
    epochs: 30,
    total_resources: 30,
    resource : {},
    quantity : {},
    states: {},
    rewards: {},
    features: {},
    model: {},
    max: {},
    min: {},
  };
  const [pltData, setPltData] = useState({
    x: [1, 2, 3],
    y: [2, 6, 3],
  });
  const [options, setOptions] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const childToParent = (childData) => {
    setOptions(childData.options);
    data.filename = childData.filename;
    console.log("Filename: ", data.filename);
  };

  function MSOptions(childData) {
    data.features = childData;
    console.log("Features: ", childData, data.features);
  }

  function EpisodeOptions(childData) {
    data.episodes = childData;
  }
  function EpochOptions(childData) {
    data.epochs = childData;
  }
  function TotalOptions(childData) {
    data.total_resources = childData;
  }
  function ResourceOptions(childData) {
    console.log("Received states: ", childData);
    data.states = childData.states;
    data.rewards = childData.rewards;
  }

  function Max_Min(childData){
    console.log("Received this: ", childData);
    data.max = childData.max;
    data.min = childData.min;
  }

  function ModelType(childData) {
    data.model= childData;
  }
  function Inputtext(childData){
    data.resource = childData.resource;
    data.quantity = childData.quantity;
  }
  function submitForm(event) {
    event.preventDefault();
    console.log("Sending data: ", data);

    axios({
      method: "post",
      url: "rlmodels/runmodel",
      data: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        setShowResults(true);
        setPltData(response.data);
        console.log(pltData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Resource Allocation Platform</h1>
        <img src = "tavlabsLogo.jpeg" alt="TavLabs" id = "logo"></img>
        {/* inserted the tavlabs logo in this div -> 1*/}

      </header>
      {showResults ? null : (
        <div>
          <div className="div sm">
            <FileUploader childToParent={childToParent} />
            {/* <Test /> */}
          </div>
          <div className = "input_text">
            {/* text box for taking the resource name and the quantity as the input */}
            <InputText childToParent={Inputtext}/>
          </div>

          <div className="dropdown">
            <ResourceAllocate
              options={options}
              childToParent={ResourceOptions}
            />

            <Model childToParent = {ModelType} />
            <Multiselect options={options} childToParent={MSOptions} />
          </div>
          
        </div>
      )}
      {showResults ? null : (
        <div className="div">
          <form onSubmit={submitForm}>
            <input
              type="submit"
              value="Run Model"
              color=""
              class="btn btn-primary py-2 px-4"
            />
          </form>
        </div>
      )}
      {showResults ? <Plotnew data={pltData} /> : null}
    </div>
  );
}

export default App;
