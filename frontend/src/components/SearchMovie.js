import React, { useState } from "react";
import axios from "axios";
import { SEARCH_MOVIE_URL, options } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from "../redux/searchSlice";
import { setLoading } from "../redux/userSlice";
import MovieList from "./MovieList";

const SearchMovie = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.app.isLoading);
  const { movieName, searchedMovie } = useSelector(
    (store) => store.searchMovie,
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!searchMovie.trim()) return;

    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`,
        options,
      );

      const movies = res?.data?.results;
      dispatch(setSearchMovieDetails({ searchMovie, movies }));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }

    setSearchMovie("");
  };

  return (
    <div className="w-full min-h-screen bg-black">
      <div
        className="
          flex justify-center
          pt-24
          sm:pt-28
          md:pt-32
          px-4
        "
      >
        <form
          onSubmit={submitHandler}
          className="
            w-full
            sm:w-[90%]
            md:w-[70%]
            lg:w-[50%]
          "
        >
          <div
            className="
              flex items-center
              gap-2
              shadow-md
              border border-gray-700
              bg-black
              rounded-lg
              px-3 py-2
            "
          >
            <input
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
              type="text"
              placeholder="Search Movies..."
              className="
                flex-1
                bg-transparent
                text-white
                outline-none
                text-sm
                sm:text-base
                md:text-lg
                placeholder-gray-400
              "
            />

            <button
              type="submit"
              className="
                bg-red-700
                hover:bg-red-800
                text-white
                px-3 py-1.5
                sm:px-4 sm:py-2
                text-sm sm:text-base
                rounded-md
                transition
              "
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6">
        {searchedMovie && searchedMovie.length > 0 ? (
          <MovieList
            title={movieName}
            searchMovie={true}
            movies={searchedMovie}
          />
        ) : (
          <h1
            className="
              text-center
              text-gray-400
              mt-10
              text-sm
              sm:text-base
              md:text-lg
            "
          >
            Search for a movie to see results 🎥
          </h1>
        )}
      </div>
    </div>
  );
};

export default SearchMovie;
