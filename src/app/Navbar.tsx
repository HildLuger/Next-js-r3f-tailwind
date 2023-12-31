'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import './globals.css';

const SunIcon = './sun.svg'; // Replace with your path to the sun icon
const MoonIcon = './moon.svg'; // Replace with your path to the moon icon

const Navbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);



  return (
    <nav className="navbar fixed top-0 left-0 w-full p-1 mt-0 pr-10 pl-10 z-10 bg-white/10 backdrop-blur-lg border-b border-gray-200/30 dark:border-gray-700">
      <div className="flex justify-between items-center w-full">
        {/* Left-aligned items */}
        <div className="flex items-center">
          <Link href="/" className="text-gray-900 cursor-pointer">Home</Link>
          <div className="relative group mr-3 ml-3"
               onMouseEnter={() => setDropdownVisible(true)}
               onMouseLeave={() => setDropdownVisible(false)}>
            {/* Trigger for Dropdown Menu */}
            <span className="text-red-900 dark:text-red-900 cursor-pointer">+ Projects</span>
            {/* Dropdown Menu */}
            <div className={`absolute ${isDropdownVisible ? 'block' : 'hidden'} transition-opacity duration-300 ease-in-out ml-3 mr-0`}>
              <Link href="/globe" className="text-gray-900 cursor-pointer">• Globe</Link><br />
              <Link href="/plane" className="text-gray-900  cursor-pointer">• Plane</Link><br />
              <Link href="/engine" className="text-gray-900  cursor-pointer">• Engine</Link>
            </div>
          </div>
          {/*
          <button onClick={toggleDarkMode} className="ml-4" aria-label={darkMode ? 'Activate light mode' : 'Activate dark mode'}>
            <img src={darkMode ? MoonIcon : SunIcon} alt={darkMode ? 'Dark Mode' : 'Light Mode'} className="h-6 w-6" />
          </button>
          */}
        </div>

        {/* Right-aligned items */}
        <div>
          <Link href="/about" className="text-gray-900  cursor-pointer">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
