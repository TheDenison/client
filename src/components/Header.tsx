import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "/src/styles/Header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/upload");
  };

  const handleLogoutClick = () => {
    // Логика выхода
    navigate("/login");
    console.log("Logout clicked");
  };

  return (
    <header className="header">
      <nav className="header_nav">
        <div className="header_logo">
          <a
            href="https://google.ru/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="header_icon"
              src="/assets/image_icon.png"
              alt="Логотип"
            />
          </a>
        </div>
        <ul>
          <li id="catalog">Каталог</li>
          <li id="analytics">Аналитика</li>
          <li id="tasks">Задачи</li>
          <li id="prices">Цены</li>
          <li id="upload" onClick={handleUploadClick}>
            Загрузить
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogoutClick}>
          <FaSignOutAlt className="icon logout-icon" />
          Выход
        </button>
      </nav>
    </header>
  );
};

export default Header;
