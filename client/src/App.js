import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Content } from "./components/content/Content";

function App() {
  const [active, setActive] = useState(false);

  const changeNavbarVisibility = () => {
    setActive(!active);
  };

  return (
    <>
      <Router>
        <Navbar changeNavbarVisibility={changeNavbarVisibility} />
        <Routes>
          <Route path="/" element={<Content active={active} view="home" />} />
          <Route
            path="/tasks"
            element={<Content active={active} view="tasks" />}
          />
          <Route
            path="/tasks/:id"
            element={<Content active={active} view="task-details" />}
          />
          <Route
            path="/employees"
            element={<Content active={active} view="employees" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
