import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./styles/style.scss";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import Error from "./pages/Error/Error";
import Layout from "./components/Layout/Layout";
import Product from "./pages/Product/Product";
import Auth from "./components/Layout/Auth";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddProduct from "./pages/AddProduct/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path:'/product/:id',
        element:<Product/>
      },
      {
        path:"/add_product",
        element:<AddProduct/>
      }
    ],
  },
  {
    path:"/auth",
    element:<Auth/>,
    children:[
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      }
    ]
  },
  {
    path: "*",
    element: <Error />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
