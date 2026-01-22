import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import { useAuth } from "../Context/AuthContext";
import AuthLayout from "../Components/AuthLayout";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { username, password });
      login(response.data.user);
      toast.success("Logged in successfully");
      navigate("/leads");
    } catch (err) {
      toast.error("Invalid username or password");
    }
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Sign in to manage your leads"
      footer={
        <>
          New user?{" "}
          <Link to="/register" style={{ color: "#2575fc", fontWeight: 600 }}>
            Register here
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

        <button className="auth-btn">Login</button>
      </form>
    </AuthLayout>
  );
}
