import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetProductById, SetAuthToken } from "../Api";

const Productid = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) SetAuthToken(token);

        const data = await GetProductById(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQty = () => setQuantity((prev) => prev + 1);

  const decreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to cart`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold animate-pulse">
          Loading product...
        </h2>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl text-red-500 font-semibold">
          Product not found
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-blue-600 font-medium hover:underline"
      >
        ← Back to Products
      </button>

      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* Product Image */}
        <div className="relative group">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[450px] object-cover rounded-2xl group-hover:scale-105 transition duration-500"
          />

          <button
            onClick={toggleFavorite}
            className="absolute top-5 right-5 bg-white p-3 rounded-full shadow-md text-2xl hover:scale-110 transition"
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            {product.title}
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-6">
            <span className="text-3xl font-bold text-black">
              ${product.price}
            </span>
            <span className="ml-3 text-green-600 font-medium">
              In Stock
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border rounded-xl overflow-hidden">
              <button
                onClick={decreaseQty}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
              >
                −
              </button>

              <span className="px-6 py-2 text-lg font-semibold">
                {quantity}
              </span>

              <button
                onClick={increaseQty}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white py-4 rounded-2xl text-lg font-semibold hover:bg-gray-800 hover:shadow-xl transition duration-300"
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productid;