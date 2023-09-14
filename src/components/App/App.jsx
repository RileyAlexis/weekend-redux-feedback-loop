import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';


//Material UI
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button } from '@mui/material';

//Components
import Header from '../Header';
import FeedbackStepper from '../FeedbackStepper';
import Feeling from '../Feeling';
import Understanding from '../Understanding';
import Support from '../Support';
import Comments from '../Comments';
import Submit from '../Submit';
import Complete from '../Complete';
import Admin from '../Admin';
import Auth from '../Auth';

import './App.css';
import { Feed } from '@mui/icons-material';

function App() {

  const [cookies, setCookies, removeCookies] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const activeStep = useSelector(store => store.activeStep);

  return (
    <Router>
      <div className="container">

        <div className="header">
          <Header />
        </div>
        {/* TODO : will require user authenication before displaying this component */}
        {!authToken && <Auth />}
          {(authToken && activeStep >= 0 && activeStep < 5) ? (
              <FeedbackStepper />
              )
              :
             (<></>)
              }

        <div className="content">
          {(authToken && <>
        <Route exact path="/" component={Feeling} />
          <Route path="/understanding">
            <Understanding />
          </Route>
          <Route path="/support">
            <Support />
          </Route>
          <Route path="/comments">
            <Comments />
          </Route>
          <Route path="/submit">
            <Submit />
          </Route>
        <Route path="/complete" component={Complete} />
        </>
        )}
        </div>
      </div>
    </Router>
  );
}

export default App;
