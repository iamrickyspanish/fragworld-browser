import React from "react";
import { Box, Text } from "grommet";
import { Terminal, User, Servers } from "grommet-icons";
import { RESPONSIVE_SECTIONS } from "App/State/Provider";

export default ({
  onServersClick,
  onRconClick,
  onUserClick,
  color,
  activeSection
}) => {
  return (
    <Box as={Text} direction="row" color={color} fill="horizontal">
      <Box
        pad="small"
        // hoverIndicator
        focusIndicator={false}
        onClick={onRconClick}
        align="center"
        justify="center"
        flex
        background={
          activeSection === RESPONSIVE_SECTIONS.RCON ? "dimgrey" : "inherit"
        }
      >
        <Terminal color="white" />
      </Box>
      <Box
        pad="small"
        // hoverIndicator
        focusIndicator={false}
        align="center"
        justify="center"
        onClick={onServersClick}
        outline="none"
        flex
        background={
          activeSection === RESPONSIVE_SECTIONS.SERVERS ? "dimgrey" : "inherit"
        }
      >
        <Servers color="white" />
      </Box>
      <Box
        pad="small"
        // hoverIndicator
        focusIndicator={false}
        align="center"
        justify="center"
        onClick={onUserClick}
        outline="none"
        flex
        background={
          activeSection === RESPONSIVE_SECTIONS.USER ? "dimgrey" : "inherit"
        }
      >
        <User color="white" />
      </Box>
    </Box>
  );
};
