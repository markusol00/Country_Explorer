import "./LoginForm.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

function LoginForm() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("handleLogin kjører!");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: mail,
          password: password,
        }),
      });

      if (!response.ok) {
        console.error("Wrong email or password");
        return;
      }

      const data = await response.json();
      sessionStorage.setItem("accessToken", data.accessToken);
      navigate("/mycountries");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className="login" onSubmit={handleLogin}>
      <h2>Welcome back!</h2>
      <p className="login-description">Log in to continue your adventures.</p>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        value={mail}
        onChange={(event) => setMail(event.target.value)}
        placeholder="Enter your email"
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter your password"
        required
      />

      <button
        type="submit"
        className="login-submit-button"
        onClick={() => console.log("Knappen ble klikket!")}
      >
        Log in
      </button>

      <p className="register-text">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
}

export default LoginForm;
