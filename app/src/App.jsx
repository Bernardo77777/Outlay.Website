import React, {  } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import PrivateRoutes from "./utils/privateRoute";
import PublicRoutes from "./utils/publicRoute";

//PUBLIC ROUTES
import Home from "./components/public/Home";
import Login from "./components/public/Login";
import Register from "./components/public/Register";

//PRIVATE ROUTES
import Dashboard from "./components/secure/Dashboard";
import costList from "./components/secure/Costs/costList";
import Cost from "./components/secure/Costs/Cost.jsx";
import Description from "./components/secure/Description/Description.jsx";

import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import CostList from "./components/secure/Costs/costList";
import Attachements from "./components/secure/Attachements/Attachements.jsx";

const App = () => {
    return (
        <div>
            <div className="container mt-3">
                <Header />
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/cost-list" element={<CostList />} />
                        <Route path="/cost" element={<Cost />} />
                        <Route path="/cost/:number" element={<Cost />} />
                        <Route path="/Description/:id" element={<Description />} />
                        <Route path="/Attachements/:id" element={<Attachements />} />
                        <Route path='*'element={<Navigate to="/dashboard" />} />
                    </Route>

                    <Route element={<PublicRoutes />}>
                        <Route exact path={"/"} element={<Home />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/" />}  />
                    </Route>
                </Routes>
                <Footer />
            </div>
        </div>
    );
};

export default App;