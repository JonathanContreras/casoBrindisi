import React from "react";
import { Login } from "../components/login/Login";

const LoginPage = () => {
    return (
        <div className="grid" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Login />
        </div>
    );
};

export default LoginPage;
