import React from "react";
import { Form, Box, FormField, TextInput, Button } from "grommet";
import { useMutation } from "react-query";

import { join } from "../api";

export default () => {
  const [values, setValues] = React.useState({});
  const { mutate, isLoading, isError } = useMutation(join);
  const handleSubmit = ({ value }) => {
    if (value.password !== value.passwordConfirmation) return;
    delete value.passwordConfirmation;
    mutate(value);
  };

  return (
    <Box pad={{ horizontal: "medium", vertical: "large" }} gap="large">
      <h2>Join</h2>
      <Form
        onChange={setValues}
        value={values}
        onReset={() => setValues({})}
        onSubmit={handleSubmit}
        disable={isLoading}
      >
        <FormField label="email">
          <TextInput name="email" placeholder="enter email" />
        </FormField>
        <FormField label="password">
          <TextInput
            name="password"
            type="password"
            placeholder="enter password"
          />
        </FormField>
        <FormField label="confirm password">
          <TextInput
            name="passwordConfirmation"
            type="password"
            placeholder="confirm password"
          />
        </FormField>
        <Box>
          <small>forgot password?</small>
        </Box>
        <Box gap="medium" margin={{ top: "large" }}>
          <Button type="submit" label="join" primary />
          <Button type="reset" label="reset" />
        </Box>
      </Form>
    </Box>
  );
};
