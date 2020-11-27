import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/routing/Router';
import './style/css/App.css';
import Navbar from './components/layout/Navbar';
import { getUser } from './redux/actions/auth';
import { getSteps } from './redux/actions/steps';
import { getPages } from './redux/actions/pages';
import { getAnc } from './redux/actions/anouncements';
import { getQuestGroups } from './redux/actions/questgroups';
import { getTables } from './redux/actions/datatables';
import moment from 'moment';
import 'moment/locale/he';
import Footer from './components/layout/Footer';
import Loadbar from './components/layout/Loadbar';
import axios from 'axios'; 
import { getBaseData, getStatsInputs } from './redux/actions/basedata';

axios.defaults.baseURL = 'http://10.0.0.28:5000';
axios.defaults.headers['Content-Type'] = 'application/json';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  
  useEffect(() => {
    dispatch(getBaseData());
    dispatch(getSteps());
    dispatch(getPages());
    dispatch(getAnc());
    dispatch(getQuestGroups());
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
  const loadSteps = useSelector(state => state.steps.loading);
  const loadPages = useSelector(state => state.pages.loading);
  const loadAncs = useSelector(state => state.ancs.loading);

  if(!auth || auth.loading || loadPaths || loadSteps || loadPages || loadAncs)
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
