import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Episodes from "./Episode";
import Multiselect from "./Multiselect";
import Epoch from "./Epoch";
import Resources from "./Resource";
import ResourceAllocate from "./ResourceAllocate";
import FileUploader from "./FileUploader";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#F5F5F5",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.primary,
}));

const Papertable = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#F5F5F5",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
  height: 550,
}));

export default function GridContainer() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#e6e6f0" }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        style={{
          margin: -5,
          width: "100%",
        }}
      >
        <Grid container item xs={8} spacing={2}>
          <Grid item xs={12}>
            <Papertable>
              <FileUploader />
              Component A
            </Papertable>
          </Grid>
        </Grid>

        <Grid container item xs={4} spacing={3}>
          <Grid item xs={6}>
            <Item>
              <Episodes />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Epoch />
            </Item>
          </Grid>

          <Grid item xs={12}>
            <Item>
              <Multiselect />
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Item>
              <Resources />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <ResourceAllocate />
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
