import PricingTable from "./Components/PricingTable"
import BgRemove from "./pages/BgRemove"

function App() {

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-cyan-700 text-3xl font-bold">
        Hello ClariPix
      </div>
      <BgRemove />
      <PricingTable />
    </>
  )
}

export default App
