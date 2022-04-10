import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import LoginForm from "Auth/Login/Form";

import {
  getPasswordInput,
  getEmailInput,
  getResetButton,
  getSubmitButton,
  clickResetButton,
  clickSubmitButton,
  typeEmail,
  typePassword
} from "./helpers";

const mockSubmit = jest.fn();

beforeEach(() => {
  mockSubmit.mockReset();
  render(<LoginForm onSubmit={mockSubmit} />);
});

describe("LOGIN FORM", () => {
  it("renders, password, email fields and cancel, submit buttons are available", async () => {
    const emailInput = await getEmailInput();
    const passwordInput = await getPasswordInput();
    const submitButton = await getSubmitButton();
    const resetButton = await getResetButton();
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "text");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(submitButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  it("renders email, password field empty on mount", async () => {
    expect(await getEmailInput()).toHaveAttribute("value", "");
    expect(await getPasswordInput()).toHaveAttribute("value", "");
  });

  test("if user can enter password and email and submit the form", async () => {
    const credentials = {
      email: "user@mail.com",
      password: "secret123"
    };
    await typeEmail(credentials.email);
    await typePassword(credentials.password);
    expect(await getEmailInput()).toHaveValue(credentials.email);
    expect(await getPasswordInput()).toHaveValue(credentials.password);
    await clickSubmitButton();
    expect(mockSubmit).toHaveBeenCalledWith(credentials);
  });

  it("should validate email", async () => {
    const credentials = {
      email: "xyz",
      password: "secret123"
    };
    await typePassword(credentials.password);
    await typeEmail(credentials.email);
    await clickSubmitButton();
    expect(mockSubmit).not.toHaveBeenCalled();
    await typeEmail("");
    await clickSubmitButton();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("should validate password", async () => {
    const credentials = {
      email: "user@mail.com",
      password: "sec"
    };
    await typePassword(credentials.password);
    await typeEmail(credentials.email);
    await clickSubmitButton();
    expect(mockSubmit).not.toHaveBeenCalled();
    await typePassword("");
    await clickSubmitButton();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("empties email and password field  on reset button click", async () => {
    const credentials = {
      email: "user@mail.com",
      password: "secret123"
    };
    await typePassword(credentials.password);
    await typeEmail(credentials.email);
    await clickResetButton();
    expect(await getEmailInput()).toHaveAttribute("value", "");
    expect(await getPasswordInput()).toHaveAttribute("value", "");
  });
});
