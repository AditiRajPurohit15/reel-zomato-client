const AuthLayout = ({ children }) => {

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE BRAND */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-yellow-400 to-orange-500 items-center justify-center">
        <h1 className="text-white text-5xl font-bold">
          ReelBite 🍔
        </h1>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;