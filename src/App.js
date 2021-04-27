import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link } from "react-router-dom";
import Router from "./components/routing/Router";
import "./style/App.css";
import { getUser } from "./redux/actions/auth";
import moment from "moment";
import "moment/locale/he";
import Loadbar from "./components/layout/Loadbar";
import axios from "axios";
import { getBaseData } from "./redux/actions/basedata";
import Navbar from "./components/layout/Navbar/Navbar";
import Banner from "./components/layout/Banner/Banner";
import useAxios from "./axios";

function App() {
    useAxios()
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    // Check if there is a logged in user
    useEffect(() => {
        dispatch(getUser());
        dispatch(getBaseData());
    }, []);

    moment.locale("he");

    const selPaths = useSelector((state) => state.paths);
    const loadPaths = selPaths.loading;

    if (!auth || auth.loading || loadPaths) return <Loadbar loadfull={true} />;

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Banner />
                <Router />
     
                {/* <Footer /> */}
            </div>
        </BrowserRouter>
    );
}

export default App;
