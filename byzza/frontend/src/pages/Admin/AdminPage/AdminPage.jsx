import React from "react";
import { Outlet } from "react-router-dom";
// import Sidebar from "../../../components/admin/Sidebar/Sidebar";

import './AdminPage.css'

const AdminPage = () => {

    return (
        <div className="container">
            <p>Admin Page</p>
            {/* <div><Navbar /></div> */}

            {/* Outlet is used to render the content of child routes defined in index.js */}
            <div><Outlet /></div>
        </div>
    )
}

export default AdminPage