import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { LandingPage } from "./components/Landing_Page/LandingPage";
import { SignUp } from "./components/Sign_Up/SignUp";
import { Login } from "./components/Login/Login";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Navbar />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
