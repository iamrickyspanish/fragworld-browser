import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Grommet, Notification } from "grommet";

import "../styles.css";
import ServersSection from "Servers";
import UserDashboard from "User/Dashboard";
import StateProvider from "./State/Provider";
import useAppState from "./State/use";
import Footer from "./Footer";
import TriCardLayout from "Shared/Layout/TriCard";
import Logo from "./Logo";
import Auth from "Auth";
import Card from "Shared/Card";
import { RESPONSIVE_SECTIONS } from "App/State/Provider";

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

  const isLeftSideResponsive = viewport !== "large";
  const isRightSideResponsive = viewport === "small";

  return (
    <TriCardLayout
      // background="brand"
      header={<Logo color="white" margin={{ left: "xsmall" }} />}
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
      footer={
        <Footer
          onRconClick={focusRcon}
          onServersClick={focusServers}
          onUserClick={focusUser}
          activeSection={activeResponsiveSection}
        />
      }
    />
  );
}

export default () => {
  return (
    <Grommet>
      <QueryClientProvider client={queryCache}>
        <StateProvider>
          <Primitive />
        </StateProvider>
      </QueryClientProvider>
    </Grommet>
  );
};
