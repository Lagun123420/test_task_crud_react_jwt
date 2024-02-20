import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import PublicRoute from "./components/publicRoute/PublicRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import NewAppPage from "./pages/NewAppPage/NewAppPage";
import EditAppPage from "./pages/EditAppPage/EditAppPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route
            path="/registration"
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            }
          />
          <Route path="/" element={<Navigate replace to="/catalog" />} />
          <Route
            path="/catalog"
            element={
              <ProtectedRoute>
                <CatalogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/catalog/new"
            element={
              <ProtectedRoute>
                <NewAppPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/catalog/edit/:appId"
            element={
              <ProtectedRoute>
                <EditAppPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
