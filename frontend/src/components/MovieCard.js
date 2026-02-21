import React from "react";
import { TMDB_IMG_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getId, setOpen } from "../redux/movieSlice";

const MovieCard = ({ posterPath, movieId }) => {
  const dispatch = useDispatch();

  if (!posterPath) return null;

  const handleOpen = () => {
    dispatch(getId(movieId));
    dispatch(setOpen(true));
  };

  return (
    <div
      onClick={handleOpen}
      className="
        cursor-pointer
        flex-shrink-0
        transition-transform duration-300 ease-in-out
        hover:scale-110
        w-28
        sm:w-32
        md:w-40
        lg:w-48
        xl:w-52
        pr-2
      "
    >
      <img
        src={`${TMDB_IMG_URL}/${posterPath}`}
        alt="movie-banner"
        className="
          w-full
          h-auto
          rounded-md
          object-cover
          shadow-md
        "
      />
    </div>
  );
};

export default MovieCard;
