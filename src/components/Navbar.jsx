import { Sun, Moon, MessageCircle, Mail } from 'lucide-react';
import { cvData } from '../data/cvData';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
        <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
          JV.
        </span>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium dark:text-white">
          <a href="#experiencia" className="hover:text-purple-500 transition-colors">Experiencia</a>
          <a href="#skills" className="hover:text-purple-500 transition-colors">Stack</a>
          <a href="#educacion" className="hover:text-purple-500 transition-colors">Formación</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-600" />}
          </button>
          
          <a 
            href={`https://wa.me/${cvData.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all shadow-md"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
