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
        <h1>Register </h1>
        <p>Please fill out this form to make an account </p>
        <section className="nameSection">
          <div className="register-inputfield">
            <label>First name:</label>
            <input type="text" onChange={handleFirstNameChange} />
          </div>
          <div className="register-inputfield">
            <label>Last name:</label>
            <input type="text" onChange={handleLastNameChange} />
          </div>
        </section>
        <div className="register-inputfield">
          <label>E-mail:</label>
          <input type="text" onChange={handleMailChange} />
        </div>
        <div className="register-inputfield">
          <label>Password:</label>
          <input type="password" onChange={handlePasswordChange} />
        </div>
        <button type="button" onClick={handleRegister}>
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
