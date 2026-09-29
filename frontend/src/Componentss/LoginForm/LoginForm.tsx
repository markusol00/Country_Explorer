import "./LoginForm.css";
import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";

function LoginForm() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //
  function handleUsernameChange(event) {
    setMail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleLogin() {
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
      console.log("Status:", response.status);

      if (!response.ok) {
        console.log("Wrong email or password");
        return;
      }
      const data = await response.json();
      console.log("Login successful:", data);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form className="login">
        <h2>Login</h2>
        <label htmlFor="Username">Email:</label>
        <input
          value={mail}
          onChange={handleUsernameChange}
          className="inputfield"
        ></input>
        <label htmlFor="Username" className="password-field">
          Password:
        </label>
        <input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          className="inputfield"
        ></input>
        <button onClick={handleLogin}>
          <Link to="/dashboard">Login</Link>
        </button>
      </form>
    </>
  );
}
export default LoginForm;
