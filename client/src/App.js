import React, { Suspense, lazy, useEffect } from "react";
import "./styled/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "./Pages/Auth/Modal/Modal";
import Loader from "./Shared/Loader/Loader";
import NotFound from "./Pages/NotFound/NotFound";
import { useSelector } from "react-redux";
const Home = lazy(() => import("./Pages/Home/Home"));
const Menu = lazy(() => import("./Pages/Menu/Menu"));
const Shop = lazy(() => import("./Pages/Shop/Shop"));
const ProductDetails = lazy(() =>
  import("./Pages/ProductDetails/ProductDetails")
);
const Wishlist = lazy(() => import("./Pages/Wishlist/Wishlist"));
const Checkout = lazy(() => import("./Pages/Checkout/Checkout"));
const ConfirmOrder = lazy(() => import("./Pages/ConfirmOrder/ConfirmOrder"));
const UserDashboard = lazy(() =>
  import("./Pages/Dashboard/UserDashboard/UserDashboard")
);
const AdminDashboard = lazy(() =>
  import("./Pages/Dashboard/AdminDashboard/AdminDashboard")
);
const MyOrders = lazy(() =>
  import("./Pages/Dashboard/UserDashboard/MyOrders/MyOrders")
);
const UserDashboadIndex = lazy(() =>
  import("./Pages/Dashboard/UserDashboard/Index")
);
const UpdateProfile = lazy(() =>
  import("./Pages/Dashboard/UserDashboard/UpdateProfile")
);
const ChangePassword = lazy(() =>
  import("./Pages/Dashboard/UserDashboard/ChangePassword")
);
const AdminDashboardIndex = lazy(() =>
  import("./Pages/Dashboard/AdminDashboard/Index")
);
const AllProducts = lazy(() =>
  import("./Pages/Dashboard/AdminDashboard/Products/AllProducts")
);
const AllCategory = lazy(() =>
  import("./Pages/Dashboard/AdminDashboard/Categories/AllCategory")
);
const AddProduct = lazy(() =>
  import("./Pages/Dashboard/AdminDashboard/Products/AddProduct")
);
const AddCategory = lazy(() =>
  import("./Pages/Dashboard/AdminDashboard/Categories/AddCategory")
);
const AllOrders = lazy(() =>
  import("./Pages/Dashboard/AdminDashboard/Orders/AllOrders")
);
const AllUsers = lazy(() =>
  import("./Pages/Dashboard/AdminDashboard/Users/AllUsers")
);
const UpdateProduct = lazy(() =>
  import("./Pages/Dashboard/AdminDashboard/Products/UpdateProduct")
);
const UpdateCateogory = lazy(() =>
  import("./Pages/Dashboard/AdminDashboard/Categories/UpdateCategory")
);
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const About = lazy(() => import("./Pages/About/About"));
const AdminProfileUpdate = lazy(() =>
  import("./Pages/Dashboard/AdminDashboard/AdminProfileUpdate")
);
const PrivateOutlet = lazy(() => import("./Shared/PrivateOutlet"));
const AdminOutlet = lazy(() => import("./Shared/AdminRoute"));

function App() {
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {

    let controller = new AbortController();

    if (!user) {
      setTimeout(() => {
        Swal.fire({
          title: "Please don't remove any data, Thank you!",
          icon: "warning",
          showButton: true,
          text: "User: admin@gmail.com & Password: 123456",
        });
      }, 5000);
    }
    return () => controller.abort();
    
  }, []);

  return (
    <>
      {/* <h1>In the name of Alah</h1> */}
      <Router>
        <Modal />
        <Suspense fallback={<Loader />}>
          {/* signup modal */}
          <Routes>
            <Route path="/addCategory" element={<AddCategory />} />
            <Route path="/" element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="shop" element={<Shop />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="/*" element={<PrivateOutlet />}>
              <Route path="checkout" element={<Checkout />} />
              <Route path="confirmOrder" element={<ConfirmOrder />} />
              <Route path="user" element={<UserDashboard />}>
                <Route index element={<UserDashboadIndex />} />
                <Route path="dashboard" element={<UserDashboadIndex />} />
                <Route path="myOrders" element={<MyOrders />} />
                <Route path="updateProfile" element={<UpdateProfile />} />
                <Route path="changePassword" element={<ChangePassword />} />
              </Route>
            </Route>
            <Route path="/*" element={<AdminOutlet />}>
              <Route path="admin" element={<AdminDashboard />}>
                <Route index element={<AdminDashboardIndex />} />
                <Route path="dashboard" element={<AdminDashboardIndex />} />
                <Route path="allProducts" element={<AllProducts />} />
                <Route
                  path="allProducts/updateProduct/:productId"
                  element={<UpdateProduct />}
                />
                <Route path="allCategories" element={<AllCategory />} />
                <Route
                  path="allCategories/updateCategory/:categoryId"
                  element={<UpdateCateogory />}
                />
                <Route path="allUsers" element={<AllUsers />} />
                <Route path="updateProfile" element={<AdminProfileUpdate />} />
                <Route path="allOrders" element={<AllOrders />} />
                <Route path="addProduct" element={<AddProduct />} />
                <Route path="addCategory" element={<AddCategory />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
