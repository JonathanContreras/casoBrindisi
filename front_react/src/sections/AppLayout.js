import React from "react";
import { Route } from "react-router-dom";

import { Dashboard } from "../components/Dashboard";
import { AsignarPedidos } from "../pages/AsignarPedidos";

export const AppLayout = (props) => {
    return (
        <div className="layout-main">
            <Route path="/" exact render={() => <Dashboard colorMode={props.layoutColorMode} />} />
            <Route path="/asignarPedidos" component={AsignarPedidos} />
        </div>
    );
};
