import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import {
  FaClipboardList,
  FaCheckCircle,
  FaExclamationCircle,
  FaPlusCircle,
  FaTachometerAlt,
  FaUser,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const { isLoggedIn, user, role } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-blue-700 text-white shadow-lg transform scale-105"
            : "text-blue-100 hover:bg-blue-800 hover:text-white hover:shadow-md hover:scale-105"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-blue-950 shadow-xl">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to=""
              className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <span className="font-bold text-white text-3xl tracking-wider">
                EVP
              </span>
            </Link>
          </div>

          {/* Centered Navigation Links */}
          {isLoggedIn && (
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center space-x-6">
                {/* Public routes */}
                <NavLink to="/all-feedbacks">
                  <FaClipboardList className="mr-2 text-lg" /> Feedbacks
                </NavLink>
                <NavLink to="/pending">
                  <FaExclamationCircle className="mr-2 text-lg" /> Pending
                </NavLink>
                <NavLink to="/in-progress">
                  <FaCheckCircle className="mr-2 text-lg" /> In Progress
                </NavLink>

                {/* Role-specific links */}
                {role === "admin" && (
                  <>
                    <NavLink to="/admin-dashboard">
                      <FaTachometerAlt className="mr-2 text-lg" /> Dashboard
                    </NavLink>
                    <NavLink to="/admin-assign">
                      <FaClipboardList className="mr-2 text-lg" /> Assign
                    </NavLink>
                  </>
                )}
                {role === "employee" && (
                  <>
                    <NavLink to="/add-feedback">
                      <FaPlusCircle className="mr-2 text-lg" /> New Feedback
                    </NavLink>
                    <NavLink to="/resolved">
                      <FaCheckCircle className="mr-2 text-lg" /> Resolved
                    </NavLink>
                  </>
                )}
                {role === "problem_solver" && (
                  <NavLink to="/resolve">
                    <FaCheckCircle className="mr-2 text-lg" /> Resolve
                  </NavLink>
                )}
              </div>
            </div>
          )}

          {/* Right Section with Notifications and User Dropdown */}
          <div className="flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              {isLoggedIn ? (
                <>
                  <button
                    className="flex items-center space-x-3 bg-blue-800 px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <FaUserCircle className="text-white text-xl" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-white">
                        {user?.username}
                      </p>
                      <p className="text-xs text-blue-200">{role}</p>
                    </div>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-60 rounded-xl shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transform transition-all duration-200 origin-top-right">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">
                          {user?.username}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.department}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <FaUser className="mr-3 text-gray-400" />
                          Profile Settings
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <FaCog className="mr-3 text-gray-400" />
                          Preferences
                        </Link>
                      </div>
                      <div className="py-1 border-t border-gray-100">
                        <div className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                          <SignOutButton />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to=""
                  className="flex items-center space-x-2 text-blue-100 hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <FaUser />
                  <span>Sign In Page</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
