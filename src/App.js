import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Main from './views/main';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './views/dashboard';
import './App.scss';
import 'animate.css/animate.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            name="Main Page"
            render={(props) => <Main {...props} />}
          />
          {/* 
          <ProtectedRoute
          exact path = "/dashboard"
          name = "Dashboard Page"
          component = {Dashboard} /> */}
          <Route
            exact
            path="/dashboard"
            name="Dashboard Page"
            render={(props) => <Dashboard {...props} />}
          />
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
