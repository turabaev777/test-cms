import React, { useState } from "react";
import "./style.scss";
import Navbar from "../components/navbar/Navbar";
import UserList from "../components/userList/UserList";

const Main: React.FC = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  return (
    <div className="container">
      <Navbar isMobile={isMobileMenu} setIsMobile={setIsMobileMenu} />
      <div className="user_wrapper">
        <UserList isMobile={isMobileMenu} setIsMobile={setIsMobileMenu} />
      </div>
    </div>
  );
};

export default Main;
