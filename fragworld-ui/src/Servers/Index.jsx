import React from "react";
import { Box, Button, Layer, Text, Spinner } from "grommet";
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

export const Context = React.createContext();

const ServersIndex = (props) => {
  const [filterFormValues, setFilterFormValues] = React.useState({});
  const { game, favorites, loggedIn } = useAppState();

  const [showFilter, setShowFilter] = React.useState(false);

  const serverParams = { game };

  React.useEffect(() => {
    setFilterFormValues((oldValues) => ({
      ...oldValues,
      favoritesOnly: false
    }));
  }, [loggedIn]);

  const {
    data: servers = [],
    isFetching: isFetchingServrs,
    refetch: refetchServers
  } = useQuery(["servers", serverParams], () => getServers(serverParams));

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

  const ctx = {
    filterFormValues,
    setFilterFormValues,
    setShowFilter,
    game,
    items: filteredServers,
    isFetching: isFetchingServrs,
    refetch: refetchServers
  };

  return (
    <Context.Provider value={ctx}>
      {showFilter && (
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
      {props.children}
    </Context.Provider>
  );
};

const Body = () => {
  const { items, isFetching, error } = React.useContext(Context);
  const { favorites, toggleFavorite, isFetchingFavorites } = useAppState();
  return (
    <List
      margin={{ top: "small" }}
      items={items}
      isLoading={isFetching}
      error={error}
      background="light-2"
    >
      {(item, i) => (
        <Box background="white">
          <Item
            flex
            margin={{ horizontal: "medium" }}
            pad={{ vertical: "small" }}
            key={item._id}
            disableFavorite={isFetchingFavorites}
            isFavorite={
              !!favorites.find(({ serverId }) => serverId === item.serverId)
            }
            onToggleFavorite={() => toggleFavorite(item.serverId)}
            data={item}
            border={
              i === items.length - 1
                ? false
                : { color: "lightgrey", side: "bottom" }
            }
          />
        </Box>
      )}
    </List>
  );
};

const Head = () => {
  const { game, setGame } = useAppState();
  const { isFetching } = React.useContext(Context);

  const {
    refetch,
    filterFormValues,
    setFilterFormValues,
    setShowFilter
  } = React.useContext(Context);
  const handleGameChange = React.useCallback(({ value: nextGame }) => {
    setGame(nextGame);
  }, []);

  const handleRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Box pad={{ bottom: "small", horizontal: "medium" }}>
      <Box direction="row" align="center" margin={{ bottom: "small" }}>
        <Box flex>
          <GameSelect
            value={game}
            onChange={handleGameChange}
            margin={{ vertical: "small", right: "small" }}
          />
        </Box>
        <Button
          plain
          label="Filter"
          icon={<Filter />}
          onClick={() => setShowFilter(true)}
          margin={{ right: "xsmall" }}
        />
        <Box margin={{ horizontal: "small" }} border="left" height="16px"></Box>
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
  );
};

ServersIndex.Head = Head;
ServersIndex.Body = Body;

export default ServersIndex;
