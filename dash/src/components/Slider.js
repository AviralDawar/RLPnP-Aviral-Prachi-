import * as React from "react";
import PropTypes from "prop-types";
import Slider, { SliderThumb } from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import MuiInput from "@mui/material/Input";

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function CustomizedSlider(props) {
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.childToParent(value);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Box sx={{ width: 130 }}>
      <Box sx={{ m: 4 }} />

      {/* <Input
        value={value}
        size="large"
        margin="none"
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{
          step: 10,
          min: 0,
          max: 100,
          type: "number",
          "aria-labelledby": "input-slider",
        }}
      /> */}

      <Slider
        valueLabelDisplay="auto"
        onChange={handleSliderChange}
        value={typeof value === "number" ? value : 0}
        components={{
          ValueLabel: ValueLabelComponent,
        }}
        aria-label="custom thumb label"
        defaultValue={20}
      />
    </Box>
  );
}
