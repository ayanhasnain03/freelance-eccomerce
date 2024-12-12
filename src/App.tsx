import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Toaster} from "react-hot-toast"
import axios from "axios";
import Nav from "./components/shared/Navbar/Nav";
import Loader from "./components/shared/Loader/Loader";
import Cart from "./pages/Cart";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducers/userReducer";
import AuthTabs from "./pages/auth/Auth";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Dashboard from "./pages/dashbaord/Dashboard";
import Profile from "./pages/auth/Profile";
import Shipping from "./pages/Shipping";

const Home = lazy(() => import("./pages/Home"));
const Collection = lazy(() => import("./pages/Collection"));
const ProductPage = lazy(() => import("./pages/ProductPage"));

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector(
    (state: any) => state.user
  );

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/profile", {
        withCredentials: true,
      })
      .then((res) => dispatch(userExist(res.data.user)))
      .catch(() => dispatch(userNotExist()));
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <>
      <BrowserRouter>
        <Nav user={user} />
        <Suspense fallback={<Loader />}>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collection />} />
            <Route path="/collections/item/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/shipping" element={<Shipping />} />

            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                />
              }
            >
              <Route path="/auth" element={<AuthTabs />} />
            </Route>

            <Route
              element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/profile" element={<Profile />} />
            </Route>


            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute
                  isAdmin={user?.role === "admin"}
                />
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

          </Routes>

        </Suspense>
        <Toaster position="bottom-center"/>
      </BrowserRouter>
    </>
  );
};

export default App;
