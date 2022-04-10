import React from "react";
import { Form, Box, FormField, TextInput, Button } from "grommet";

import schema from "./schema";
import { createGetValidateProps } from "Shared/formHelpers";

const getValidateProps = createGetValidateProps(schema);

export default ({ onSubmit }) => {
  const [values, setValues] = React.useState({
    email: "",
    password: ""
  });

  return (
    <Box pad={{ horizontal: "medium", vertical: "large" }} gap="large">
      <h2>Login</h2>
      <Form
        onChange={setValues}
        value={values}
        onReset={() => setValues({})}
        onSubmit={({ value }) => onSubmit(value)}
      >
        <FormField label="email" htmlFor="email" {...getValidateProps("email")}>
          <TextInput
            type="text"
            name="email"
            id="email"
            placeholder="enter email"
          />
        </FormField>
        <FormField
          label="password"
          htmlFor="password"
          {...getValidateProps("password")}
        >
          <TextInput
            name="password"
            id="password"
            type="password"
            placeholder="enter password"
          />
        </FormField>
        <Box>
          <small>forgot password?</small>
        </Box>
        <Box gap="medium" margin={{ top: "large" }}>
          <Button type="submit" label="login" primary />
          <Button type="reset" label="reset" />
        </Box>
      </Form>
    </Box>
  );
};
