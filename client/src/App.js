import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Info from "./pages/info";
import Edit from "./pages/edit";
import Operations from "./pages/operations";
import Header from "./Components/header";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Info />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/operations" element={<Operations />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
