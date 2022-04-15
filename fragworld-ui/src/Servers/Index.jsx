import React from "react";
import {
  Box,
  Grid,
  Button,
  Layer,
  Text,
  Spinner,
  ResponsiveContext
} from "grommet";
import { Refresh, Close, Filter, Location } from "grommet-icons";
import { useQuery } from "react-query";

import FavoriteIcon from "Favorite/Icon";
import { getServers } from "./api";
import List from "Shared/List";
import Item from "./Item";
import useAppState from "App/State/use";
import { Full as FilterForm, filterItems } from "./Filter";
import ServerInfoRow from "./InfoRow";
import GameSelect from "Games/Select";
export default () => {
  const [filterFormValues, setFilterFormValues] = React.useState({});
  const [showFilter, setShowFilter] = React.useState(false);
  const {
    favorites,
    toggleFavorite,
    isFetchingFavorites,
    game,
    setGame,
    loggedIn
  } = useAppState();

  const {
    data: servers = [],
    isFetching,
    refetch: refetchServers
  } = useQuery(["servers", serverParams], () => getServers(serverParams));

  const handleGameChange = React.useCallback(({ value: nextGame }) => {
    setGame(nextGame);
  }, []);

  const handleRefresh = React.useCallback(() => {
    refetchServers();
  }, [refetchServers]);

  const serverParams = { game };

  React.useEffect(() => {
    setFilterFormValues((oldValues) => ({
      ...oldValues,
      favoritesOnly: false
    }));
  }, [loggedIn]);

  React.useEffect(() => {
    game && refetchServers();
  }, [game, refetchServers]);

  const filteredServers = filterItems(
    servers.map((server) => ({
      ...server,
      isFavorite: !!favorites.find(
        ({ serverId }) => serverId === server.serverId
      )
    })),
    filterFormValues
  );

  const viewport = React.useContext(ResponsiveContext);
  const isMobile = viewport === "small";

  return (
    <>
      {isMobile && showFilter && (
        <Layer
          modal
          onClickOutside={() => setShowFilter(false)}
          onEsc={() => setShowFilter(false)}
        >
          <Box pad="medium">
            <Box direction="row" margin={{ bottom: "large" }}>
              <Text weight="bold">Filter</Text>
              <Button
                margin={{ left: "auto" }}
                icon={<Close />}
                onClick={() => setShowFilter(false)}
                plain
              />
            </Box>
            <FilterForm
              values={filterFormValues}
              setValues={setFilterFormValues}
            />
          </Box>
        </Layer>
      )}
      <Grid
        fill
        rows={["auto", "flex"]}
        columns={["flex", "auto"]}
        areas={[
          { name: "header", start: [0, 0], end: [0, 0] },
          { name: "filter", start: [1, 0], end: [1, 1] },
          { name: "list", start: [0, 1], end: [0, 1] }
        ]}
      >
        <Box
          direction="row"
          pad={{ top: "small" }}
          gridArea="header"
          elevation="small"
          border={{ side: "bottom", color: "lightgrey" }}
        >
          <Box flex pad={{ bottom: "small", horizontal: "medium" }}>
            <Box direction="row" align="center" margin={{ bottom: "small" }}>
              <Box flex>
                <GameSelect
                  value={game}
                  onChange={handleGameChange}
                  margin={{ vertical: "small", right: "small" }}
                />
              </Box>
              {isMobile && (
                <>
                  <Button
                    plain
                    label="Filter"
                    icon={<Filter />}
                    onClick={() => setShowFilter(true)}
                    margin={{ right: "xsmall" }}
                  />
                  <Box
                    margin={{ horizontal: "small" }}
                    border="left"
                    height="16px"
                  ></Box>
                </>
              )}
              <Button
                onClick={handleRefresh}
                icon={isFetching ? <Spinner /> : <Refresh />}
                plain
              />
            </Box>

            <ServerInfoRow
              favoriteControl={
                <FavoriteIcon
                  active={filterFormValues.favoritesOnly}
                  onClick={() => {
                    setFilterFormValues({
                      ...filterFormValues,
                      favoritesOnly: !filterFormValues.favoritesOnly
                    });
                  }}
                />
              }
              mapInfo="map"
              playersInfo="players"
              locationInfo={<Location />}
            />
          </Box>
        </Box>
        <Box
          gridArea="list"
          // border={isMobile ? false : { side: "right", color: "light-5" }}
        >
          <List
            flex
            items={filteredServers}
            isLoading={isFetching}
            background="light-5"
            pad={{ top: "xsmall" }}
          >
            {(item, i) => (
              <Box>
                <Item
                  flex
                  // round="xsmall"
                  margin={{ horizontal: "small", top: "xsmall" }}
                  pad={{ vertical: "small", horizontal: "small" }}
                  key={item._id}
                  disableFavorite={isFetchingFavorites}
                  isFavorite={
                    !!favorites.find(
                      ({ serverId }) => serverId === item.serverId
                    )
                  }
                  onToggleFavorite={() => toggleFavorite(item.serverId)}
                  data={item}
                />
              </Box>
            )}
          </List>
          {/* </Box> */}
        </Box>
        {!isMobile && (
          <Box width="420px" gridArea="filter" pad="medium">
            <FilterForm
              values={filterFormValues}
              setValues={setFilterFormValues}
            />
          </Box>
        )}
        {/* </Box> */}
      </Grid>
    </>
  );
};
