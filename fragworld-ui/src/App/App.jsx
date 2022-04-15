import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Grommet, Notification, Box, Button } from "grommet";
import { Terminal, User, Configure } from "grommet-icons";

import "../styles.css";
import ServersSection from "Servers";
import UserDashboard from "User/Dashboard";
import StateProvider from "./State/Provider";
import useAppState from "./State/use";
import TriCardLayout from "Shared/Layout/TriCard";
import Logo from "./Logo";
import Auth from "Auth";
import Card from "Shared/Card";
import { RESPONSIVE_SECTIONS } from "App/State/Provider";
import theme from "theme";

const queryCache = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

function Primitive() {
  const {
    toasts,
    viewport,
    hideToast,
    loggedIn,
    focusServers,
    focusRcon,
    focusUser,
    activeResponsiveSection
  } = useAppState();
  // const currentToast = !!toasts.length && toasts[toasts.length - 1];

  const isLeftSideResponsive = true;
  const isRightSideResponsive = true;

  return (
    <TriCardLayout
      // background="brand"
      header={
        <Box direction="row" align="center">
          <Box width="80px">
            <Button icon={<Terminal color="white" />} onClick={focusRcon} plain />
          </Box>
          <Button margin={{ horizontal: "auto" }} label={<Logo color="white"  />} plain onClick={focusServers} />
          <Box direction="row" gap="medium" width="80px" justify="end">
            <Button icon={<Configure color="white" />} onClick={focusUser} plain/>
            <Button icon={<User color="white" />} onClick={focusUser} plain/>
          </Box>
        </Box>
      }
      main={<ServersSection />}
      right={
        <Card>
          {loggedIn ? (
            <UserDashboard
              onClose={focusServers}
              showOnClose={isRightSideResponsive}
            />
          ) : (
            <Auth />
          )}
        </Card>
      }
      left={
        <Card>
          <b>RCON CONSOLE</b>
        </Card>
      }
      fillRight={["small", "xsmall"].includes(viewport)}
      isLeftResponsive={isLeftSideResponsive}
      isRightResponsive={isRightSideResponsive}
      isLeftActive={activeResponsiveSection === RESPONSIVE_SECTIONS.RCON}
      isRightActive={activeResponsiveSection === RESPONSIVE_SECTIONS.USER}
      onMainBackdropClick={focusServers}
    />
  );
}

export default () => {
  return (
    <Grommet theme={theme}>
      <QueryClientProvider client={queryCache}>
        <StateProvider>
          <Primitive />
        </StateProvider>
      </QueryClientProvider>
    </Grommet>
  );
};
