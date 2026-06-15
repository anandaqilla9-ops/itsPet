import { Routes, Route } from "react-router-dom"

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
import ProtectedRoute from "./components/ProtectedRoute"

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

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
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
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />

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

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/monitoring"
        element={
          <ProtectedRoute>
            <Monitoring />
          </ProtectedRoute>
        }
      />

      <Route path="/verified-sitters" element={<VerifiedSitters />} />

      <Route
        path="/loyalty"
        element={
          <ProtectedRoute>
            <Loyalty />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default App