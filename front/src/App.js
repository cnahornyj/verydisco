import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./auth/PrivateRoute";
import Login from "./views/Login";
import Home from "./views/Home";
import DifferentForm from "./views/DifferentForm";
import DestinationPage from "./views/DestinationPage";

import "./App.css";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/differentform"
          element={
            <PrivateRoute>
              <DifferentForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/destination/:city"
          element={
            <PrivateRoute>
              <DestinationPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
