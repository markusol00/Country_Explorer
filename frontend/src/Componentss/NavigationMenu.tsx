import { Link, NavLink } from "react-router";
import "./NavigationMenu.css";
import { useNavigate } from "react-router";

function NavigationMenu() {
  const navigate = useNavigate();
  async function handleLogOut() {
    try {
      const response = await fetch(`http://localhost:3000/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        console.error("Logout failed");
        return;
      }
      sessionStorage.removeItem("accessToken");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="navigationmenu">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/countries"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Countries
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mycountries"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              My countries
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/countries"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/countries"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Profile
            </NavLink>
          </li>
          <button className="logout-button" onClick={handleLogOut}>
            Sign out!
          </button>
        </ul>
      </nav>
    </div>
  );
}
export default NavigationMenu;
