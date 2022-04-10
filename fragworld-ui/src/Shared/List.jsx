import React from "react";
import { Box, Spinner, InfiniteScroll, Text } from "grommet";
import PropTypes from "prop-types";

const MessageWrapper = (props) => (
  <Box
    as={Text}
    weight="bold"
    color="grey"
    pad="large"
    align="center"
    justify="center"
    border={{ side: "top", color: "lightgrey" }}
  >
    {props.children}
  </Box>
);

const List = ({ children, items, isLoading, ...restProps }) => {
  return (
    <Box
      overflow={isLoading ? "hidden" : "auto"}
      style={{ display: "block", position: "relative" }}
      {...restProps}
    >
      {isLoading && (
        <Box
          width="100%"
          height="100%"
          fill
          background="white"
          style={{ opacity: 0.7, position: "absolute", top: 0, left: 0 }}
          align="center"
          justify="center"
        >
          <Spinner size="large" />
        </Box>
      )}
      {items.length ? (
        <>
          <InfiniteScroll items={items}>{children}</InfiniteScroll>
          <MessageWrapper>NO MORE ITEMS AVAILABLE</MessageWrapper>
        </>
      ) : (
        <MessageWrapper>NO ITEMS AVAILABLE</MessageWrapper>
      )}
    </Box>
  );
};

List.propTypes = {
  isLoading: PropTypes.bool
};

List.defaultProps = {
  isLoading: false
};

export default List;
