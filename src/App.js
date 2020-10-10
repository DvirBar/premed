import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/routing/Router';
import './style/css/App.css';
import Navbar from './components/layout/Navbar';
import { getUser } from './redux/actions/auth';
import { getPaths } from './redux/actions/paths';
import { getSteps } from './redux/actions/steps';
import { getPages } from './redux/actions/pages';
import { getTopics } from './redux/actions/topics';
import { getAnc } from './redux/actions/anouncements';
import { getQuestGroups } from './redux/actions/questgroups';
import moment from 'moment';
import 'moment/locale/he';
import Footer from './components/layout/Footer';
import Loadbar from './components/layout/Loadbar';
import axios from 'axios'; 

axios.defaults.baseURL = 'http://10.0.0.28:5000';
axios.defaults.headers['Content-Type'] = 'application/json';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  
  useEffect(() => {
    dispatch(getPaths());
    dispatch(getSteps());
    dispatch(getPages());
    dispatch(getAnc());
    dispatch(getQuestGroups());

    if(auth) {
      dispatch(getTopics());
      axios.defaults.headers.common['x-auth-token'] = auth.token;
    }
  }, [auth])

   // Check if there is a logged in user
   useEffect(() => {
    dispatch(getUser());
  }, []);


  moment.locale('he');

  const [paths, setPaths] = useState([])
  const selPaths = useSelector(state => state.paths);
  const fetchedPaths = selPaths.paths;
  const loadPaths = selPaths.loading;
  const loadSteps = useSelector(state => state.steps.loading);
  const loadPages = useSelector(state => state.pages.loading);
  const loadAncs = useSelector(state => state.ancs.loading);

  useEffect(() => { // Bind selector to local state
    setPaths(fetchedPaths)
  }, [fetchedPaths])

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
