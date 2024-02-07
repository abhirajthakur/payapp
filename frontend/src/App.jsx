import axios from "axios";
import { useEffect } from "react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import UpdateProfile from "./components/UpdateProfile";
import { userState } from "./store/atoms/user";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  const setUser = useSetRecoilState(userState);

  async function getUser() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/user/me`,
        {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUser(data.user);
    } catch (err) {
      setUser({});
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/updateProfile" element={<UpdateProfile />} />
    </Routes>
  );
}
