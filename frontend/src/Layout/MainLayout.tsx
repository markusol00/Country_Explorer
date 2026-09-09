import { Outlet } from "react-router";
import NavigationMenu from "../Componentss/NavigationMenu";
import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="main-layout">
      <NavigationMenu />
      <Outlet />
    </div>
  );
}
export default MainLayout;
