import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Toaster} from "react-hot-toast"
import axios from "axios";

import Loader from "./components/shared/Loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducers/userReducer";

import ProtectedRoute from "./components/shared/ProtectedRoute";
import Nav from "./components/shared/Navbar/Nav";






const Home = lazy(() => import("./pages/Home"));
const Collection = lazy(() => import("./pages/Collection"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Profile = lazy(() => import("./pages/auth/Profile"));
const WishList = lazy(() => import("./pages/WishList"));

const AuthTabs = lazy(() => import("./pages/auth/Auth"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const Dashboard = lazy(() => import("./pages/dashbaord/Dashboard"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Orders = lazy(() => import("./pages/dashbaord/Orders"));
const Graph = lazy(() => import("./pages/dashbaord/Graph"));
const Footer = lazy(() => import("./components/shared/Footer"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const ProductDashboardCreate = lazy(() => import("./pages/dashbaord/ProductCreate"));
const CategoryManagement = lazy(() => import("./pages/dashbaord/CategoryManagement"));
const CreateCategoryPage = lazy(() => import("./pages/dashbaord/CreateCategoryPage"));
const App = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector(
    (state: any) => state.user
  );

  useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_SERVER}/api/v1/user/profile`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("User Profile:", res.data); 
      dispatch(userExist(res.data.user));
    })
    .catch((error) => {
      console.error("Error fetching profile:", error?.response?.data?.message); 
      dispatch(userNotExist());
    });
  
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <>
      <BrowserRouter>
        <Nav user={user} />
        <Suspense fallback={<Loader />}>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/collections/womens" element={<Collection forWhat={"womens"}  />} />
            <Route path="/collections/mens" element={<Collection forWhat={"mens"}  />} />
            <Route path="/collections/kids" element={<Collection forWhat={"kids"}  />} />
            <Route path="/collections/item/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />

            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                />
              }
            >
              <Route path="/auth" element={<AuthTabs />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
            </Route>

            <Route
              element={<ProtectedRoute isAuthenticated={isAuthenticated} redirect="/auth" />}
            >
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/wishlist" element={<WishList />} />
            <Route path="/cart/shipping" element={<Shipping />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/order/:id" element={<OrderPage />} />

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
              <Route path="/dashboard/orders" element={<Orders />} />
              <Route path="/dashboard/graphs" element={<Graph />} />
              <Route path="/dashboard/categories" element={<CategoryManagement />} />
              <Route path="/dashboard/categories/create" element={<CreateCategoryPage />} />
              <Route path="/dashboard/product/create" element={<ProductDashboardCreate />} />
              
            </Route>
<Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer/>

        </Suspense>
        <Toaster position="bottom-center"/>
      </BrowserRouter>
    </>
  );
};

export default App;
