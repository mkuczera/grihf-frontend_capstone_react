import React, { useState, useEffect } from "react";
//Apply css according to your design theme or css that has been given to you in week 2 lab 2
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./Login.css";
import { Input } from "../Input";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name: name,
        email: email,
        password: password,
      }),
    });
    const json = await res.json();
    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);

      sessionStorage.setItem("email", email);
      navigate("/");
      window.location.reload();
    } else {
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

  return (
    <div class="container" style={{ marginTop: "5%" }}>
      <div class="login-grid">
        <div class="login-text">
          <h1>Login</h1>
        </div>
        <div class="login-text">
          Are you a new member?{" "}
          <span>
            <Link to={"/signup"} style={{ color: "#2190FF" }}>
              {" "}
              Sign Up Here
            </Link>
          </span>
        </div>
        <div class="login-form">
          <form onSubmit={login}>
            <div class="form-group">
              <Input
                label={"Email"}
                type="email"
                id="email"
                required
                placeholder="Enter your email"
                aria-describedby="helpId"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="form-group">
              <Input
                label={"Password"}
                type="password"
                id="password"
                required
                placeholder="Enter your password"
                aria-describedby="helpId"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="btn-group">
              <button type="submit">Submit</button>
              <button type="reset" class="button--destructive">
                Reset
              </button>
              <button class="button--ghost">Forgot password?</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
