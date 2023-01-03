import React from "react";
import Plot from "react-plotly.js";

function Plotnew(props) {
  console.log(props);
  function addTraces(data) {
    let traces = [];

    let states = data.xax;
    let lines = data.yax;

    // Set up traces for each entity
    console.log("Lines: ", data.yax);
    
      traces.push({
        type: "bar",
        mode: "lines",
        x: states,
        y: lines,
      });
    

    return traces;
  }
  return (
    <Plot
      data={addTraces(props.data)}
      layout={{ width: 1000, height: 500, title: "Reward vs Days" }}
    />
  );
}
export default Plotnew;