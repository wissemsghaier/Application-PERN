// 📌 Import des dépendances principales de React et React Router
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Fragment } from "react";

// 📌 Import des pages principales
import Home from "./pages/home"; // ⚠️ Attention à la majuscule : "Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";


// 📌 Import des composants liés aux DataSets
// import DataSetPage from "./pages/DataSetPage";
// import AddDataSet from "./components/DataSets/AddDataSet";
// import EditDataSet from "./components/DataSets/EditDataSet";

// 📌 Import des pages liées aux Ordini
import OrdiniPage from "./pages/Ordeni/OrdiniPage";
import OrdiniFormPage from "./pages/Ordeni/OrdiniFormPage";
import OrdiniEditPage from "./pages/Ordeni/OrdiniEditPage";

// 📌 Import des composants utilisateurs
import UserTable from "./components/Users/UserTable";

// 📌 Import des protections de routes
import PrivateRoutes from "./utils/PriviteRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";

// 📌 Import du composant de navigation
import MainNavbar from "./components/Dashboard/MainNavbar";

// 📌 Import des pages liées à Anagrafica
import AnagraficaPage from "./pages/Anagrafica/AnagraficaPage";
import AnagraficaPageEmployee from "./pages/EmployeePages/AnagraficaPage";
import AnagraficaFormPage from "./pages/Anagrafica/AnagraficaFormPage";
import AnagraficaFormPageEmployee from "./pages/EmployeePages/AnagraficaFormPage";
import AnagraficaEditPage from "./pages/Anagrafica/AnagraficaEditPage";
import AnagraficaEditPageEmployee from "./pages/EmployeePages/AnagraficaEditPage";
import AnagraficaDetailPage from "./pages/Anagrafica/AnagraficaDetailPage";
import AnagraficaDetailPageEmployee from "./pages/EmployeePages/AnagraficaDetailPage";

// 📌 Import des sous-onglets de Anagrafica
import AbilitazioniTab from "./pages/Anagrafica/Tabs/AbilitazioniTab";
import AlboTab from "./pages/Anagrafica/Tabs/AlboTab";
// import SettoriTab from "./pages/Anagrafica/Tabs/SettoriTab"; // (désactivé si non utilisé)

// 📌 Page détaillée pour Albo + Settori
import AlboDetailPage from "./pages/AlboDetailPage";
import AlboDetailPageEmployee from "./pages/EmployeePages/AlboDetailPage";


import EmployerDashboard from "./pages/EmployeePages/EmployerDashboard"; // ✅ nouveau import
import EmployeeOrdini from "./pages/EmployeePages/EmployeeOrdini"



import AuditAnagraficaPage from "./pages/AnagraficaLogs/AuditAnagraficaPage"


