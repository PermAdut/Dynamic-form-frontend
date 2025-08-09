import { Route, Routes } from "react-router"
import Page404 from "./pages/Page404/Page404"

function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  )
}

export default App
