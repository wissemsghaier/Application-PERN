import logo from "../logos/logo.png";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleAccess = () => {
    navigate("/login"); // tu peux changer vers "/admin-dashboard" si tu veux aller direct
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white relative px-6 py-12">
      
      {/* Halo décoratif */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Conteneur principal */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl max-w-6xl w-full flex flex-col md:flex-row items-center gap-12 p-12 border border-white/10">
        
        {/* Logo à gauche */}
        <div className="flex justify-center md:justify-start w-full md:w-1/3">
          <img
            src={logo}
            alt="Logo ISA S.r.l."
            className="w-64 h-64 object-contain rounded-2xl shadow-lg border border-white/20"
          />
        </div>

        {/* Texte de présentation */}
        <div className="w-full md:w-2/3 text-left">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Benvenuto sulla piattaforma interna di <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              ISA S.r.l.
            </span>
          </h1>

          <p className="text-gray-200 text-lg mb-5">
            Fondata nel 1996, <strong className="text-white">ISA S.r.l.</strong> è un’azienda leader nei settori
            dell’<span className="text-blue-400 font-semibold">automazione industriale</span>, 
            dell’<span className="text-blue-400 font-semibold">ingegneria dei processi</span> 
            e dei <span className="text-blue-400 font-semibold">sistemi SCADA</span>.
          </p>

          <p className="text-gray-300 text-lg mb-5">
            Questa applicazione è progettata per supportare il nostro lavoro quotidiano attraverso una gestione avanzata
            degli <span className="text-purple-400 font-semibold">utenti</span>, dei 
            <span className="text-purple-400 font-semibold"> progetti</span> e della 
            <span className="text-purple-400 font-semibold"> documentazione tecnica</span>.
          </p>

          <p className="text-gray-300 text-lg">
            Ogni utente ha un accesso personalizzato: 
            <span className="text-blue-300 font-semibold"> Superadmin</span>, 
            <span className="text-blue-300 font-semibold"> Admin</span>, 
            <span className="text-blue-300 font-semibold"> Developer</span>.
            <br />
            Lo scopo è garantire <strong className="text-white">produttività</strong>, <strong className="text-white">organizzazione</strong> e <strong className="text-white">collaborazione</strong>.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-12 text-center text-sm text-gray-400 w-full max-w-6xl bg-white/5 backdrop-blur-md py-4 rounded-xl border border-white/10">
        © 2025 ISA S.r.l. • Tutti i diritti riservati • Progetto MERN interno
      </footer>
      <button
        onClick={handleAccess}
        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Accéder
      </button>
    </div>
  );
};

export default Home;

