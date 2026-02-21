import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, searchMovie = false }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div
      className="
        w-full
        px-3
        sm:px-6
        md:px-10
        lg:px-14
        mb-6
      "
    >
      <h1
        className={`
          ${searchMovie ? "text-black" : "text-white"}
          text-lg
          sm:text-xl
          md:text-2xl
          lg:text-3xl
          font-semibold
          mb-2
        `}
      >
        {title}
      </h1>

      <div
        className="
          flex
          overflow-x-auto
          overflow-y-hidden
          no-scrollbar
          scroll-smooth
          gap-2
          sm:gap-3
          md:gap-4
          pb-2
        "
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieId={movie.id}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
