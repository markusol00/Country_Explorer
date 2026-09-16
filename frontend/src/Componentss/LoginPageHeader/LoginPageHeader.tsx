import { Link } from "react-router";
import loginPagePhoto from "../../assets/country_explorer-logo.png";
import "./LoginPageHeader.css";
function LoginPageHeader() {
  return (
    <div>
      <nav className="loginPageMenu">
        <Link to={"/"}>
          <img
            src={loginPagePhoto}
            alt="Country Explorer logo"
            className="headerLogo"
          />
        </Link>
        <ul>
          <li>
            <Link to={"/countries"} className="loginPage-menuButton">
              Land
            </Link>
          </li>
          <li>
            <Link to={"/about"} className="loginPage-menuButton">
              Om appen
            </Link>
          </li>
          <li>
            <Link to={"/countries"} className="loginPage-menuButton">
              Demo login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default LoginPageHeader;
