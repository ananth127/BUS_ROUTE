import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../axios";

const Auth = ({ isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const { setAuthUser } = useContext(AuthContext); // Access setAuthUser from context
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isLogin
        ? await axios.post("/auth/login", { email, password })
        : await axios.post("/auth/signup", { name, email, password, role });

      // Store user data in context and localStorage
      setAuthUser(response.data.user);

      // Redirect to the correct dashboard based on role
      history.push(response.data.user.role === "driver" ? "/driver-dashboard" : "/student-dashboard");
    } catch (err) {
      alert("Error: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div>
            <select onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="driver">Driver</option>
            </select>
          </div>
        )}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
    </div>
  );
};

export default Auth;
