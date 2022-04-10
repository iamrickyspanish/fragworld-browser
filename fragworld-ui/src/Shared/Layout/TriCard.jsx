import React from "react";
import { Box, Text, Grid } from "grommet";
import styled from "styled-components";

const useResponsiveSidebarProps = (
  direction = "left",
  active = true,
  fill = false
) => {
  if (direction !== "left" && direction !== "right")
    throw new Error("useResponsiveSidebarProps: Invalid direction");
  const style = {
    position: "absolute",
    height: "100%",
    width: fill ? "100%" : "auto",
    top: 0,
    [direction]: active ? 0 : "-120%",
    transition: "all 0.25s ease",
    zIndex: 2
  };
  return { style };
};

const CardPrimitive = styled(Text).attrs({
  as: Box,
  round: "xsmall",
  overflow: "hidden"
  // elevation: "small"
})``;

const Card = ({ children, ...restProps }) => {
  return <CardPrimitive {...restProps}>{children}</CardPrimitive>;
};

export default function TriCardLayout(props) {
  const leftSidebarProps = useResponsiveSidebarProps(
    "left",
    props.isLeftActive,
    props.fillLeft
  );
  const rightSidebarProps = useResponsiveSidebarProps(
    "right",
    props.isRightActive,
    props.fillRight
  );

  const hideMain =
    (props.isLeftResponsive && props.isLeftActive) ||
    (props.isRightResponsive && props.isRightActive);

  const renderOrFnCall = React.useCallback(
    (nodeOrFn) => (typeof nodeOrFn === "function" ? nodeOrFn() : nodeOrFn),

    []
  );

  return (
    <Box
      as={Grid}
      fill
      width="100vw"
      rows={["auto", "flex", "auto"]}
      background={props.background}
      style={{
        overflow: "hidden"
        // minHeight: 0
      }}
    >
      {/* HEADER */}
      <Box
        as={Text}
        color={props.color}
        fill="horizontal"
        pad={{ horizontal: "medium", vertical: "small" }}
      >
        {renderOrFnCall(props.header)}
      </Box>
      <Box margin={{ horizontal: "small", bottom: "small" }}>
        <Box flex direction="row" style={{ position: "relative" }}>
          <Card
            margin={props.isRightResponsive ? false : { right: "small" }}
            background={props.backgroundCards}
            color={props.colorCards}
            {...(props.isLeftResponsive ? leftSidebarProps : {})}
          >
            {renderOrFnCall(props.left)}
          </Card>
          <Box style={{ position: "relative" }} flex>
            {hideMain && (
              <Box
                onClick={props.onMainBackdropClick}
                fade
                round="xsmall"
                fill
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "black",
                  opacity: 0.4,
                  zIndex: 1
                }}
              />
            )}
            <Card
              background={props.backgroundCards}
              color={props.colorCards}
              fill="vertical"
            >
              {renderOrFnCall(props.main)}
            </Card>
          </Box>
          <Card
            margin={props.isRightResponsive ? false : { left: "small" }}
            background={props.backgroundCards}
            color={props.colorCards}
            {...(props.isRightResponsive ? rightSidebarProps : {})}
          >
            {renderOrFnCall(props.right)}
          </Card>
        </Box>
      </Box>
      <Box
        as={Text}
        color={props.color}
        fill="horizontal"
        pad={{ horizontal: "medium", bottom: "small" }}
      >
        {renderOrFnCall(props.footer)}
      </Box>
    </Box>
  );
}

TriCardLayout.defaultProps = {
  title: "[TITLE]",
  left: "[LEFT SIDE]",
  right: "[RIGHT SIDE]",
  main: "[MAIN]",
  isLeftResponsive: false,
  isRightResponsive: false,
  isLeftActive: false,
  isRightActive: false,
  fillLeft: false,
  fillRight: false,
  background: "grey",
  backgroundCards: "white",
  color: "white",
  colorCards: "grey",
  backgroundMainBackdrop: "black",
  onMainBackdropClick: (f) => f
};
