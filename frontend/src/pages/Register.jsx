import { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
<<<<<<< HEAD
import AuthLayout from "../Components/AuthLayout";
=======
>>>>>>> ea674ddd48d3492af205ba5a91a79b7f88fe8628

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, password });
      toast.success("User registered successfully");
      navigate("/leads");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <AuthLayout
      title="Register"
      subtitle="Create your account to start managing leads"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2575fc", fontWeight: 600 }}>
            Login here
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />

        <button className="auth-btn">Register</button>
      </form>
    </AuthLayout>
  );
}
