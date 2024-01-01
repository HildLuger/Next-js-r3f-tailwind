import React from 'react';

const Footer = () => {
  // Get today's date
  const today = new Date();

  // Format the date as a string in the format: 'Day, Month Date, Year'
  const dateString = today.toLocaleDateString('en-US', {
   
    year: 'numeric', // e.g., 2023
    //month: 'long', // e.g., January

  });


  return (
    <footer className="footer fixed bottom-0 left-0 w-full p-4 text-gray-100 bg-white/5 backdrop-blur-lg border-b border-gray-200/30">
      <div className="text-center">
        <p>Next.js 14 + React Three Fiber + Tailwind Portfolio.<br />© {dateString} Hild Luger</p>
        {/* Add more footer content as needed */}
      </div>
    </footer>
  );
};

export default Footer;
