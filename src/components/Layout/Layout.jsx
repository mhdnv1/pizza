import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import userImg from "../../assets/Intersect.png";
import menuIcon from "../../assets/menu-icon.svg";
import cartIcon from "../../assets/cart-icon.svg";
import group from "../../assets/group.svg";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const user = useSelector((state) => state.auth.user );
  console.log(user);
  const dispath = useDispatch()
  const navigate = useNavigate()
  // clear
  const handleLogout = () => {
    // Очищаем данные пользователя и перенаправляем на страницу входа
    dispath(clearUser());
    localStorage.removeItem('user'); // Очищаем данные из localStorage
    navigate('/auth/login');
  };
  return (
    <div className="layout">
      <div className="sidebar">
        <div className="user">
          <img src={userImg} alt="" />
          <div className="name">{user ? user.user.name : <button className="btn"><Link to={'/auth/login'}>Войти</Link></button>}</div>
          <div className="email">{user? user.user.email : ''}</div>
        </div>
        <div className="menu">
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <img src={menuIcon} alt="menu-icon.svg" />
            Menu
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to={"/cart"}
          >
            <img src={cartIcon} alt="" />
            Cart
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to={"/add_product"}
          >
            {/* <img src={cartIcon} alt="" /> */}
            Add Product
          </NavLink>
        </div>
        <button className="exit btn" onClick={handleLogout}>
          <img src={group} alt="" />
          Выход
        </button>
      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
