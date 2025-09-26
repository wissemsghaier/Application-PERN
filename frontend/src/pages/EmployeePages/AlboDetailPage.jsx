import React from "react";
import Navbar from "../../components/Dashboard/Navbar";
import SideBar from "../../components/Dashboard/SideBarEmploye";
import SettoriTab from "../Anagrafica/Tabs/SettoriTab";

const AlboDetailPage = () => {
  return (
    <div className="flex bg-green-50 min-h-screen">
      {/* Sidebar fixe */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20">
        <SideBar />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar fixe */}
        <div className="fixed top-0 left-64 right-0 z-30">
          <Navbar />
        </div>

        {/* Zone de contenu scrollable */}
        <main className="flex-1 mt-16 p-8 overflow-auto bg-gray-50" style={{ paddingTop: "4rem" }}>
          <SettoriTab />
        </main>
      </div>
    </div>
  );
};

export default AlboDetailPage;

