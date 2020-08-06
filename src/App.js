import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/routing/Router';
import './style/css/App.css';
import Navbar from './components/layout/Navbar';
import { getUser } from './redux/actions/auth';
import { getPaths } from './redux/actions/paths';
import { getSteps } from './redux/actions/steps';
import moment from 'moment';
import 'moment/locale/he';
import Footer from './components/layout/Footer';

function App() {
  const dispatch = useDispatch();

  // Check if there is a logged in user
  useEffect(() => {
    dispatch(getUser());
    dispatch(getPaths());
    dispatch(getSteps());
  }, []);

  moment.locale('he');

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
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
