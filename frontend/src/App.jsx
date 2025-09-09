 import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
 import { Fragment } from "react";
 import Home from "./pages/home"; // H majuscule
 import Login from "./pages/Login";
 import Register from "./pages/Register";
 import AdminDashboard from "./pages/AdminDashboard";



 import DataSetPage from "./pages/DataSetPage";
 import AddDataSet from "./components/DataSets/AddDataSet";
 import EditDataSet from "./components/DataSets/EditDataSet";

 import OrdiniPage from "./pages/Ordeni/OrdiniPage";
 import OrdiniFormPage from "./pages/Ordeni/OrdiniFormPage";
 import OrdiniEditPage from "./pages/Ordeni/OrdiniEditPage";


 import UserTable from "./components/Users/UserTable"

 import PrivateRoutes from "./utils/PriviteRoutes";
 import RoleBaseRoutes from "./utils/RoleBaseRoutes";
 import MainNavbar from "./components/Dashboard/MainNavbar";



 function App() {
   return (
     <BrowserRouter>
       <AppContent />
     </BrowserRouter>
   );
 }

 function AppContent() {
   const location = useLocation();
   const publicPaths = ["/", "/login"];

   return (
     <Fragment>
       {/* Affiche la Navbar uniquement pour les routes publiques */}
       {publicPaths.includes(location.pathname) && <MainNavbar />}

       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
        

        
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
           <Route path="/users" element={<UserTable />} />
           <Route path="/admin-dashboard/ordini" element={<OrdiniPage />} />
          <Route path="/admin-dashboard/ordini/:id" element={<DataSetPage />} /> 
         <Route path="/admin-dashboard/ordini/new" element={<OrdiniFormPage />} />
         <Route path="/admin-dashboard/ordini/:id/edit" element={<OrdiniEditPage />} />
         {/* <Route path="admin-dashboard/ordine/:id/datasets" element={<DataSetPage />} /> */}
         <Route path="/admin-dashboard/ordini/:id/add-dataset" element={<AddDataSet />} />
         <Route path="admin-dashboard/ordini/:id/edit-dataset/:index" element={<EditDataSet />} />
         <Route path="/admin-dashboard/utenti" element={<UserTable />} />
         
 
       </Routes>
     </Fragment>
   );
 }

 export default App;



