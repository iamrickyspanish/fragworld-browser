import React from "react";

import Index from "./Index";
import { Grid, Box } from "grommet";

export default () => {
  return (
    <Index>
      <Grid fill rows={["auto", "flex"]}>
        <Box elevation="small" pad={{ top: "small" }}>
          <Index.Head />
        </Box>
        <Index.Body />
      </Grid>
    </Index>
  );
};
