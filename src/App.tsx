import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import React from "react";
import Main from "./pages/Main";
import { ToastProvider } from "./contexts/ToastModal";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
