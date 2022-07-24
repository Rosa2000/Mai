import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import SideMenu from "./partials/nav/SideMenu";
import {
  adminMenuItems,
  customerMenuItems,
  staffMenuItems,
} from "./partials/nav/rolesRoute";

const Dashboard = (props) => {
  const [inactive, setInactive] = useState(false);
  const role = props.role;
  const { user: currentUser } = useSelector((state) => state.auth);
  let menuItems;
  if (!currentUser) return <Redirect to="/login" />;
  switch (role) {
    case "ADMIN":
      menuItems = adminMenuItems;
      break;
    case "NV":
      menuItems = staffMenuItems;
      break;
    default:
      menuItems = customerMenuItems;
  }

  return (
    <>
      <SideMenu
        logout={props.logOut}
        onCollapse={(inactive) => {
          setInactive(inactive);
        }}
        menuItems={menuItems}
      />

      <div className={`container-dashboard ${inactive ? "inactive" : ""}`}>
        {menuItems.map((menu, index) => (
          <>
            {!menu.subMenus && (
              <Route key={menu.name} path={menu.to}>
                {menu.component}
              </Route>
            )}

            {menu.subMenus && menu.subMenus.length > 0
              ? menu.subMenus.map((subMenu, i) => (
                  <Route
                    // exact={true}
                    key={subMenu.name}
                    path={subMenu.to}
                    // component={subMenu.component}
                  >
                    {/* {subMenu.component} */}
                    {subMenu.component}
                  </Route>
                ))
              : null}
          </>
        ))}
      </div>
    </>
  );
};
export default Dashboard;
