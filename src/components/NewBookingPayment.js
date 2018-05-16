import React, {Component} from 'react';
import {connect} from 'react-redux';
import WebHeader from './WebHeader';
import WebFooter from './WebFooter';
import Checkout from './Checkout';
import swal from 'sweetalert2';
import Preloader from './Preloader';
import {getRooms} from '../actions/index';
require('../stylesheets/newPayment.css');
const currencyFormatter = require('currency-formatter');

class NewBookingPayment extends Component {

	componentWillMount() {
		let rooms = this.props.getRooms(JSON.parse(localStorage.building).id, JSON.parse(localStorage.bookingResponse).property_id);
	}

  render () {
  	let booking = JSON.parse(localStorage.booking);
  	let bookingResponse = JSON.parse(localStorage.bookingResponse);
  	let building = JSON.parse(localStorage.building);
  	let userData = JSON.parse(localStorage.userData);
  	let rent = 0;
  	let maintenance = 0;
  	let bookingType = '';
  	let property = JSON.parse(localStorage.property);
  	let room = this.props.rooms.filter(
  		(room) => {
  			return room.id == booking.room_id
  		}
  	)
  	room = room[0];
  	switch(bookingResponse.bookingtype) {
  		case 0:
  			bookingType = 'Shared Living';
  			break;
  		case 1:
  			bookingType = 'Single Occupancy';
  			break;
  		case 2:
  			bookingType = 'Full House';
  			break;
  	}
  	// if(property.select != 3)
	  // 	switch(bookingResponse.bookingtype) {
	  // 		case 0:
	  // 			rent = room[0].shared;
	  //				break;
	  // 		case 1:
	  // 			rent = room[0].full;
	  //				break;
	  // 	}
	  // else {
	  // 	switch(bookingResponse.furnishingtype) {
	  // 		case 0:
	  // 			rent = room[0].sf_full;
	  //				break;
	  // 		case 1:
	  // 			rent = room[0].ff_full;
	  //				break;
	  // 		case 2:
	  // 			rent = room[0].ff_bills_full;
	  //				break;
	  // 	}
	  // }
  	if(this.props.paymentDetails)
	    return (
	    	<div>
	    		<WebHeader />
			    <div className="container">
				  <div className="page-header">
				    <h2>Payment Summary</h2>
				  </div>
				  <div className="payments-wrapper">
				    <div className="col-md-6">
				      <div className="card">
				        <div className="card-header">
				          <h4 className="c-gray">Your Details</h4><hr />
				        </div>
				        <div className="card-body card-padding">
				          <dl className="dl-horizontal"><dt>Name</dt><dd>{userData.name}</dd></dl>
				          <dl className="dl-horizontal"><dt>Email</dt><dd>{userData.email}</dd></dl>
				          <dl className="dl-horizontal"><dt>Number</dt><dd>{userData.number}</dd></dl>
				        </div>
				      </div>
				      <br />
				      <div className="card">
				        <div className="card-header">
				          <h4 className="c-gray">House Details</h4><hr />
				          <h5>{building.name}</h5>
				          <p>{building.address}</p>
				        </div>
				        <div className="card-body card-padding">
				          <dl className="dl-horizontal"><dt>House Type</dt><dd>{property.label}</dd></dl>
				          <dl className="dl-horizontal"><dt>House ID</dt><dd>{property.id}</dd></dl>
				          <dl className="dl-horizontal"><dt>Booking Type</dt><dd>{bookingType}</dd></dl>
				          <dl className="dl-horizontal"><dt>Move In Date</dt><dd>{bookingResponse.start_date}</dd></dl>
				        </div>
				      </div>
				      <p style={{marginTop: '10px'}}>
	            	<a href="/home">{'<'} Back</a>
	            </p>
				    </div>

				    <div className="col-md-6">
				      <div className="card">
				        <div className="card-header">
				          <h4 className="c-gray">Booking Payment Details</h4><hr />
				        </div>
				        <div className="card-body card-padding">
				          <dl className="dl-horizontal">
				            <dt>Booking ID</dt>
				            <dd>{bookingResponse.id}</dd>
				          </dl>
		              <dl className="dl-horizontal">
		                <dt>Monthly Rent</dt>
		                <dd className="price"> ₹ 
		                  {bookingResponse.rent}
		                </dd>
		              </dl>
		              <dl className="dl-horizontal">
		                <dt>Maintenance</dt>
		                <dd className="price">
		                	{currencyFormatter.format(room.maintenance, {code: 'INR'}).split('.')[0]}	
		                </dd>
		              </dl>
		              
		              <dl className="dl-horizontal">
		                <dt>Monthly Payable Amount</dt>
		                <dd className="price price-highlighted"> ₹ 
		                	{room.maintenance ? bookingResponse.rent + parseInt(room.maintenance) : bookingResponse.rent}
		                </dd>
		              </dl>
		              <dl className="dl-horizontal">
			              <dt>Payable Amount</dt>
			              <dd className="price"> ₹ {this.props.paymentDetails.amount} </dd>
			            </dl>
			            <p> &nbsp;I agree with <a href="/tnc" target="_blank" style={{color:"#664ea0"}}>Terms and Conditions</a></p>
			            <br />
				          <div className="card">

					            <div className="clearfix">
							          <div className="col-md-12 col-sm-12 col-xs-12" id="payButton" style={{paddingLeft: '0'}}>
								          <div style= {{
							            	margin: '2% 0%',
												    padding: '4%',
												    float: 'left',
												    boxShadow: '2px 2px 10px 1px #00000012'
												    
							            }}
							            >
								            <Checkout 
								            	razorpayKey={this.props.paymentDetails.razorpay_key}
								            	razorpayAmount={this.props.paymentDetails.razorpay_amount}
								            	amount={this.props.paymentDetails.amount}
								            	buttonText="Pay" 
								            	name="Homigo.in"
								            	razorpayDescription={this.props.paymentDetails.razorpay_description}
								            	bookingId={this.props.paymentDetails.booking_id}
								            	paymentType={this.props.paymentDetails.payment_type}
								            	parentId = {this.props.paymentDetails.parent_id}
								            />
								            <p><small>Pay with payment gateway</small></p>
								          </div>
							          </div>
						         	</div>
					          </div>
				        </div>
				      </div>
				    </div>
				  </div>
				</div>
				<WebFooter />
			</div>

	    )
		else
			return (
				<div>
					<Preloader />
				</div>
			)
  }

}

function mapStateToProps(state) {
	return {paymentDetails: state.payments.paymentData, rooms: state.buildings.rooms};
}

export default connect( mapStateToProps, {getRooms: getRooms})(NewBookingPayment);