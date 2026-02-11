import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing"
import Home from "./pages/home"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}
