import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("register todo", () => {
  render(<App />);

  const inputElm = screen.getByRole<HTMLInputElement>("textbox");
  userEvent.type(inputElm, "hello");
  userEvent.click(screen.getByRole("button", { name: "register" }));

  expect(inputElm.value).toBe("");

  userEvent.type(screen.getByRole("textbox"), "world");
  userEvent.click(screen.getByRole("button", { name: "register" }));

  expect(screen.getAllByRole("listitem")).toHaveLength(2);
});

test("done todo", () => {
  render(<App />);

  userEvent.type(screen.getByRole<HTMLInputElement>("textbox"), "hello");
  userEvent.click(screen.getByRole("button", { name: "register" }));

  userEvent.type(screen.getByRole<HTMLInputElement>("textbox"), "world");
  userEvent.click(screen.getByRole("button", { name: "register" }));

  const todos = screen.getAllByRole<HTMLLIElement>("listitem");
  userEvent.click(todos[0]);
  expect(todos[0]).toHaveStyle("text-decoration:line-through");
  expect(todos[1]).toHaveStyle("text-decoration:none");
});
