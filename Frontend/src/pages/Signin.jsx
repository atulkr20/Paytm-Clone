import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/signin",
        {
          email,     
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", res.data.token); // save token
      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signin failed. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-xl shadow-sm p-6 space-y-4">
        <Heading label="Sign in" />
        <SubHeading label="Enter your credentials to access your account" />

        <InputBox
          placeholder="atul@gmail.com"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          placeholder="123456"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="pt-2">
          <Button label="Sign in" onClick={handleSignin} />
        </div>

        <BottomWarning
          label="Don't have an account?"
          buttonText="Sign up"
          to="/signup"
        />
      </div>
    </div>
  );
};
