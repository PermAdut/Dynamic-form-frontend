import { Route, Routes } from "react-router"
import Page404 from "./pages/Page404/Page404"
import MainPage from "./pages/MainPage/MainPage"
import CreatePage from "./pages/CreatePage/CreatePage"

function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </>
  )
}

export default App
