import { Link, useNavigate } from "react-router";
import loginPagePhoto from "../assets/loginPage-photo.png";
import "./LoginPage.css";
import LoginPageHeader from "../Componentss/LoginPageHeader/LoginPageHeader";
import LoginForm from "../Componentss/LoginForm/LoginForm";

function LoginPage() {
  const navigate = useNavigate();
  async function clickDemo() {
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
      if (!response.ok) {
        console.error("Demo login failed");
        return;
      }
      const data = await response.json();
      sessionStorage.setItem("accessToken", data.accessToken);
      navigate("/mycountries");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <LoginPageHeader />
      <section className="main-section">
        <article className="login-content">
          <div className="intro-section">
            <h1>Plan your journeys!</h1>

            <p>
              Country Explorer helps you keep track of the countries you want to
              visit, plan your trips, or review countries you've already
              visited.
            </p>

            <div className="login-buttons">
              <button
                type="button"
                className="demo-login-button"
                onClick={clickDemo}
              >
                Demo login
              </button>

              <Link to="/countries" className="show-countries-button">
                Show countries
              </Link>
            </div>
          </div>

          <div className="login-container">
            <LoginForm />
          </div>
        </article>

        <img
          className="login-photo"
          src={loginPagePhoto}
          alt="Train in front of the mountains near Grindelwald, Switzerland"
        />
      </section>
    </div>
  );
}

export default LoginPage;
