import React from "react";
import { Form, Box, FormField, TextInput, Button, Text } from "grommet";
import { login } from "../api";

export default () => {
  const [values, setValues] = React.useState({});

  const handleSubmit = ({ value }) => {
    login(value);
  };

  return (
    <Box pad={{ horizontal: "medium", vertical: "large" }} gap="large">
      <Box direction="row">
        <h2>Reset Password</h2>
        <Box margin={{ left: "auto" }}>back</Box>
      </Box>
      <Text size="medium">
        Forgot your passord? Just enter your email adress and hit the "reset
        password" button and You will recceive an email with your new password
        soon.
      </Text>
      <Form
        onChange={setValues}
        value={values}
        onReset={() => setValues({})}
        onSubmit={handleSubmit}
      >
        <FormField label="email">
          <TextInput name="email" placeholder="enter email" />
        </FormField>
      </Form>

      <Box gap="medium">
        <Button type="submit" label="reset password" primary />
      </Box>
    </Box>
  );
};
