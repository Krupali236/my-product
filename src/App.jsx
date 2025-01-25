import "./App.css";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./components/Cart";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home />
        </>
      ),
    },
    {
      path: "/cart/:id",
      element: (
        <>
          <Cart />
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      {/* <Home /> */}
    </>
  );
}

export default App;
