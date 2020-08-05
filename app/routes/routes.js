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
import ReferalLogin from '../components/ReferalLogin';
import ReferalAccount from '../components/ReferralAccount';
import ReferalStat from '../components/ReferralStats';
import AdminLogin from '../components/AdminLogin';
import AdminAccount from '../components/AdminAccount';
import AdminBookings from '../components/AdminBookings';
import AdminReferrals from '../components/AdminReferrals';

import NotFoundPage from '../containers/NotFoundPage';
import { Router, browserHistory } from 'react-router';

const Routes = () => (
  <Suspense fallback="Loading...">
    <Switch>
      {/* <Router history={browserHistory}> */}
      <Route exact path={['/', '/ref/:id']} component={Home} />
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
      <Route exact path="/referral/login" component={ReferalLogin} />
      <Route exact path="/referral/account" component={ReferalAccount} />
      <Route exact path="/referral/stat" component={ReferalStat} />
      <Route exact path="/admin/login" component={AdminLogin} />
      <Route exact path="/admin/account" component={AdminAccount} />
      <Route exact path="/admin/bookings" component={AdminBookings} />
      <Route exact path="/admin/referrals" component={AdminReferrals} />

      {/* <Route component={Login} exact path="/login" /> */}
      <Route component={NotFoundPage} />
      {/* </Router> */}
    </Switch>
  </Suspense>
);

export default Routes;
