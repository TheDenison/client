import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { FiHome, FiClipboard, FiMoreHorizontal } from "react-icons/fi";
import { FaRegUser, FaChartBar, FaTasks } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";

import "/src/styles/Sidebar.css";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Хук отслеживания состояния слайдера
  const navigate = useNavigate();
  const location = useLocation(); // Для получения текущего пути

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  /* Иконки для списка сайд бара*/
  const menuItems = [
    { icon: <FiHome />, label: "Главная", path: "/home" },
    { icon: <FaChartBar />, label: "Чарты", path: "/chart" },
    { icon: <FiClipboard />, label: "Дашборды", path: "/dashboard" },
    { icon: <IoDocumentOutline />, label: "Документация", path: "/doc" },
    { icon: <FaTasks />, label: "Мои задачи", path: "/tasks" },
    { icon: <FiMoreHorizontal />, label: "Разное", path: "/other" },
    { icon: <FaRegUser />, label: "Учётная запись", path: "/profile" },
  ];

  // Переход по ссылкам в сайд баре
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    // Сайд бар
    <div className={`sidebar-wrapper ${isOpen ? "open" : "closed"}`}>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? "⟨" : "⟩"}
        </button>

        {/* Меню сайд бара */}
        <ul className="menu-items">
          {menuItems.slice(0, -1).map((item, index) => {
            const isActive = location.pathname === item.path; // Проверяем активность текущего элемента
            return (
              <li
                key={index}
                className={`menu-item ${isActive ? "active" : ""}`}
                onClick={() => handleNavigation(item.path)}
              >
                {item.icon}
                {isOpen && <span className="menu-label">{item.label}</span>}
              </li>
            );
          })}
          <li
            className="menu-item fixed-bottom"
            onClick={() =>
              handleNavigation(menuItems[menuItems.length - 1].path)
            }
          >
            {menuItems[menuItems.length - 1].icon}
            {isOpen && (
              <span className="menu-label">
                {menuItems[menuItems.length - 1].label}
              </span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
