import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdOutlineAttachMoney,
  MdOutlineHistory,
  MdLogout,
  MdOutlineSettings,
  MdOutlineDownload,
  MdClose,
  MdMenu
} from 'react-icons/md';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem('token');
    // Navigate the user back to the login page
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: MdOutlineDashboard, link: '/dashboard' },
    { name: 'Add Transaction', icon: MdOutlineAttachMoney, link: '/add' },
    { name: 'History', icon: MdOutlineHistory, link: '/history' },
    { name: 'Download', icon: MdOutlineDownload, link: '/report' },
    { name: 'Settings', icon: MdOutlineSettings, link: '/settings' },
    // Added Logout as a menu item
    { name: 'Logout', icon: MdLogout, action: handleLogout },
  ];

  return (
    <div className="flex">
      {/* Sidebar Component */}
      <div
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
        className={`fixed top-0 left-0 z-50 w-20 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out overflow-hidden ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex p-4">
          <button onClick={toggleSidebar} className="text-white focus:outline-none">
            {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="p-4 flex items-center space-x-4 transition-colors duration-200 hover:bg-gray-700 cursor-pointer"
                onClick={item.action} // Add a click handler for the logout item
              >
                {/* Conditionally render Link or a simple div */}
                {item.link ? (
                  <Link to={item.link} className="flex items-center space-x-4 w-full">
                    <item.icon size={24} />
                    {isSidebarOpen && <span className="whitespace-nowrap">{item.name}</span>}
                  </Link>
                ) : (
                  <div className="flex items-center space-x-4 w-full">
                    <item.icon size={24} />
                    {isSidebarOpen && <span className="whitespace-nowrap">{item.name}</span>}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
