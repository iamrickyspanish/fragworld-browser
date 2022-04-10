import React from "react";
import { Box } from "grommet";

export default ({ children, label, ...restProps }) => {
  return (
    <Box border {...restProps} pad="small" style={{ position: "relative" }}>
      {label && (
        <Box
          pad={{ horizontal: "small" }}
          background="white"
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
