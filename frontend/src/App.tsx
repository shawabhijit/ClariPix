import { Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import LandingPage from "./pages/LandingPage"
import { Route } from "react-router-dom"
import Footer from "./Components/Footer"
import { Toaster } from "react-hot-toast"
import UserSyncHandler from "./context/UserSyncHandler"

function App() {

  return (
    <>
      <div>
        <UserSyncHandler />
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
