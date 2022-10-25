import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Navbar.css";
import SearchLogo from "./SearchLogo.svg";

const Navbar = () => {
  const [show, setShow] = useState(false);

  //hook useEffect xu ly su kien cuon
  useEffect(() => {
    //su kien scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    //cleanup
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  //ham chuyen trang chu
  const handlerHome = () => {
    window.location.replace("/");
  };

  //ham chuyen trang tim kiem
  const handlerSearch = () => {
    window.location.replace("/search");
  };

  //render
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <h2 className="nav__logo" onClick={handlerHome}>
        Movie App
      </h2>
      <img
        className="nav__search"
        src={SearchLogo}
        alt="Search"
        onClick={handlerSearch}
      />
    </div>
  );
};

export default Navbar;
