import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { DetailPage } from "./DetailPage";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

test("Render detail page", () => {
  render(
    <Router>
      <DetailPage />
    </Router>,
  );
  const detailPageText = screen.getByTestId("detail-page");
  expect(detailPageText).toBeInTheDocument();
});
