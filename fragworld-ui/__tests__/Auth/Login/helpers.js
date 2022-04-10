import { screen, fireEvent } from "@testing-library/react";

// getters

export const getEmailInput = async () => screen.getByLabelText(/email/i);

export const getPasswordInput = async () => screen.getByLabelText(/password/i);

export const getResetButton = async () =>
  screen.getByRole("button", { name: /reset/i });

export const getSubmitButton = async () =>
  screen.getByRole("button", { name: /login/i });

// user events

export const typeEmail = async (text) => {
  fireEvent.change(await getEmailInput(), { target: { value: text } });
};

export const typePassword = async (text) => {
  fireEvent.change(await getPasswordInput(), { target: { value: text } });
};

export const clickSubmitButton = async () => {
  fireEvent.click(await getSubmitButton());
};

export const clickResetButton = async () => {
  fireEvent.click(await getResetButton());
};
