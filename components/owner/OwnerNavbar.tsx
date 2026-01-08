import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faUser,
  faMoon,
  faSun,
  faBars,
  faSignOutAlt,
  faCog,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { authCheck } from "@/services/authCheck";
import axios from "axios";
import { useRouter } from "next/navigation";

interface OwnerNavbarProps {
  onMenuClick: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}


const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


export function OwnerNavbar({ onMenuClick, isDarkMode, onToggleDarkMode }: OwnerNavbarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);








  const [userName, setuserName] = useState();
const router = useRouter();

  const getUser = async () => {

    const user = await authCheck();

  
    if (user) {
      setuserName(user.user.firstname);
    }
  }


  const  handleLogout = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/auth/logout`,
        {},
        { withCredentials: true }
      );
      router.push("/");
    } catch (ex) {
      alert("Something went wrong! Unable to logout");
    }
  };


  useEffect(() => {
    getUser();
  }, [])





  return (
    <nav
      className={`sticky top-0 z-50 h-16 px-4 md:px-6 flex items-center justify-between border-b transition-colors ${isDarkMode
          ? "bg-gray-900 border-gray-700"
          : "bg-white border-gray-200"
        }`}
    >


      {/* Left: Menu button + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className={`lg:hidden p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-600"
            }`}
          data-testid="button-mobile-menu"
        >
          <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
        </button>
       <div className="flex items-center gap-3">
  <img
    src="https://res.cloudinary.com/dzzuoem1w/image/upload/v1767352509/logo_orignal_q0jn75.png"
    alt="Hotelire Logo"
    className="h-8 sm:h-10 w-auto object-contain"
  />


</div>

      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className={`p-2 rounded-lg transition-colors ${isDarkMode
              ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          data-testid="button-dark-mode-toggle"
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="w-5 h-5" />
        </button>


        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              
            }}
            className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            data-testid="button-profile-menu"
          >
            <div className="w-8 h-8 bg-[#59A5B2] rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
            </div>
            <span
              className={`hidden md:block text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"
                }`}
            >
              {userName }
            </span>
          </button>

          {showProfileMenu && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg border overflow-hidden ${isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
                }`}
            >
              <a
                href="/owner/settings"
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isDarkMode
                    ? "text-gray-200 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <FontAwesomeIcon icon={faCog} className="w-4 h-4" />
                Settings
              </a>
              <a
                href="/"
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isDarkMode
                    ? "text-gray-200 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
                Customer Pannel
              </a>
              <button
              onClick={handleLogout}
                className={`flex items-center gap-3 px-4 py-3 text-sm w-full text-left transition-colors ${isDarkMode
                    ? "text-red-400 hover:bg-gray-700"
                    : "text-red-600 hover:bg-gray-50"
                  }`}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>


      
    </nav>
  );
}
