import React from "react";
import { Box, Text } from "grommet";
import { Copy } from "grommet-icons";

import Flag from "Shared/Flag";
import ServerInfoRow from "./InfoRow";
import FavoriteIcon from "Favorite/Icon";

const LocationTag = ({ region, countryCode }) => (
  <Box
    background="light-5"
    round="medium"
    direction="row"
    align="center"
    pad={{ horizontal: "6px" }}
  >
    <Text size="xsmall" style={{ textTransform: "uppercase" }}>
      {region}
    </Text>
    <Flag margin={{ left: "4px" }} countryCode={countryCode} />
  </Box>
);

const Item = ({
  data,
  onToggleFavorite,
  isFavorite,
  disableFavorite,
  full,
  onToggleFull,
  ...restProps
}) => {
  return (
    <Box {...restProps} background="white" direction="column">
      <ServerInfoRow
        favoriteControl={
          <FavoriteIcon
            onClick={() => onToggleFavorite(data.serverId)}
            active={isFavorite}
            disabled={disableFavorite}
          />
        }
        mapInfo={data.map}
        playersInfo={`${data.players}/${data.maxPlayers}`}
        locationInfo={
          <LocationTag
            region={data.regionName}
            countryCode={data.countryCode}
          />
        }
      />
      <Box>
        {data.name} <br />
        <Box direction="row" align="center" gap="xsmall">
          <Text size="small">
            {data.host}:{data.port}
          </Text>
          <Copy size="11px" />
        </Box>
      </Box>
    </Box>
  );
};

export default Item;
