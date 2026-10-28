import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-500">
          MovieBook
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li>
            <Link to="/" className="hover:text-sky-300 transition">
              Home
            </Link>
          </li>

          <li>
            <Link to="/movies" className="hover:text-sky-300 transition">
              Movies
            </Link>
          </li>

          <li>
            <Link to="/theatres" className="hover:text-sky-300 transition">
              Theatres
            </Link>
          </li>

          <li>
            <Link to="/bookings" className="hover:text-sky-300 transition">
              Bookings
            </Link>
          </li>
        </ul>

        {/* Login Button */}
        <button className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg transition">
          Login
        </button>

      </div>
    </nav>
  );
};

export default Navbar;