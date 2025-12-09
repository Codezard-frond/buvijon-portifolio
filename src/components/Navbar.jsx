import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Navbar() {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="px-5 bg-black/30 shadow flex justify-between items-center py-5 fixed top-0 left-0 w-full z-50 backdrop-blur-lg">
      <img
        onClick={() => scrollToSection("home")}
        className="w-[200px] h-[70px] object-cover cursor-pointer"
        src="./images/photo_2025-05-05_23-49-40-Photoroom.png"
        alt=""
      />

      <ul className="flex gap-4 items-center max-w-[300px] w-full mr-16">
        <li>
          <button
            className="btn btn-neutral bg-black/20 border-none"
            onClick={() => scrollToSection("home")}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className="btn btn-neutral bg-black/20 border-none"
            onClick={() => scrollToSection("about")}
          >
            About
          </button>
        </li>
        <li>
          <button
            className="btn btn-neutral bg-black/20 border-none"
            onClick={() => scrollToSection("skills")}
          >
            Skills
          </button>
        </li><li>
          <button
            className="btn btn-neutral bg-black/20 border-none"
            onClick={() => scrollToSection("contact")}
          >
            contact
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
