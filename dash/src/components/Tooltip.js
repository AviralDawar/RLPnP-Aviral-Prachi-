import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Info from "./InfoIcon";

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip placement="left" {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 200,
  },
});

export default function CustomTooltip({ longText }) {
  return (
    <div>
      <CustomWidthTooltip title={longText}>
        <IconButton size="small">
          <Info />
        </IconButton>
      </CustomWidthTooltip>
    </div>
  );
}
