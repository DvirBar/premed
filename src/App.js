import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/routing/Router';
import './style/css/App.css';
import Navbar from './components/layout/Navbar';
import { getUser } from './redux/actions/auth';
import { getTables } from './redux/actions/datatables';
import moment from 'moment';
import 'moment/locale/he';
import Footer from './components/layout/Footer';
import Loadbar from './components/layout/Loadbar';
import axios from 'axios'; 
import { getBaseData } from './redux/actions/basedata';

axios.defaults.baseURL = 'http://10.0.0.18:5000';
axios.defaults.headers['Content-Type'] = 'application/json';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  
  useEffect(() => {
    dispatch(getBaseData());
    dispatch(getTables())

    if(auth) {
      axios.defaults.headers.common['x-auth-token'] = auth.token;
    }
  }, [auth])

   // Check if there is a logged in user
   useEffect(() => {
    dispatch(getUser());
  }, []);


  moment.locale('he');

  const selPaths = useSelector(state => state.paths);
  const paths = selPaths.paths;
  const loadPaths = selPaths.loading;
  console.log(document.referrer);

  if(!auth || auth.loading || loadPaths)
    return <Loadbar loadfull={true} />

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar paths={paths}/>
          <div className="cover-photo">
            <div className="cover-top-layer"></div>
          </div>
          <div className="content">
              <Router /> 
          </div>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    );
}

export default App;
