import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

type Props = {
  isMobile?: boolean;
  setIsMobile?: (isMobile: boolean) => void;
};

const Navbar: React.FC<Props> = ({ isMobile, setIsMobile }) => {
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    { to: "/", imgSrc: "/images/menu_item1.svg", label: "Аналитика" },
    { to: "/", imgSrc: "/images/menu_item2.svg", label: "Профиль" },
    { to: "/", imgSrc: "/images/menu_item3.svg", label: "Модерация" },
    { to: "/", imgSrc: "/images/menu_item4.svg", label: "Чаты" },
    { to: "/", imgSrc: "/images/menu_item5.svg", label: "Баннеры" },
    { to: "/", imgSrc: "/images/menu_item6.svg", label: "Команда" },
    { to: "/", imgSrc: "/images/menu_item7.svg", label: "Блог" },
    { to: "/", imgSrc: "/images/menu_item8.svg", label: "Курс валют" },
    { to: "/", imgSrc: "/images/menu_item9.svg", label: "Выйти" },
  ];

  return (
    <div
      className={`menu ${showMenu ? "collapsed" : ""} ${
        isMobile ? "mobile" : ""
      }`}
    >
      <div
        className={!showMenu ? "hamburger" : "header_logo"}
        onClick={() => {
          if (isMobile) {
            setIsMobile?.(false);
          } else {
            setShowMenu(!showMenu);
          }
        }}
      ></div>
      <div className="user_info">
        <div className="user_logo"></div>
        <div className="user_data">
          <p>Юрий Тактаков</p>
          <span>Тестировщик</span>
        </div>
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.to}>
              <img src={item.imgSrc} alt="" />
              <p>{item.label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
