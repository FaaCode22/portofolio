import React from 'react';
import { X, Home, User, Briefcase, Code, Mail, Github, Instagram, Music, Sun, Moon, ExternalLink } from 'lucide-react';
import { Theme } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  onThemeToggle: () => void;
  onNavigate: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, theme, onThemeToggle, onNavigate }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const socialLinks = [
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@fafafaa88', // ← ganti `yourusername`
      icon: Music
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/@wapaaa.22', // ← ganti `yourusername`
      icon: Instagram
    },
    {
      name: 'Github',
      url: 'https://github.com/FaaCode22', // ← ganti `yourusername`
      icon: Github
    }
  ];
  

  const handleNavigate = (section: string) => {
    onNavigate(section);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-6 py-8">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="w-full flex items-center px-4 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <item.icon className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium">
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Social Links
              </h3>
              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <link.icon className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Theme
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={onThemeToggle}
                  className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                    theme === 'light' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Sun className="w-4 h-4 mr-2" />
                  Light
                </button>
                <button
                  onClick={onThemeToggle}
                  className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Moon className="w-4 h-4 mr-2" />
                  Dark
                </button>
              </div>
            </div>

            {/* Store Link */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <a
                href="#"
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all group"
              >
                <ExternalLink className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Visit My Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;