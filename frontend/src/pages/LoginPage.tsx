import { Link } from "react-router";
import loginPagePhoto from "../assets/loginPage-photo.png";
import "./LoginPage.css";

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
        <section className="main-section">
          <article>
            <h1>Utforsk verden.</h1>
            <h2>Planlegg dine eventyr!</h2>
            <p>
              Country Explorer hjelper deg med å holde oversikt over land du
              ønsker å besøke, planlegger å besøke eller allerede har besøkt.
            </p>
            <Link
              to={"/countries"}
              className={"demo-login-button"}
              onClick={clickDemo}
            >
              Demo login
            </Link>
            <Link to={"/countries"} className="show-countries-button">
              Se Land
            </Link>
            <p>Om appen</p>
          </article>
          <img src={loginPagePhoto} alt="Reisende ved tog i fjellandskap" />
        </section>
      </div>
    </>
  );
}

export default LoginPage;
