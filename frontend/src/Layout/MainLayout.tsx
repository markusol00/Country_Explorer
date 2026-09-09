import { Outlet } from "react-router";
import NavigationMenu from "../Componentss/NavigationMenu";

function MainLayout() {
  return (
    <>
      <NavigationMenu />
      <Outlet />
    </>
  );
}
