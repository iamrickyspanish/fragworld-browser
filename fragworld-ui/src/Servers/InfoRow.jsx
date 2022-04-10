import React from "react";
import { Box } from "grommet";

export default ({
  favoriteControl,
  playersInfo,
  mapInfo,
  locationInfo,
  ...restProps
}) => {
  return (
    <Box direction="row" align="center" width="100%" {...restProps}>
      <Box width="50px">{favoriteControl}</Box>
      <Box fill pad={{ horizontal: "small" }}>
        {mapInfo}
      </Box>
      <Box width="130px">{playersInfo}</Box>
      <Box align="flex-end" width="100px">
        {locationInfo}
      </Box>
    </Box>
  );
};
