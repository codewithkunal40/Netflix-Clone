import React from "react";
import { CiPlay1, CiCircleInfo } from "react-icons/ci";

const VideoTitle = ({ title, overview }) => {
  return (
    <div
      className="
        absolute
        top-0 left-0
        w-full
        h-full
        flex flex-col justify-center
        px-4
        sm:px-8
        md:px-16
        lg:px-24
        text-white
        bg-gradient-to-r from-black/80 via-black/40 to-transparent
      "
    >
      <h1
        className="
          font-bold
          text-xl
          sm:text-2xl
          md:text-4xl
          lg:text-5xl
          max-w-xl
        "
      >
        {title}
      </h1>

      <p
        className="
          mt-3
          text-xs
          sm:text-sm
          md:text-base
          lg:text-lg
          max-w-xs
          sm:max-w-md
          md:max-w-lg
          lg:max-w-2xl
          line-clamp-3
          sm:line-clamp-4
          text-gray-200
        "
      >
        {overview}
      </p>

      <div
        className="
          flex
          flex-col sm:flex-row
          gap-3
          mt-5
        "
      >
        <button
          className="
            flex items-center justify-center
            px-5 py-2
            md:px-6 md:py-3
            bg-white text-black
            rounded-md
            font-semibold
            hover:bg-opacity-80
            transition
            w-full sm:w-auto
          "
        >
          <CiPlay1 size={22} />
          <span className="ml-2">Play</span>
        </button>

        <button
          className="
            flex items-center justify-center
            px-5 py-2
            md:px-6 md:py-3
            bg-gray-500/60
            text-white
            rounded-md
            font-semibold
            hover:bg-gray-500/80
            transition
            w-full sm:w-auto
          "
        >
          <CiCircleInfo size={22} />
          <span className="ml-2">Watch More</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
