import { data, Link } from "react-router";
import "./RegisterPage.css";
import { useState } from "react";
import { useNavigate } from "react-router";
function RegisterPage() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleFirstNameChange(event) {
    setFirstname(event.target.value);
  }
  function handleLastNameChange(event) {
    setLastname(event.target.value);
  }
  function handleMailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  async function handleRegister() {
    if (firstName.length >= 30 || lastName.length >= 30) {
      console.log("Firstname or Lastname must be less than 30 characters");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        return;
      }
      console.log("User registered", data);
      navigate("/mycountries");
    } catch (error) {
      console.error("Cound not connect to server:", error);
      return;
    }
  }

  return (
    <div className="outerContainer">
      <form className="formContainer">
        <div className="register-heading">
          <h1>Create an account!</h1>
          <p>Join Country Explorer and start exploring the world!</p>
        </div>

        <section className="nameSection">
          <div className="register-inputfield">
            <label htmlFor="firstName">First name:</label>
            <input
              id="firstname
            "
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>

          <div className="register-inputfield">
            <label>Last name:</label>
            <input
              id="lastname"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
        </section>

        <div className="register-inputfield">
          <label htmlFor="register-email">Email:</label>
          <input
            id="register-email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={handleMailChange}
          />
        </div>

        <div className="register-inputfield">
          <label>Password:</label>
          <input
            id="register-password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          type="button"
          className="register-submit-button"
          onClick={handleRegister}
        >
          Sign up!
        </button>

        <div className="already-having-an-accout-section">
          <p>Already having an account?</p>
          <Link to="/">Log in.</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
