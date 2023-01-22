import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { DetailPage } from "./components/pages/DetailPage";
import { Home } from "./components/pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="detail" element={<DetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
