import { Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import LandingPage from "./pages/LandingPage"
import { Route } from "react-router-dom"
import Footer from "./Components/Footer"
import { Toaster } from "react-hot-toast"
import UserSyncHandler from "./context/UserSyncHandler"
// import DesignEditor from "./Components/Editor"
// import CaseComponent from "./Editor/CaseComponent"
import EditorPage from "./pages/EditorPage"
import AiImageGeneretor from "./pages/AiImageGeneretor"

function App() {

  return (
    <>
      <div>
        <UserSyncHandler />
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/ai_image" element={<AiImageGeneretor />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
