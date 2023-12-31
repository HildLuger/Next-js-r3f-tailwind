import '../globals.css';

export default function About() {
  return (
    <div className="h-screen flex items-center justify-center ml-20vw mr-20vw">
      <div>
        <h1 className="text-2xl text-center font-bold text-gray-800 mb-4">
          Welcome to my website.
        </h1>
        <p className="text-center text-base text-gray-600leading-relaxed mb-3">
          Hi. I&apos;m Hild Luger, a Front-End Web Developer. Here you can see my Next.js 14 + React Three Fiber + Tailwind portfolio.
        </p>
        <p className="text-base text-gray-600 leading-relaxed">
          I&apos;m using the latest features of Next.js, and although the 3D components and the navbar need to be rendered on the client side, all the other static components can be rendered on the server side. This means that the pages load faster than React.js. Also, page routing is easier to implement compared to plain React.js. I&apos;m using React Three Fiber for the 3D components and Tailwind for most of the CSS.
        </p><br />
        <p className="text-base text-gray-600 leading-relaxed">
          Here is a list of technologies I&apos;m familiar with:
        </p><br />
        <p className="text-base text-gray-600leading-relaxed">
          Next.js, ESlint, React Three Fiber, Three.js, JavaScript, TypeScript, React.js, React Router, React Redux, Tailwind, Styled Components, CSS Modules, SASS, Git, Node.js, Express.js, MongoDB, API RESTful, MERN Stack.
        </p><br />
        <p className="text-center text-base text-gray-600 leading-relaxed mb-3">
          <a href="https://www.linkedin.com/in/hild-luger-3aab07160/?locale=en_US" target="_blank" rel="noopener noreferrer" className="text-red-800 hover:text-red-500">
            Linkedin
          </a><br />
          <a href="https://github.com/HildLuger" target="_blank" rel="noopener noreferrer" className="text-red-800 hover:text-red-500">
            GitHub 
          </a><br /><br /><br />
        </p>
        <p className="text-center text-base text-gray-600 leading-relaxed mb-3">
          I&apos;m also a 3D Technical Artist. You can see my 3D portfolio at the following link:
        </p>
        <div className="text-center">
          <a href="https://www.artstation.com/longshortdreamslsd" target="_blank" rel="noopener noreferrer" className="text-red-800 hover:text-red-500">
            ArtStation Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
