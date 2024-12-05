import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/shared/Navbar/Nav";
import Footer from "./components/shared/Footer/Footer";
import Loader from "./components/shared/Loader/Loader";

const Home = lazy(() => import("./pages/Home"));
const Collection = lazy(() => import("./pages/Collection"));
const App = () => {
  return (
<>
    <BrowserRouter>
      <Nav />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collection />} />
        </Routes>
      <Footer />
      </Suspense>
    </BrowserRouter>
</>
  );
};

export default App;
