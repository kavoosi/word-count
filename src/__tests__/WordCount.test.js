import { screen, render, fireEvent } from "@testing-library/react";
import WordCountTest from "../WordCountTest"; 

// -	Null and empty inputs
test("-	Null and empty inputs", () => {
  render(<WordCountTest />);
  const input = screen.getByTestId("input-element");
  fireEvent.change(input, { target: { value: "not empty " } });
  expect(input.value).not.toBe("");
});

// -	Invalid inputs
test("Invalid inputs: some characters like [ ] * numbers $", () => {
  render(<WordCountTest />);
  const input = screen.getByTestId("input-element");
  fireEvent.change(input, { target: { value: " this is a sample test  888" } });
  expect(input.value).not.toMatch(/\d|\!|\$|\@|\|#|\%|\^|\&|\*|\]|\[/);
});

//  -	Valid input 
test("Valid input with valid output", () => {
  render(<WordCountTest />);
  const input = screen.getByTestId("input-element");
  fireEvent.change(input, { target: { value: "Valid: 45 " } });
  expect(input.value).toMatch(/[A-Za-z| |:|0-9]+$/);  
});
