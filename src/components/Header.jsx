import { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "../assets/icons/search.svg";
import Logo from "../assets/logo.svg";
import { useAuth } from "../hooks/useAuth";
import usePortal from "../hooks/usePortal";
import useProfile from "../hooks/useProfile";
import LogoutModal from "./modal/LogoutModal";
import SearchBlogsModal from "./modal/SearchBlogsModal";

const Header = () => {
  const { auth } = useAuth();
  const { state } = useProfile();
  const [showModal, setShowModal] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const renderPortal = usePortal();

  const handleSearchModal = () => {
    setShowModal(!showModal);
  };

  const handleLougoutModal = () => {
    setShowLogout(!showLogout);
  };

  const initialName =
    state?.author?.firstName && state?.author?.firstName.charAt(0);

  return (
    <header>
      {showLogout &&
        renderPortal(<LogoutModal onClose={() => setShowLogout(false)} />)}
      {showModal &&
        renderPortal(<SearchBlogsModal onClose={() => setShowModal(false)} />)}
      <nav className="container">
        <div>
          <Link to="/">
            <img className="w-32" src={Logo} alt="lws" />
          </Link>
        </div>
        <div>
          <ul className="flex items-center space-x-5">
            {auth?.authToken ? (
              <>
                <li>
                  <Link
                    to="/create-blog"
                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                  >
                    Write
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSearchModal}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <img src={SearchIcon} alt="Search" />
                    <span>Search</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLougoutModal}
                    className="text-white/50 hover:text-white transition-all duration-200"
                  >
                    Logout
                  </button>
                </li>
                <li className="flex items-center">
                  <div className="avater-img bg-orange-600 text-white">
                    {state?.author?.avatar === null ? (
                      <span className>{initialName}</span>
                    ) : (
                      <img
                        className="rounded-full"
                        src={`http://localhost:3000/uploads/avatar/${state?.author?.avatar}`}
                      />
                    )}
                  </div>
                  <Link to="/profile">
                    <span className="text-white ml-2">
                      {state?.author?.firstName} {state?.author?.lastName}
                    </span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/create-blog"
                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                  >
                    Write
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-white/50 hover:text-white transition-all duration-200"
                  >
                    Login
                  </Link>
                </li>{" "}
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
