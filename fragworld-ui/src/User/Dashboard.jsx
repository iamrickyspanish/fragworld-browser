import React from "react";
import { Box, Button, Text, Spinner } from "grommet";
import { Logout, Close } from "grommet-icons";

import { logout } from "Auth/api";
import useAppState from "App/State/use";
import { useMutation } from "react-query";

export default ({ onClose, showOnClose }) => {
  const { currentUser: user, logOut } = useAppState();
  const { mutate: handleLogout, isLoading } = useMutation(logout, {
    onSuccess: () => {
      logOut();
      onClose();
    }
  });

  return (
    <Box gap="medium" fill>
      <Box direction="row" alignItems="center">
        <Text size="large" weight="bold">
          {user?.email}
        </Text>
        {showOnClose && (
          <Button
            plain
            onClick={onClose}
            margin={{ left: "auto" }}
            icon={<Close />}
          />
        )}
      </Box>
      <Button
        icon={isLoading ? <Spinner margin={{ right: "small" }} /> : <Logout />}
        margin={{ top: "auto" }}
        onClick={handleLogout}
        label="log out"
      />
    </Box>
  );
};
