import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, ChatBubbleLeftIcon, ArrowUpTrayIcon, MagnifyingGlassIcon, PlayIcon } from '@heroicons/react/24/outline'; // PlayIcon for Hivees
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from "@fortawesome/free-solid-svg-icons";

const BottomBar = ({ toggleSidebarRight, isStoryActive }) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`sm:hidden fixed bottom-0 left-0 right-0 bg-black text-white flex justify-between items-center p-2 rounded-lg transition-all duration-150 z-50 ${ // Reduced duration for faster transition
        isStoryActive ? 'hidden' : ''
      }`}
    >
      <button
        onClick={() => navigate('/feed')}
        className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-700 hover:text-blue-600 transition-all duration-150" // Dark mode hover effects
      >
        <HomeIcon className="h-5 w-5" /> {/* Smaller Home Icon */}
      </button>

      <button
        onClick={() => navigate('/upload')}
        className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-700 hover:text-blue-600 transition-all duration-150" // Dark mode hover effects
      >
        <ArrowUpTrayIcon className="h-5 w-5" /> {/* Smaller Upload Icon */}
      </button>
      <button
        onClick={() => navigate('/')}
        // onClick={toggleSidebarRight}
        className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-700 hover:text-blue-600 transition-all duration-150" // Dark mode hover effects
      >
    <FontAwesomeIcon className="h-5 w-5" icon={faBlog} size="lg"  />
      </button>
     
      <button
        onClick={() => navigate('/explore')}
        className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-700 hover:text-blue-600 transition-all duration-150" // Dark mode hover effects
      >
        <MagnifyingGlassIcon className="h-5 w-5" /> {/* Smaller Explore Icon */}
      </button>
    </aside>
  );
};

export default BottomBar;
