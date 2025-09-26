import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";


const EmployerDashboard = () => {
   const { user } = useAuth();

  return (
    <div className="p-8 pt-24">
      <h1 className="text-3xl font-extrabold text-teal-700 mb-6">
        Benvenuto, {user?.name} 👋
      </h1>
      <p className="text-gray-500">
        Utilizza il menu a sinistra per navigare tra le tue attività e ordini.
      </p>
    </div>
  );
};

export default EmployerDashboard;
