import React from "react";
import { Box, Text } from "grommet";

export default ({ children, label, ...restProps }) => {
  return (
    <Box border={{ color: "light-5", size: "small" }} round="xsmall" {...restProps} pad="small" style={{ position: "relative" }}>
      {label && (
        <Box
          as={Text}
          pad={{ horizontal: "small" }}
          background="white"
          color="grey"
          style={{
            position: "absolute",
            left: 10,
            top: -8,
            lineHeight: "13px"
          }}
        >
          <b>{label}</b>
        </Box>
      )}
      {children}
    </Box>
  );
};
