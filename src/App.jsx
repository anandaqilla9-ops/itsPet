import { Routes, Route, Navigate } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import RoleSelection from "./pages/RoleSelection"
import SignupPawrent from "./pages/SignupPawrent"
import SignupSitter from "./pages/SignupSitter"
import Search from "./pages/Search"
import SitterDetail from "./pages/SitterDetail"
import Booking from "./pages/Booking"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import Chat from "./pages/Chat"
import Monitoring from "./pages/Monitoring"
import VerifiedSitters from "./pages/VerifiedSitters"
import Loyalty from "./pages/Loyalty"
import SitterDashboard from "./pages/SitterDashboard"
import SitterBookings from "./pages/SitterBookings"
import SitterMonitoring from "./pages/SitterMonitoring"
import Earnings from "./pages/Earnings"
import SitterReviews from "./pages/SitterReviews"
import ProtectedRoute from "./components/ProtectedRoute"
import RoleProtectedRoute from "./components/RoleProtectedRoute"

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/role" element={<RoleSelection />} />

      <Route
        path="/signup-pawrent"
        element={<SignupPawrent />}
      />

      <Route
        path="/signup-sitter"
        element={<SignupSitter />}
      />

      {/* PAWRENT ROUTES */}
      <Route
        path="/search"
        element={
          <RoleProtectedRoute allowedRoles={["pawrent"]}>
            <Search />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/sitter-detail"
        element={
          <ProtectedRoute>
            <SitterDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking"
        element={
          <RoleProtectedRoute allowedRoles={["pawrent"]}>
            <Booking />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <RoleProtectedRoute allowedRoles={["pawrent"]}>
            <Chat />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/monitoring"
        element={
          <RoleProtectedRoute allowedRoles={["pawrent"]}>
            <Monitoring />
          </RoleProtectedRoute>
        }
      />

      <Route path="/verified-sitters" element={<VerifiedSitters />} />

      <Route
        path="/loyalty"
        element={
          <RoleProtectedRoute allowedRoles={["pawrent"]}>
            <Loyalty />
          </RoleProtectedRoute>
        }
      />

      {/* SITTER ROUTES */}
      <Route
        path="/sitter-dashboard"
        element={
          <RoleProtectedRoute allowedRoles={["sitter"]}>
            <SitterDashboard />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/sitter-bookings"
        element={
          <RoleProtectedRoute allowedRoles={["sitter"]}>
            <SitterBookings />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/sitter-monitoring"
        element={
          <RoleProtectedRoute allowedRoles={["sitter"]}>
            <SitterMonitoring />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/earnings"
        element={
          <RoleProtectedRoute allowedRoles={["sitter"]}>
            <Earnings />
          </RoleProtectedRoute>
        }
      />

      {/* SHARED ROUTES */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />

      <Route 
        path="/sitter-reviews" 
        element={
          <ProtectedRoute>
            <SitterReviews />
          </ProtectedRoute>
        } 
      />

    </Routes>
  )
}

export default App