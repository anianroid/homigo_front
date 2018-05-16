import React, {Component} from 'react';
import {connect} from 'react-redux';
import WebHeader from './WebHeader';
import WebFooter from './WebFooter';
import Checkout from './Checkout';
import Preloader from './Preloader';
import {TAX_VALUE} from '../actions/types';
import {getBuilding, getBooking, getPropertiesForBuilding, getRooms, getFinePaymentDetails, getOtherDuePaymentDetails, getWalletDetails} from  '../actions/index'
import swal from 'sweetalert2'
require('../stylesheets/newPayment.css');
const currencyFormatter = require('currency-formatter');

class NewMiscellaneousPayment extends Component {

	constructor(props) {
    super(props);
    this.state = {showWalletDetails: false}
  }

	componentWillMount() {
		let walletDetails = this.props.getWalletDetails();
		let paymentDetails = {}
		let booking = this.props.getBooking(JSON.parse(localStorage.paymentObject).booking_id);
		let building = this.props.getBuilding(JSON.parse(localStorage.activeBooking).property.building_id);
		if(JSON.parse(localStorage.paymentObject).payment_type === 1) {
			paymentDetails = this.props.getFinePaymentDetails(JSON.parse(localStorage.paymentObject).id);
		}
		if(JSON.parse(localStorage.paymentObject).payment_type === 0) {
			paymentDetails = this.props.getOtherDuePaymentDetails(JSON.parse(localStorage.paymentObject).id);
		}
		let properties = this.props.getPropertiesForBuilding(JSON.parse(localStorage.activeBooking).property.building_id);
		let rooms = this.props.getRooms(JSON.parse(localStorage.activeBooking).property.building_id, JSON.parse(localStorage.activeBooking).property.id);
	}

	toggleWalletDetails = () => {
		this.setState({showWalletDetails: true})
	}

  render () {
  	if(this.props.paymentDetails && this.props.booking) {
	  	let booking = this.props.booking;
	  	let building = this.props.building;
	  	let userData = JSON.parse(localStorage.userData);
	  	let rent = 0;
	  	let maintenance = 0;
	  	let bookingType = '';
	  	let property = JSON.parse(localStorage.activeBooking).property;
	  	let room = this.props.rooms.filter(
	  		(room) => {
	  			return room.id == booking.room_id
	  		}
	  	)[0]
	  	switch(booking.bookingtype) {
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
  	
	    return (
	    	<div>
	    		<WebHeader />
		      <div className="container container-xl">
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
					          <h5>{building ? building.name : 'Homigo Building'}</h5>
					          <p>{building ? building.address : 'Homigo Building Address'}</p>
					        </div>
					        <div className="card-body card-padding">
					          <dl className="dl-horizontal"><dt>House Type</dt><dd>{property.label}</dd></dl>
					          <dl className="dl-horizontal"><dt>House ID</dt><dd>{property.id}</dd></dl>
					          <dl className="dl-horizontal"><dt>Booking Type</dt><dd>{bookingType}</dd></dl>
					          <dl className="dl-horizontal"><dt>Move In Date</dt><dd>{booking.start_date}</dd></dl>
					        </div>
					      </div>
					      <p style={{marginTop: '10px'}}>
		            	<a href="/home">{'<'} Back</a>
		            </p>
					    </div>

					    <div className="col-md-6">
					      <div className="card">
					        <div className="card-header">
					          <h4 className="c-gray">Miscellaneous Payment Details</h4><hr />
					        </div>
					        <div className="card-body card-padding">
					          <dl className="dl-horizontal">
					            <dt>Booking ID</dt>
					            <dd>{booking.id}</dd>
					          </dl>
					          <dl className="dl-horizontal">
				              <dt>Payable Amount</dt>
				              <dd className="price"> {currencyFormatter.format(Math.ceil(this.props.paymentDetails.amount/1.018), {code: 'INR'}).split('.')[0]} </dd>
				            </dl>
				            <p> &nbsp;By paying you agree with our with <a href="/tnc" target="_blank" style={{color:"#664ea0"}}>Terms and Conditions</a></p>
				            <br />
					          <div className="card">
					            <div className="clearfix">
					            	<div className="col-md-12 col-sm-12 col-xs-12" style={{paddingLeft: '0'}}>
					            		{this.props.walletDetails
					            			?
					            			(
					            				<div>
						            				<div style= {{
										            	margin: '2% 0%',
															    padding: '4%',
															    float: 'left',
															    boxShadow: '2px 2px 10px 1px #00000012'
															    
										            }}
										            >
										            	<h5 style={{marginBottom: '1%'}}>Deposit Details</h5>
										            	<h5 style={{marginBottom: '1%'}}>Amount : {currencyFormatter.format(Math.ceil(this.props.paymentDetails.amount/1.018), {code: 'INR'}).split('.')[0]} </h5>
										            	<h5 style={{marginBottom: '1%'}}>Account Name : Homigo Realty Private Limited </h5>
										            	<h5 style={{marginBottom: '1%'}}>Account Number : {this.props.walletDetails.account_no}</h5>
										            	<h5 style={{marginBottom: '2%'}}>IFSC : {this.props.walletDetails.ifsc_code} <br /><small>The fifth character is 'zero'</small></h5>
										            	<hr />
										            	<p><small>Pay with <strong>0</strong>% transaction fee</small></p>
										            	<p><small>Use IMPS / NEFT to add money to your wallet</small></p>
										            	<p><small>Add money in your wallet and forget your bills</small></p>
										            </div>
										            <div className="col-md-12 col-sm-12 col-xs-12" style={{paddingLeft: '0'}}>
											          	<p className="paymentbutton-or">Or</p>
											          </div>
											        </div>
								            )
					            			:
					            			''
					            		}
							          </div>
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
								            <p><small>{this.props.walletDetails ? 'Pay with' : ''} <strong>1.8</strong>% payment gateway transaction fee</small></p>
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
	  }
		else {
			return (
				<div>
					<WebHeader />
					<Preloader />
					<WebFooter />
				</div>
			)
		}
  }

}

function mapStateToProps(state) {
	return {
		paymentDetails: state.payments.paymentData, 
		properties: state.buildings.properties, 
		rooms: state.buildings.rooms, 
		building: state.buildings.building,
		booking: state.bookings.booking,
		walletDetails: state.wallet.details
	};
}

export default connect( mapStateToProps, {getBooking: getBooking, getBuilding: getBuilding, getPropertiesForBuilding: getPropertiesForBuilding, getRooms: getRooms, getFinePaymentDetails: getFinePaymentDetails, getOtherDuePaymentDetails: getOtherDuePaymentDetails, getWalletDetails: getWalletDetails})(NewMiscellaneousPayment);



