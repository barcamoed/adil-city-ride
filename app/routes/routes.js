import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
// Import Containers
import HomePage from '../containers/HomePage';
// import Login from '../components/Login';
import Home from '../components/Home';
import OrderNumber from '../components/Ordernumber';
import Booking from '../components/Booking';
import About from '../components/About';
import Faq from '../components/Faq';
import OrderSummary from '../components/OrderSummary';
import TermsAndConditions from '../components/TermsAndConditions';
import Contact from '../components/Contact';
import NotFoundPage from '../containers/NotFoundPage';
import { Router, browserHistory } from 'react-router';

const Routes = () => (
  <Suspense fallback="Loading......">
    <Switch>
      {/* <Router history={browserHistory}> */}
      <Route exact path="/" component={Home} />
      <Route exact path="/order-number" component={OrderNumber} />
      <Route exact path="/booking" component={Booking} />
      <Route exact path="/about" component={About} />
      <Route exact path="/faq" component={Faq} />
      <Route exact path="/order-summary" component={OrderSummary} />
      <Route
        exact
        path="/terms-and-conditions"
        component={TermsAndConditions}
      />
      <Route exact path="/contact" component={Contact} />
      {/* <Route component={Login} exact path="/login" /> */}
      <Route component={NotFoundPage} />
      {/* </Router> */}
    </Switch>
  </Suspense>
);

export default Routes;
