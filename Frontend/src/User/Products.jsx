import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetProducts, SetAuthToken } from "../Api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          SetAuthToken(token);
        }

        const data = await GetProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (product) => {
    setFavorites((prev) =>
      prev.find((item) => item._id === product._id)
        ? prev.filter((item) => item._id !== product._id)
        : [...prev, product]
    );
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert("Added to cart!");
    navigate(`/product/${product._id}`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold animate-pulse">
          Loading Products...
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      
      {/* 🔥 Header Section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Our Products
        </h1>

        <div className="flex items-center gap-6 text-2xl">
          
          {/* ❤️ Favorite Icon */}
          <div className="relative cursor-pointer">
            ❤️
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {favorites.length}
              </span>
            )}
          </div>

          {/* 🛒 Cart Icon */}
          <div className="relative cursor-pointer">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </div>

        </div>
      </div>

      {/* 🛍 Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const isFavorite = favorites.find(
            (item) => item._id === product._id
          );

          return (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 overflow-hidden cursor-pointer relative group"
            >
              {/* ❤️ Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product);
                }}
                className="absolute top-3 right-3 text-2xl z-10"
              >
                {isFavorite ? "❤️" : "🤍"}
              </button>

              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-lg font-bold mb-2 text-gray-800">
                  {product.title}
                </h2>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-black">
                    ${product.price}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;