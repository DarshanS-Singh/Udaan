import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthUI = () => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", username: "", password: "" });
  const [error, setError] = useState("");

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user", {
        withCredentials: true,
      });

      if (response.data.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
    setAuthChecked(true);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const endpoint = isLogin ? "/user/login" : "/user/register";

    try {
      const response = await axios.post(`http://localhost:4000${endpoint}`, formData, {
        withCredentials: true,
      });
      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/user/logout", { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {user ? (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center space-y-4">
          <div className="mx-auto h-20 w-20 flex items-center justify-center bg-emerald-100 rounded-full text-emerald-500 text-3xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name}!</h2>
          <div className="text-gray-600 bg-gray-50 py-3 rounded-lg border border-gray-100 space-y-1">
            <p><span className="font-semibold text-gray-700">Email:</span> {user.username}</p>
            <p><span className="font-semibold text-gray-700">Role:</span> <span className="uppercase text-xs font-bold text-blue-500 bg-blue-100 px-2 py-0.5 rounded">{user.role}</span></p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 mt-4 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md shadow-blue-500/30 transition-all active:scale-[0.98]"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setFormData({ name: "", username: "", password: "" });
              }}
              className="ml-1 text-blue-600 font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthUI;
