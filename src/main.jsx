import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Profile from "./components/Profile";
import Register from "./components/Register";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route element={<ProtectedRoute/>}>
                <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<PageNotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
