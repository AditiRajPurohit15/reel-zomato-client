import { useRef } from "react";

const AuthLayout = ({ children }) => {
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE BRAND */}
      <div 
        className="hidden md:block w-1/2 relative cursor-pointer"
        onClick={handlePlay}
      >

        {/* VIDEO */}
        <video
          ref={videoRef}
          src="/cat.mp4"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

      </div>

      {/* ORANGE DIVIDER */}
      <div className="hidden md:block w-[50px] bg-orange-500"></div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-[#bcbbbd]">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;