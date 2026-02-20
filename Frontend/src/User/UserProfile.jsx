import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUserProfile } from "../Api";


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await GetUserProfile();
        setUser(data);
      } catch (err) {
        setError("Failed to load profile");
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          My Profile 👤
        </h2>

        <div className="space-y-4 text-gray-700">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold text-lg">{user?.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold text-lg">{user?.email}</p>
          </div>

          {/* Add more fields if available */}
          {/* Example:
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-semibold text-lg">{user?.role}</p>
          </div>
          */}
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-500 text-white py-2 rounded-xl font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;