import { Route, Routes } from "react-router"
import Page404 from "./pages/Page404/Page404"
import MainPage from "./pages/MainPage/MainPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  )
}

export default App
