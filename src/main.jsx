import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import BlogProvider from "./providers/BlogProvider.jsx";
import ProfileProvider from "./providers/ProfileProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BlogProvider>
      <AuthProvider>
        <ProfileProvider>
          <Router>
            <App />
            <ToastContainer position="bottom-right" />
          </Router>
        </ProfileProvider>
      </AuthProvider>
    </BlogProvider>
  </React.StrictMode>
);
