import React, { useState } from "react";
import "./Sign_Up.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { Input } from "../Input";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const register = async (e) => {
    e.preventDefault();
    // API Call
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
      }),
    });
    const json = await response.json();
    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);

      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", email);

      navigate("/");
      window.location.reload();
    } else {
      if (json.errors) {
        for (const error of json.errors) {
          setErrorMessage(error.msg);
        }
      } else {
        setErrorMessage(json.error);
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text">
          Already a member?{" "}
          <span>
            <Link to={"/login"} style={{ color: "#2190FF" }}>
              {" "}
              Login
            </Link>
          </span>
        </div>
        <div className="signup-form">
          <form method="POST" onSubmit={register}>
            <div className="form-group">
              <Input
                label={"Name"}
                id="name"
                required
                placeholder="Enter your name"
                aria-describedby="helpId"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <Input
                label={"Phone"}
                type="tel"
                id="phone"
                required
                placeholder="Enter your phone number"
                aria-describedby="helpId"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <Input
                label={"Email"}
                type="email"
                id="email"
                required
                placeholder="Enter your email"
                aria-describedby="helpId"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={errorMessage}
              />
            </div>
            <div className="form-group">
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
            <div className="btn-group">
              <button type="submit">Submit</button>
              <button type="reset" className="button--destructive">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  //     return (
  //         <div className="container" style={{marginTop:'5%'}}>
  //         <div className="signup-grid">
  //         <div className="signup-form">
  //          <form method="POST" onSubmit={register}>
  //            <div className="form-group">
  //                 <label htmlFor="email">Email</label>
  //                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
  //                  {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
  //                         </div>
  // //apply logic here for other elements such as name, phone and password to take user information
  //          </form>
  //          </div>
  //          </div>
  //          </div>

  //     );
};
