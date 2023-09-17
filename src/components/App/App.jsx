import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import axios from 'axios';


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

  const [cookies, setCookies, removeCookies] = useCookies(['Email' , 'AuthToken']);
  const authToken = cookies.AuthToken;
  const email = cookies.Email;
  const activeStep = useSelector(store => store.activeStep);
  const authorizedUser = useSelector(store => store.authorizedUser);
  const dispatch = useDispatch();

  const verifyTokens = () => {

    if (!email && !authToken) {
      console.log('Not authorized');

    }
    if (email && authToken) {
      console.log('Has token');
      dispatch({type: 'AUTHORIZE', payload: 'USER'})
      dispatch({type: 'SET_USER_EMAIL', payload: email});
    }
  }

  useEffect(() => {
    console.log(cookies);
    verifyTokens();
  }, []);

  return (
    <Router>
      <div className="container">

        <div className="header">
          <Header />
        </div>
        {console.log('Authorized', authorizedUser)}
        {/* TODO : will require user authenication before displaying this component */}
        {authorizedUser === null && <Auth />}
          {(authorizedUser !== null && activeStep >= 0 && activeStep < 5) ? (
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
        <Route path="/editResponses" component={Admin} />
        </>
        )}
        </div>
      </div>
    </Router>
  );
}

export default App;
