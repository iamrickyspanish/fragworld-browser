import React from "react";
import { Tabs, Tab, Box } from "grommet";
import { Login, UserAdd, Help } from "grommet-icons";

import useAppState from "App/State/use";
import { login } from "Auth/api";
import LoginComponent from "Auth/Login/Form";
import Join from "Auth/Join";

export const SECTIONS = Object.freeze({
  LOGIN: 0,
  JOIN: 1,
  HELP: 2
});

export default (props) => {
  const [activeSection, setActiveSection] = React.useState(SECTIONS.LOGIN);

  const { logIn } = useAppState();

  const handleSubmit = async (credentials) => {
    try {
      const user = await login(credentials);
      logIn(user);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Box {...props}>
      <Tabs activeIndex={activeSection} flex onActive={setActiveSection}>
        <Tab title="Login" icon={<Login />}>
          <LoginComponent onSubmit={handleSubmit} />
        </Tab>
        <Tab title="Join" icon={<UserAdd />}>
          <Join />{" "}
        </Tab>
        <Tab title="Help" icon={<Help />}></Tab>
      </Tabs>
    </Box>
  );
};
