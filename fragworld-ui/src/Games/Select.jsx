import React from "react";
import { Select } from "grommet";
import { useQuery } from "react-query";

import { getGames } from "./api";

export default (props) => {
  const { data: games, isFetching, isFetched } = useQuery("games", getGames);

  const gameOptions = Array.isArray(games)
    ? games.map((game) => {
        return {
          value: game._id,
          label: game.name
        };
      })
    : [];

  return (
    <Select
      labelKey="label"
      placeholder="Select Game"
      emptySearchMessage={"No Games Available"}
      valueKey={{ key: "value", reduce: true }}
      options={gameOptions}
      disabled={isFetching || !isFetched}
      {...props}
    />
  );
};
