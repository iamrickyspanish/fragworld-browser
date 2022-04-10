import React from "react";
import { Box } from "grommet";
import { User } from "grommet-icons";

export const UserMenuButton = ({ onClick }) => {
  return (
    <Box
      direction="row"
      width="25px"
      height="25px"
      justify="center"
      align="flex-end"
      background="white"
      broder={{ radius: "50%" }}
      style={{ borderRadius: "50%" }}
      onClick={onClick}
    >
      <User color="grey" size="20px" />
    </Box>
  );
};
