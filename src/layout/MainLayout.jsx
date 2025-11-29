import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <  Navbar />
      <main className="flex-grow mt-9.5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
