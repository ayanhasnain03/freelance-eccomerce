import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from "./components/shared/Navbar/Nav"
const Home = lazy(() => import("./pages/Home"))
const App = () => {
  return (
    <BrowserRouter>
    <Nav/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
