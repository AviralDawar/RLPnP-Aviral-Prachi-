import React from "react";
import Plot from "react-plotly.js";

function Plotnew(props) {
  console.log(props);
  function addTraces(data) {
    let traces = [];

    let dates = data.xax;
    let lines = data.yax;

    // Set up traces for each entity
    console.log("Lines: ", data.yax);
    for (const [key, value] of Object.entries(lines)) {
      traces.push({
        type: "scatter",
        mode: "lines",
        x: dates,
        y: value,
        name: key,
      });
    }

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
