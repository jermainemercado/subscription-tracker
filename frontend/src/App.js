import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from 'views/main';
import Dashboard from 'views/dashboard';
import './App.scss';
import 'animate.css/animate.min.css';

import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_yntCy3sFi63sgvtAxK7344Il')

function App() {

  const clickHandler = async (event) => {
    // fetchstripe promise
    const stripe = await stripePromise;
    // fetch our response from the BE endpoint, session  json
    const response = await fetch('/createCheckoutSession', { method: 'POST' });
    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error)
    }
  };

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          name="Main Page"
          render={(props) => <Main {...props} />}
        />
        <Route
          exact
          path="/dashboard"
          name="Dashboard Page"
          render={(props) => <Dashboard {...props} />}
        />
      </Switch>
      <button role="link" onClick={clickHandler}>
        Checkout tester
      </button>
    </div>
  );
}

export default App;
