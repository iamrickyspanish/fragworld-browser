import React from "react";
import {
  Box,
  Form,
  FormField,
  TextInput,
  CheckBox,
  Button,
  Select
} from "grommet";

import FieldGroup from "Shared/FieldGroup";
import useAppState from "App/State/use";
import GameSelect from "Games/Select";

export const filterItems = (items = [], filterValues) => {
  let filteredItems = [...items];

  if (filterValues.minPlayers) {
    filteredItems = filteredItems.filter(
      (item) => item.players >= filterValues.minPlayers
    );
  }

  if (filterValues.maxPlayers) {
    filteredItems = filteredItems.filter(
      (item) => item.players <= filterValues.maxPlayers
    );
  }

  if (filterValues.map) {
    filteredItems = filteredItems.filter((item) =>
      item.map?.includes(filterValues.map)
    );
  }

  if (filterValues.favoritesOnly) {
    filteredItems = filteredItems.filter((item) => item.isFavorite);
  }

  return filteredItems;
};

export const Main = () => {
  const { game, setGame } = useAppState();

  const handleGameChange = React.useCallback(({ value: nextGame }) => {
    setGame(nextGame);
  }, []);

  return (
    <Box width="100%" pad={{ horizontal: "medium" }}>
      <GameSelect width={1} value={game} onChange={handleGameChange} />
    </Box>
  );
};

export const Full = ({ values, setValues, ...restProps }) => {
  const onFormChange = React.useCallback(
    (nextValues) => {
      const nextMinPlayers = Number(nextValues.minPlayers);
      const minPlayers = Number(values.minPlayers);
      if (nextValues.hideEmpty) {
        if (!nextMinPlayers) {
          if (minPlayers) {
            nextValues.hideEmpty = false;
          } else {
            nextValues.minPlayers = 1;
          }
        }
      } else {
        if (nextMinPlayers) {
          if (!minPlayers) {
            nextValues.hideEmpty = true;
          } else {
            nextValues.minPlayers = "";
          }
        }
      }
      setValues(nextValues);
    },
    [values.minPlayers, setValues]
  );

  return (
    <Form
      value={values}
      onChange={onFormChange}
      onReset={() => setValues({})}
      onSubmit={({ value }) => console.log(value)}
    >
      <Box
        gap="small"
        direction="row"
        margin={{ bottom: "medium" }}
        {...restProps}
      >
        <FieldGroup label="players">
          <Box direction="row" gap="medium">
            <FormField label="min" width="70px">
              <TextInput
                name="minPlayers"
                type="number"
                min={0}
                placeholder="-"
              />
            </FormField>
            <FormField label="max" width="70px">
              <TextInput
                name="maxPlayers"
                type="number"
                min={0}
                placeholder="-"
              />
            </FormField>
            <FormField
              label="hide empty"
              width="125px"
              contentProps={{
                border: false,
                justify: "center",
                align: "center"
              }}
            >
              <CheckBox name="hideEmpty" />
            </FormField>
          </Box>
        </FieldGroup>
        <FieldGroup label="location" flex>
          <FormField label="region">
            <Select name="region" options={[]} placeholder="All" />
          </FormField>
        </FieldGroup>
      </Box>
      <FieldGroup label="game" flex margin={{ bottom: "medium" }}>
        <FormField label="map">
          <TextInput name="map" placeholder="Search fro map" />
        </FormField>
      </FieldGroup>
      {/* <Button label="filter" type="submit" margin={{ right: "small" }} /> */}
      {/* <Button label="reset" type="reset" /> */}
    </Form>
  );
};
