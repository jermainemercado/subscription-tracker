import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from 'views/main';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from 'views/dashboard';
import './App.scss';
import 'animate.css/animate.min.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          name="Main Page"
          render={(props) => <Main {...props} />}
        />

        {/* <Route
          exact
          path="/dashboard"
          name="Dashboard Page"
          render={(props) => <Dashboard {...props} />}
        /> */}
        <ProtectedRoute 
        exact path = "/dashboard"
        name = "Dashboard Page"
        component = {Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