// ==============================
// 🔹 Composant principal App
// ==============================
function App() {
  return (
    // BrowserRouter permet la navigation entre les pages
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// ==============================
// 🔹 Contenu de l'application avec gestion des routes
// ==============================
function AppContent() {
  const location = useLocation();

  // Définir les routes qui doivent afficher la Navbar (publiques)
  const publicPaths = ["/", "/login"];

  return (
    <Fragment>
      {/* ✅ Affiche la Navbar uniquement pour les routes publiques */}
      {publicPaths.includes(location.pathname) && <MainNavbar />}

      <Routes>
        {/* ======================
            🔹 Routes Publiques
        ====================== */}
        <Route path="/" element={<Home />} />          {/* Page d'accueil */}
        <Route path="/login" element={<Login />} />    {/* Page de connexion */}
        <Route path="/register" element={<Register />} /> {/* Page d'inscription */}

        {/* ======================
            🔹 Routes Privées (Admin)
        ====================== */}
        <Route
          path="/admin-dashboard/*"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        />

        {/* ======================
            🔹 Gestion des utilisateurs
        ====================== */}
        <Route path="/users" element={<UserTable />} />
        <Route path="/admin-dashboard/utenti" element={<UserTable />} />

        {/* ======================
            🔹 Gestion des Ordini
        ====================== */}
        <Route path="/admin-dashboard/ordini" element={<OrdiniPage />} />
        <Route path="/admin-dashboard/ordini/new" element={<OrdiniFormPage />} />
        <Route path="/admin-dashboard/ordini/:id/edit" element={<OrdiniEditPage />} />

        {/* ======================
            🔹 Gestion des DataSets (optionnel, actuellement commenté)
        ====================== */}
        {/* <Route path="/admin-dashboard/ordini/:id" element={<DataSetPage />} />  */}
        {/* <Route path="/admin-dashboard/ordini/:id/add-dataset" element={<AddDataSet />} /> */}
        {/* <Route path="admin-dashboard/ordini/:id/edit-dataset/:index" element={<EditDataSet />} /> */}

        {/* ======================
            🔹 Gestion Anagrafica
        ====================== */}
        <Route path="/admin-dashboard/ordini/:ordineId/anagrafica" element={<AnagraficaPage />} />
        <Route path="/admin-dashboard/ordini/:ordineId/anagrafica/new" element={<AnagraficaFormPage />} />
        <Route path="/admin-dashboard/ordini/:ordineId/anagrafica/:anagraficaId/edit" element={<AnagraficaEditPage />} />

        {/* Détails Anagrafica */}
        <Route path="/admin-dashboard/ordini/:ordineId/anagrafica/:anagraficaId" element={<AnagraficaDetailPage />} />
        <Route path="/admin-dashboard/ordini/:ordineId/anagrafica/:anagraficaId/abilitazioni" element={<AbilitazioniTab />} />
        <Route path="/admin-dashboard/ordini/:ordineId/anagrafica/:anagraficaId/albo" element={<AlboTab />} />

        {/* ======================
            🔹 Gestion Albo et Settori
        ====================== */}
        <Route path="/admin-dashboard/ordini/:ordineId/anagrafica/:anagraficaId/albo/:alboId/settori" element={<AlboDetailPage />}  />



        {/* Audit logs Anagrafica */}
        <Route path="/admin-dashboard/audit/anagrafica/:anagraficaId" element={<AuditAnagraficaPage />} />



        {/* ======================
          🔹 Routes Privées (Employer)
        ====================== */}
        <Route
        path="/employee-dashboard"
        element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["employee"]}>
              <EmployerDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }
      />
      <Route path="/employee-dashboard/ordini"
        element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["employee"]}>
              <EmployeeOrdini />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }
      />


      {/* ======================
    🔹 Gestion Anagrafica (Employee)
====================== */}
<Route
  path="/employee-dashboard/ordini/:ordineId/anagrafica"
  element={
    <PrivateRoutes>
      <RoleBaseRoutes requiredRole={["employee"]}>
        <AnagraficaPageEmployee />
      </RoleBaseRoutes>
    </PrivateRoutes>
  }
/>
<Route
  path="/employee-dashboard/ordini/:ordineId/anagrafica/new"
  element={
    <PrivateRoutes>
      <RoleBaseRoutes requiredRole={["employee"]}>
        <AnagraficaFormPageEmployee />
      </RoleBaseRoutes>
    </PrivateRoutes>
  }
/>
<Route
  path="/employee-dashboard/ordini/:ordineId/anagrafica/:anagraficaId/edit"
  element={
    <PrivateRoutes>
      <RoleBaseRoutes requiredRole={["employee"]}>
        <AnagraficaEditPageEmployee />
      </RoleBaseRoutes>
    </PrivateRoutes>
  }
/>

<Route
  path="/employee-dashboard/ordini/:ordineId/anagrafica/:anagraficaId/"
  element={
    <PrivateRoutes>
      <RoleBaseRoutes requiredRole={["employee"]}>
        <AnagraficaDetailPageEmployee />
      </RoleBaseRoutes>
    </PrivateRoutes>
  }
/>
<Route
  path="/employee-dashboard/ordini/:ordineId/anagrafica/:anagraficaId/albo/:alboId/settori"
  element={
    <PrivateRoutes>
      <RoleBaseRoutes requiredRole={["employee"]}>
        <AlboDetailPageEmployee />
      </RoleBaseRoutes>
    </PrivateRoutes>
  }
/>


      </Routes>
    </Fragment>
  );
}

export default App;
