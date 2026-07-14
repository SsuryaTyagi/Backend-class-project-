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
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand mark */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <span className="text-[#0A0A0A] font-bold text-sm">V</span>
            </div>
            <span
              className="text-2xl text-[#F5F1E8] tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              VISIONAI
            </span>
          </div>
        </div>

        <div
          className="bg-[#141414] border border-[#2A2A2A] rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.05)] p-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <h1
            className="text-3xl text-[#F5F1E8] mb-1 tracking-wide"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            CREATE YOUR ACCOUNT
          </h1>
          <p className="text-sm text-[#8A8A82] mb-6">Sign up to get started</p>

          {error && (
            <div className="mb-4 text-sm text-[#E8A5A5] bg-[#2A1414] border border-[#4A2020] rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#D4D4CE] mb-1.5"
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
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] text-[#F5F1E8] placeholder-[#5A5A54] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#D4D4CE] mb-1.5"
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
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] text-[#F5F1E8] placeholder-[#5A5A54] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#D4D4CE] mb-1.5"
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
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] text-[#F5F1E8] placeholder-[#5A5A54] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] hover:bg-[#C29D2E] disabled:opacity-60 disabled:cursor-not-allowed text-[#0A0A0A] text-sm font-semibold py-2.5 rounded-lg transition"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="text-sm text-[#8A8A82] text-center mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#D4AF37] font-medium hover:underline"
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