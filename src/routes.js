import React from 'react';
import {Route, IndexRoute, browserHistory, Router} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import BuildingsHome from './components/BuildingsHome';
import BuildingHome from './components/BuildingHome';
import LogInPage from './components/LogInPage';
import ForgotPassword from './components/ForgotPassword';
import EditPassword from './components/EditPassword';
import ResendConfirmationPage from './components/ResendConfirmationPage';
import RegisterUser from './components/RegisterUser';
import Payments from './components/Payments';
import PaymentReceipt from './components/PaymentReceipt';
import Owners from './components/Owners';
import Tnc from './components/Tnc';
import Dashboard from './components/Dashboard';
import NewBooking from './components/NewBooking';
import NewBookingPayment from './components/NewBookingPayment';
import NewDepositPayment from './components/NewDepositPayment';
import NewRentPayment from './components/NewRentPayment';
import NewMiscellaneousPayment from './components/NewMiscellaneousPayment';
import EditUserProfile from './components/EditUserProfile';
import Invoice from './components/Invoice';
import Care from './components/Care';
import Confirm from './components/Confirm';
import Pyr from './components/Pyr';
import RequestCallback from './components/RequestCallback';
import CampaignForm from './components/CampaignForm';
import swal from 'sweetalert2';


export default(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="login" component={LogInPage} onEnter={requireNoAuth} />
      <Route path="forgotpassword" component={ForgotPassword} onEnter={requireNoAuth} />
      <Route path="password/edit" component={EditPassword} onEnter={requireNoAuth} />
      <Route path="resendconfirmation" component={ResendConfirmationPage} onEnter={requireNoAuth} />
      <Route path="register" component={RegisterUser} onEnter={requireNoAuth} />
      <Route path="houses" component={BuildingsHome} />
      <Route path="payments" component={Payments} />
      <Route path="payments/:paymentId/receipt" component={PaymentReceipt} />
      <Route path="forowners" component={Owners} />
      <Route path="tnc" component={Tnc} />
      <Route path="confirm" component={Confirm} />
      <Route path="hives/:buildingId" component={BuildingHome} />
      <Route path="home" component={Dashboard} onEnter={requireAuth} />
      <Route path="editProfile" component={EditUserProfile} onEnter={requireAuth} />
      <Route path="houses/:propertyId/:buildingId/book" component={NewBooking} onEnter={requireAuth} />
      <Route path="payments/new/booking" component={NewBookingPayment} onEnter={requireAuth} />
      <Route path="payments/new/deposit" component={NewDepositPayment} onEnter={requireAuth} />
      <Route path="payments/new/miscellaneous" component={NewMiscellaneousPayment} onEnter={requireAuth} />
      <Route path="payments/new/rent" component={NewRentPayment} onEnter={requireAuth} />
      <Route path="invoice" component={Invoice} onEnter={requireAuth} />
      <Route path="care" component={Care} onEnter={requireAuth} />
      <Route path="pyr" component={Pyr} />
      <Route path="request/callback" component={RequestCallback} />
      <Route path="campaigns/referral" component={CampaignForm} onEnter={requireAuth} />
      <Route path='rsvp' component={() => window.location = 'https://homigoteam.typeform.com/to/V9c3bJ'}/>
    </Route>
  </Router>
)


function requireAuth(nextState, replace) {
  if (!sessionStorage.userData) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
function requireNoAuth(nextState, replace) {
  if (sessionStorage.userData) {
    replace({
      pathname: '/home',
      state: { nextPathname: nextState.location.pathname }
    })
    swal({
      title: 'You\'re already logged in!',
      timer: 2500,
      allowOutsideClick: false,
      showConfirmButton: false
    })
  }
}