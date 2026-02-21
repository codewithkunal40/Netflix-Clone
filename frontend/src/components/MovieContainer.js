import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const MovieContainer = () => {
  const movie = useSelector((store) => store.movie);

  return (
    <div className="bg-black w-full overflow-hidden">
      <div
        className="
          relative z-10
          -mt-24
          sm:-mt-32
          md:-mt-40
          lg:-mt-52
          px-3
          sm:px-6
          md:px-10
          lg:px-14
        "
      >
        <MovieList title={"Popular Movies"} movies={movie.popularMovie} />
        <MovieList
          title={"Now Playing Movies"}
          movies={movie.nowPlayingMovies}
        />
        <MovieList title={"Top Rated Movies"} movies={movie.topRatedMovies} />
        <MovieList title={"Upcoming Movies"} movies={movie.upcomingMovies} />
      </div>
    </div>
  );
};

export default MovieContainer;
