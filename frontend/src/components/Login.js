import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.app.isLoading);

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };

  const getInputData = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    if (isLogin) {
      // LOGIN
      const user = { email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/login`, user, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (res.data.success) {
          toast.success(res.data.message);
          dispatch(setUser(res.data.user));
          navigate("/browse");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      // REGISTER
      const user = { fullName, email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/register`, user, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (res.data.success) {
          toast.success(res.data.message);
          setIsLogin(true);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed");
      } finally {
        dispatch(setLoading(false));
      }
    }

    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="relative min-h-screen w-full">
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="banner"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Centered Form Container */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={getInputData}
          className="
            w-full
            max-w-md
            bg-black/80
            backdrop-blur-md
            rounded-lg
            px-6 py-8
            sm:px-8 sm:py-10
            shadow-lg
          "
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            {isLogin ? "Login" : "Signup"}
          </h1>

          <div className="flex flex-col space-y-4">
            {!isLogin && (
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="Full Name"
                className="p-3 sm:p-4 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-600"
              />
            )}

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="p-3 sm:p-4 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-600"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="p-3 sm:p-4 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-600"
            />

            <button
              type="submit"
              className="
                bg-red-600
                hover:bg-red-700
                transition
                p-3 sm:p-4
                text-white
                font-semibold
                rounded
                mt-2
              "
            >
              {isLoading ? "Logging In..." : isLogin ? "Login" : "Signup"}
            </button>

            <p className="text-gray-300 text-sm sm:text-base text-center">
              {isLogin
                ? "New to Netflix?"
                : "Already have an account?"}
              <span
                onClick={loginHandler}
                className="ml-2 text-blue-400 cursor-pointer hover:underline"
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
