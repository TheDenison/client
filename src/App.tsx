/* Libs */
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

/* Menu */
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

/* Header */
import Upload from "./components/Upload";

/* Sidebar */
import Dashboards from "./components/Dashboards";
import Home from "./components/Home";
import Doc from "./components/Doc";
import Charts from "./components/Charts";
import Tasks from "./components/Tasks";
import Other from "./components/Other";
import Profile from "./components/Profile";

/* Reg/Log */
// import SignUp from './components/SignUp';
import SignIn from "./components/SignIn";

/* Styles */
import "./styles/App.css";
import "./styles/Sidebar.css";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  /* const toggleSidebar = */ () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <div className={`app-container ${isLoginPage ? "login-active" : ""}`}>
      {isLoginPage ? (
        <div className="signin-container">
          <SignIn />
        </div>
      ) : (
        <>
          <Sidebar />
          <div
            className={`main-content ${
              isSidebarOpen ? "with-sidebar" : "without-sidebar"
            }`}
          >
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboards />} />
              <Route path="/chart" element={<Charts />} />
              <Route path="/doc" element={<Doc />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/other" element={<Other />} />
              <Route path="*" element={<h1>404: Page Not Found</h1>} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  );
};

export default Root;
