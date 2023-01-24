import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";

test("Render nav bar", () => {
  render(<Navbar />);
  const navbarText = screen.getByText(/Github - Repository listing/i);
  expect(navbarText).toBeInTheDocument();
});
