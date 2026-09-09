import { Link, Links } from "react-router";

function NavigationMenu() {
  return (
    <div>
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
        <h1>Logo</h1>
        <h1>Land</h1>
        <h1>Mine land</h1>
        <h1>Dashbord</h1>
        <h1>Logg ut</h1>
      </nav>
    </div>
  );
}
export default NavigationMenu;
