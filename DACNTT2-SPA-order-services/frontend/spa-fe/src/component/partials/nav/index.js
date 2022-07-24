import React, { Fragment } from "react";
import SideBar from "./Sidebar";
const IndexNav = ({ onClick: ClickToAddEvent, onClick2, onClick3 }) => {
  // const [toggle, setToggle] = useState("");
  // const onClick = (name) => setToggle(toggle === name ? "" : name);
  return (
    <Fragment>
      <SideBar onClick={() => onClick2()} onClick3={() => onClick3()} />
    </Fragment>
  );
};

export default IndexNav;
