import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmailSent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  // Guard: if someone lands here directly without state, send them back
  if (!email) {
    navigate("/register", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBFAF7] px-4">
      <div className="w-full max-w-md">
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

        <div className="bg-white border border-[#E8E6DF] rounded-2xl shadow-sm p-8 text-center">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-[#20808D]/10 flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-7 h-7 text-[#20808D]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-[#1F1F1F] mb-2">
            Check your email
          </h1>
          <p className="text-sm text-[#6B6B65] mb-1">
            We've sent a verification link to
          </p>
          <p className="text-sm font-medium text-[#1F1F1F] mb-6">{email}</p>

          <p className="text-xs text-[#A3A199] mb-6">
            Didn't get the email? Check your spam folder, or resend it below.
          </p>

          <a
            href="/login"
            className="text-sm text-[#20808D] font-medium hover:underline"
          >
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailSent;
