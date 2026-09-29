import { Link } from "react-router";
import loginPagePhoto from "../assets/loginPage-photo.png";
import "./LoginPage.css";
import LoginPageHeader from "../Componentss/LoginPageHeader/LoginPageHeader";
import LoginForm from "../Componentss/LoginForm/LoginForm";

function LoginPage() {
  async function clickDemo() {
    //returns a response object
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //Hardcoded values for the demo-user (not a real mail)
          email: "demo@countryexplorer.com",
          password: "demo123",
        }),
      });
      console.log(response);
      console.log("Status:", response.status);
      console.log("OK:", response.ok);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div>
        <LoginPageHeader />
        <section className="main-section">
          <article>
            <h1>Plan your journeys!</h1>
            <p>
              Country Explorer helps you keep track of the countries you want to
              visit, plan your trips, or review countries you've already
              visited.
            </p>
            <div className="login-buttons">
              <Link
                to={"/countries"}
                className={"demo-login-button"}
                onClick={clickDemo}
              >
                Demo login
              </Link>
              <Link to={"/countries"} className="show-countries-button">
                Show countries
              </Link>
            </div>
            <div className="login-container">
              <LoginForm />
              <article className="register-section">
                <h2>Don't have an accout?</h2>
                <Link to={"/register"} className="register-button">
                  Register here!
                </Link>
              </article>
            </div>
          </article>
          <img src={loginPagePhoto} alt="Reisende ved tog i fjellandskap" />
        </section>
      </div>
    </>
  );
}

export default LoginPage;
