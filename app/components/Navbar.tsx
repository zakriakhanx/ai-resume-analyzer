import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to={"/"}>
        <p className="text-2xl font-bold text-black max-[410px]:text-xl max-[370px]:text-lg">RESUMATCH</p>
      </Link>

      <Link to={"/upload"} className="primary-button w-fit max-[410px]:text-sm max-[370px]:text-xs">
        Upload Resume
      </Link>
    </nav>
  );
};

export default Navbar;
