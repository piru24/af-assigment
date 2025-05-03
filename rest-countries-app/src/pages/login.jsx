import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setMsg("Login successful");
      navigate("/");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login failed");
    }
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
            Sign in to LMS
          </h2>
        </div>
        <input
          className="p-3 rounded-lg border-2 border-[#1847a7] bg-[#f4f8fd] font-medium focus:outline-none focus:ring-2 focus:ring-[#1847a7] transition"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          className="p-3 rounded-lg border-2 border-[#1847a7] bg-[#f4f8fd] font-medium focus:outline-none focus:ring-2 focus:ring-[#1847a7] transition"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="w-full py-3 mt-2 rounded-lg bg-[#1847a7] text-white font-bold text-lg border-2 border-[#1847a7] shadow-[4px_4px_0px_#1847a7] hover:bg-[#2563eb] transition"
        >
          Login
        </button>
        {msg && (
          <div className="text-center text-red-500 font-semibold mt-2">{msg}</div>
        )}
        <div className="text-center text-[#1847a7] mt-2 text-base">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-[#1847a7] font-bold underline hover:text-[#2563eb] transition"
          >
            Create
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
