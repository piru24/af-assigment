import React, { useRef, useState } from "react";
import api from "../api/api";

const OTP_LENGTH = 6;

const OtpForm = ({ email, onVerified }) => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const inputsRef = useRef([]);

  // Handle input change and auto-advance
  const handleChange = (idx, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  // Handle backspace: move focus to previous if empty
  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  // Paste support
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(paste)) return;
    const pasteArr = paste.split("");
    const newOtp = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < pasteArr.length; i++) {
      newOtp[i] = pasteArr[i];
    }
    setOtp(newOtp);
    inputsRef.current[pasteArr.length - 1]?.focus();
    e.preventDefault();
  };

  // Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", {
        email,
        otp: otp.join(""),
      });
      setMsg(res.data.msg);
      setLoading(false);
      if (onVerified) onVerified();
    } catch (err) {
      setMsg(err.response?.data?.msg || "OTP verification failed");
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    setResending(true);
    setMsg("");
    try {
      await api.post("/auth/register", { email }); // Assuming this triggers resend
      setMsg("OTP resent to your email.");
    } catch (err) {
      setMsg("Failed to resend OTP.");
    }
    setResending(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f4f8fd] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border-2 border-[#1847a7] shadow-[8px_8px_0px_#1847a7] rounded-2xl p-10 flex flex-col gap-8"
      >
        <div className="flex flex-col items-center gap-3">
          <img
            src="https://i.postimg.cc/d3qbx7SW/AyuLogo.png"
            alt="Logo"
            className="w-20 h-20 rounded-full border-4 border-[#1847a7] bg-white shadow"
          />
          <h2 className="text-3xl font-extrabold text-[#1847a7] tracking-tight">
            Verify OTP
          </h2>
          <p className="text-base text-gray-700 text-center">
            Enter the code sent to <span className="font-bold">{email}</span>
          </p>
        </div>
        <div className="flex justify-center gap-3 mt-2" onPaste={handlePaste}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={el => (inputsRef.current[idx] = el)}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(idx, e.target.value.replace(/\D/, ""))}
              onKeyDown={e => handleKeyDown(idx, e)}
              className="w-12 h-14 text-2xl md:text-3xl text-center border-2 border-[#1847a7] rounded-lg bg-[#f4f8fd] shadow-[2px_2px_0px_#1847a7] font-bold focus:outline-none focus:ring-2 focus:ring-[#1847a7] transition"
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={loading || otp.some(d => d === "")}
          className="w-full py-3 mt-2 rounded-lg bg-[#1847a7] text-white font-bold text-lg border-2 border-[#1847a7] shadow-[4px_4px_0px_#1847a7] hover:bg-[#2563eb] transition"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="text-[#1847a7] font-semibold hover:underline text-sm"
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </div>
        {msg && (
          <div className="text-center text-red-500 font-semibold mt-2">{msg}</div>
        )}
      </form>
    </div>
  );
};

export default OtpForm;
