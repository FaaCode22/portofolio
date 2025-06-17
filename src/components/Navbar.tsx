import React from 'react';
import { Menu } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { isScrolled } = useScrollAnimation();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
      isScrolled 
        ? 'bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg shadow-lg border-b border-gray-200/10 dark:border-gray-700/10 mx-4 mt-4 rounded-2xl'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:bg-none dark:text-white transition-colors duration-300">
              WAFA CODINGIN
            </h1>
          </div>
          
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
