const AuthLayout = ({ children }) => {

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE BRAND */}
      <div className="hidden md:block w-1/2 relative">

  {/* VIDEO */}
  <video
  src="/cat.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
/>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/40" />

  {/* TEXT OVER VIDEO
  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-white text-5xl font-bold">
      ReelBite 🍔
    </h1>
  </div> */}

</div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;