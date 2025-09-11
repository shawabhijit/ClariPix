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
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react"
import History from "./pages/History"
import ImageBgRemover from "./pages/BgRemove"
import ResultPage from "./pages/ResultPage"
import ImageUpscale  from "./pages/ImageUpscale"
import UpscaleResult from "./pages/UpscaleResult"
import ImageFormatter from "./pages/ImageFormatter"
import RemoveText from "./pages/RemoveText"
import { useContext, useEffect } from "react"
import { AppContext } from "./context/AppContext"

function App() {

  const appContext = useContext(AppContext);
  const nitroCount = appContext?.getUserNitroCount;

  useEffect(() => {
    nitroCount && nitroCount();
    //console.log("Nitro count called from app.tsx " + appContext?.nitro);
  } ,[appContext, nitroCount])

  return (
    <>
      <div>
        <UserSyncHandler />
        <Navbar />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#000",
              color: "#fff",          
              borderRadius: "12px",
              padding: "12px 18px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              fontSize: "14px",
              fontWeight: "500",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/editor" element={
            <>
              <SignedIn>
                <EditorPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route path="/ai_image" element={
            <>
              <SignedIn>
                <AiImageGeneretor />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route path="/history" element={
            <>
              <SignedIn>
                <History />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route path="/remove-bg" element={
            <>
              <SignedIn>
                <ImageBgRemover />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route path="/change-background" element={
            <>
              <SignedIn>
                <ImageBgRemover />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route path="/image-upscale" element={
            <>
              <SignedIn>
                <ImageUpscale />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route path="/remove-text" element={
            <>
              <SignedIn>
                <RemoveText />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route path="/convert-formate" element={
            <>
              <SignedIn>
                <ImageFormatter />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route path="/ai/result" element={
            <>
              <SignedIn>
                <ResultPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route path="/ai/upscale-result" element={
            <>
              <SignedIn>
                <UpscaleResult />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />

          
        </Routes>
        
        <Footer />
      </div>
    </>
  )
}

export default App
