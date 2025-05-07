import React from "react";

const Merchandise = () => {
  return (
    <div className="relative w-full h-screen bg-black">
      <iframe
        src="https://nextjs.org/" // Replace with your actual URL
        className="absolute top-0 left-0 w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default Merchandise;
