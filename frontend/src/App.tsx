import * as React from 'react';
import './styles/globals.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardFamily from "./pages/DashboardFamily";
import DashboardCaregiver from "./pages/DashboardCaregiver";
import ServiceSearchPage from "./pages/ServiceSearchPage";
import ServiceReservationPage from "./pages/ServiceReservationPage";
import CreateServicePage from "./pages/CreateServicePage";
import ProfileCaregiverPage from "./pages/ProfileCaregiverPage";
import ProfileFamilyPage from "./pages/ProfileFamilyPage";
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import VerifyEmailPage from './pages/VerifyEmailPage';
import AllServicesPage from "./pages/AllServicesPage.tsx";
import MyServicesPage from "./pages/MyServicesPage.tsx";
import AdminDashboard from './pages/AdminDashboard';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard-family" element={<DashboardFamily />} />
              <Route path="/dashboard-caregiver" element={<DashboardCaregiver />} />
              <Route path="/services/search" element={<ServiceSearchPage />} />
              <Route path="/services/:id/reservation" element={<ServiceReservationPage />} />
              <Route path="/services/create" element={<CreateServicePage />} />
              <Route path="/profile-CareGiver" element={<ProfileCaregiverPage />} />
              <Route path="/profile-family" element={<ProfileFamilyPage />} />
              <Route path="/all-services" element={<AllServicesPage />} />
              <Route path="/my-services" element={<MyServicesPage />} />
              <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminDashboard />} /></Route>


            </Route>
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;