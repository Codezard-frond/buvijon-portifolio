import React from "react";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="mt-auto w-full bg-black/30 px-10 py-5 ">
      <div className="flex justify-between items-center ">
       <a href=""> <i className="fa-solid fa-arrow-up-from-bracket text-2xl"></i></a>
       <div className="flex items-center gap-1 text-2xl">
       <Link to='#'><i className="fa-brands fa-instagram p-4 hover:bg-amber-300/20 rounded-2xl duration-[1s,15s]"></i></Link>
       <Link to='#'> <i className="fa-brands fa-telegram p-4 hover:bg-amber-300/20 rounded-2xl duration-[1s,15s]"></i></Link>
    
       </div>
      </div>
    </div>
  );
}

export default Footer;
