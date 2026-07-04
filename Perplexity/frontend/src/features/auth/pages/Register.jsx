import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // Two-way binding: state variables hold the live value of each input
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const { handleRegister, loading, error, user } = useAuth();

  // Single handler for all inputs — uses the input's `name` to update the right field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleRegister(
      formData.username,
      formData.email,
      formData.password,
    );
    if (res) {
      navigate("/verify-email-sent", { state: { email: formData.email } });
    }
  };

  if (user && !loading) {
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBFAF7] px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand mark */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#20808D] flex items-center justify-center">
              <span className="text-white font-semibold text-sm">V</span>
            </div>
            <span className="text-lg font-semibold text-[#1F1F1F] tracking-tight">
              VisionAI
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#E8E6DF] rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-[#1F1F1F] mb-1">
            Create your account
          </h1>
          <p className="text-sm text-[#6B6B65] mb-6">Sign up to get started</p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#1F1F1F] mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E0DED6] bg-[#FBFAF7] text-[#1F1F1F] placeholder-[#A3A199] text-sm focus:outline-none focus:ring-2 focus:ring-[#20808D]/40 focus:border-[#20808D] transition"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#1F1F1F] mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="yourusername"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E0DED6] bg-[#FBFAF7] text-[#1F1F1F] placeholder-[#A3A199] text-sm focus:outline-none focus:ring-2 focus:ring-[#20808D]/40 focus:border-[#20808D] transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#1F1F1F] mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E0DED6] bg-[#FBFAF7] text-[#1F1F1F] placeholder-[#A3A199] text-sm focus:outline-none focus:ring-2 focus:ring-[#20808D]/40 focus:border-[#20808D] transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#20808D] hover:bg-[#1B6E79] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="text-sm text-[#6B6B65] text-center mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#20808D] font-medium hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
