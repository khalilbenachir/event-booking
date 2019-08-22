import React from 'react';
import './App.css';
import {BrowserRouter,Route ,Switch} from 'react-router-dom';

import AuthComponent from './pages/auth';
import EventComponent from './pages/event';
import BookingComponent from './pages/booking';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={null}/>
        <Route path='/auth' component={AuthComponent}/>
        <Route path='/event' component={EventComponent}/>
        <Route path='/booking' component={BookingComponent}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
