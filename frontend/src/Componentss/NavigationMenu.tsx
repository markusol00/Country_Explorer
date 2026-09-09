import { Link, Links } from "react-router";
import "./NavigationMenu.css";
function NavigationMenu() {
  return (
    <div className="navigationmenu">
      <nav>
        <ul>
          <li>
            <Link to="/countries">Land</Link>
          </li>
          <li>
            <Link to="/countries">Mine land</Link>
          </li>
          <li>
            <Link to="/countries">Dashbord</Link>
          </li>
          <li>
            <Link to="/countries">Profil</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default NavigationMenu;
