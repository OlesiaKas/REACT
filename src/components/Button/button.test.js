import { render, screen } from "@testing-library/react";

import Button from "./Button";
describe("Button", () => {
  it("should render button", () => {
    render(<Button> Click me </Button>);
    const button = screen.queryByTitle("button");
    expect(button).toBeTruthy();
  });
  it("should render correct text", () => {
    render(<Button>Click me</Button>);
    const text = screen.queryByTitle("buttonSpan");
    expect(text.textContent).toBe("Click me");
  });
});
