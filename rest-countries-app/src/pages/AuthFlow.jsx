// src/components/AuthFlow.jsx
import React, { useState } from "react";
import RegisterForm from "./register";
import OtpForm from "./otp";
import LoginForm from "./login";

const AuthFlow = () => {
  const [step, setStep] = useState("register");
  const [email, setEmail] = useState("");

  return (
    <div className="">
      {step === "login" && (
        <LoginForm onLogin={() => window.location.reload()} />
      )}
      {step === "register" && (
        <RegisterForm onRegistered={e => { setEmail(e); setStep("otp"); }} />
      )}
      {step === "otp" && (
        <OtpForm email={email} onVerified={() => setStep("login")} />
      )}
     
    </div>
  );
};

export default AuthFlow;
