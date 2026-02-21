import React from "react";
import useMovieById from "../hooks/useMovieById";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId, bool }) => {
  const trailerMovie = useSelector((store) => store.movie.trailerMovie);

  useMovieById(movieId);

  if (!trailerMovie?.key) return null;

  return (
    <div
      className={`
        relative
        w-full
        ${bool ? "max-w-5xl mx-auto px-4" : "w-screen"}
      `}
    >
      <div className="relative pt-[56.25%]">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-md"
          src={`https://www.youtube.com/embed/${trailerMovie.key}?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&modestbranding=1`}
          title="Movie Trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoBackground;
