import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload(); // optional but ensures token reset
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 px-6">

      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 text-center mb-6">
        Welcome to Our Store 🛍️
      </h1>

      {/* Description */}
      <p className="text-center text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
        Discover premium quality products at unbeatable prices.
        Shop the latest trends and enjoy a seamless, secure shopping experience.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap justify-center gap-6">

        <Link
          to="/products"
          className="bg-black text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-gray-800 hover:scale-105 transition duration-300"
        >
          View Products
        </Link>

        {!token && (
          <>
            <Link
              to="/login"
              className="bg-white text-black px-8 py-3 rounded-xl text-lg font-semibold shadow-md border hover:bg-gray-100 hover:scale-105 transition duration-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-gray-200 text-black px-8 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-gray-300 hover:scale-105 transition duration-300"
            >
              Register
            </Link>
          </>
        )}

        {token && (
          <>
            <Link
              to="/profile"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 hover:scale-105 transition duration-300"
            >
              My Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-red-700 hover:scale-105 transition duration-300"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default Home;