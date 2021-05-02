import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/routing/Router";
import "./style/App.css";
import { getUser } from "./redux/actions/auth";
import moment from "moment";
import "moment/locale/he";
import { getBaseData } from "./redux/actions/basedata";
import Navbar from "./components/layout/Navbar/Navbar";
import Banner from "./components/layout/Banner/Banner";
import useAxios from "./axios";
import MessageAlerts from "./components/layout/MessageAlerts/MessageAlerts";
import { isLoading } from "./redux/loader/selectors";
import { GET_USER } from "./redux/auth/types";
import Loadbar from "./components/layout/Loadbar";
import { authSelector, selectUser } from "./redux/selectors/auth";
import { BASE_DATA } from "./redux/actions/types";

function App() {
    useAxios()
    const dispatch = useDispatch();

    // Check if there is a logged in user
    useEffect(() => {
        dispatch(getUser());
        dispatch(getBaseData());
    }, []);

    moment.locale("he");

    const isBaseLoading = useSelector(isLoading(BASE_DATA))
    const isUserLoading = useSelector(isLoading(GET_USER))
    const auth = useSelector(authSelector)

    if(!auth || isBaseLoading || isUserLoading) return <Loadbar loadfull={true} />

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Banner />
                <Router />
                <MessageAlerts />
                {/* <Footer /> */}
            </div>
        </BrowserRouter>
    );
}

export default App;
