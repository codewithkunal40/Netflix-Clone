import React from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { API_END_POINT } from "../utils/constant";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from "../redux/movieSlice";

const Header = () => {
  const user = useSelector((store) => store.app.user);
  const toggle = useSelector((store) => store.movie.toggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`);
      if (res.data.success) {
        toast.success(res.data.message);
      }
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleHandler = () => {
    dispatch(setToggle());
  };

  return (
    <>
      {/* ✅ Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50 
                      bg-black/80 backdrop-blur-md 
                      border-b border-gray-800">
        <div className="flex items-center justify-between 
                        px-4 py-3 sm:px-6 md:px-10">

          {/* ✅ Logo */}
          <img
            className="w-28 sm:w-36 md:w-44 lg:w-52 object-contain cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
            alt="netflix-logo"
            onClick={() => navigate("/")}
          />

          {/* ✅ User Section */}
          {user && (
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Name */}
              <div className="flex items-center gap-1 sm:gap-2">
                <IoIosArrowDropdown className="text-white text-lg sm:text-xl" />
                <h1 className="text-white text-sm sm:text-base md:text-lg font-medium">
                  {user.fullName}
                </h1>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={toggleHandler}
                  className="bg-red-700 hover:bg-red-800 transition 
                             text-white text-xs sm:text-sm 
                             px-3 py-1.5 sm:px-4 sm:py-2 rounded"
                >
                  {toggle ? "Home" : "Search Movie"}
                </button>

                <button
                  onClick={logoutHandler}
                  className="bg-gray-700 hover:bg-gray-800 transition 
                             text-white text-xs sm:text-sm 
                             px-3 py-1.5 sm:px-4 sm:py-2 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Spacer (Prevents Content From Going Under Header) */}
      <div className="h-[64px] sm:h-[72px] md:h-[80px]" />
    </>
  );
};

export default Header;
