import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // centralized API instance
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");   
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await api.post("/user/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-xl shadow-sm p-6 space-y-4">
        <Heading label="Sign up" />
        <SubHeading label="Enter your information to create an account" />
        <InputBox
          placeholder="Atul"
          label="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputBox
          placeholder="Jha"
          label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputBox
          placeholder="atul@gmail.com"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}   
        />
        <InputBox
          placeholder="123456"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="pt-2">
          <Button
            onClick={handleSignup}
            label={loading ? "Signing up..." : "Sign up"}
          />
        </div>
        <BottomWarning
          label="Already have an account?"
          buttonText="Sign in"
          to="/signin"
        />
      </div>
    </div>
  );
};
