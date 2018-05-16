import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {API_URL} from '../actions/types.js';
require ('../stylesheets/client_db.css');
const currencyFormatter = require('currency-formatter');


class DashboardHome extends Component {


	getAgreementToken(id) {
		this.props.getAgreementForBooking(id)
		.then(
			(response) => {
				window.open(`${API_URL}/bookings/${id}/download_agreement?token=${response.payload.data.token}`)
			}
		)
	}

	render() {
		let move_out_date = '--';
		if(this.props.move_out_date) {
			move_out_date = this.props.move_out_date;
		}
		return (
  		<div className="wrapper clearfix">
	      <section className="clearfix" id="dashboardHomeSection">
	        <div className="col-md-3 col-sm-3 col-xs-3">
	          <div className="home-content-side-wrapper">
	            <div>
	              <p>House ID</p>
	              <h2 style={{marginTop: '0'}}><span id="property_id">{this.props.houseId}</span></h2>
	              <p id="select">{this.props.select==3?'Full House':'Shared House'}</p>
	              <p id="property_name">{this.props.property_name ? this.props.property_name : '--'}</p>
	            </div>
	          </div>
	        </div>
	        <div className="col-md-9 col-sm-9 col-xs-9" style={{width: '65%'}}>
	          <div className="content-container">
	            <div className="col-md-4 col-sm-4 col-xs-6">
	              <p><small>Move in Date</small></p>
	              <h4 id="move_in_date">{ this.props.start_date ? this.props.start_date : '--' }</h4><br />
	              <p><small>Lockin Period</small></p>
	              <h4 id="lockin">{ this.props.lockin ? this.props.lockin : '--' } Month(s)</h4><br />
	              <p><small>Monthly Rent</small></p>
	              <h4 id="monthlyrent">{ this.props.rent ? currencyFormatter.format(this.props.rent, {code: 'INR'}).split('.')[0] : '--' }</h4> 
	            </div>
	            <div className="col-md-4 col-sm-4 col-xs-6">
	              <p><small>End Term Charges</small></p>
	              <h4 id="end_term_charges">{ this.props.end_term_charges ? currencyFormatter.format(this.props.end_term_charges, {code: 'INR'}).split('.')[0] : '--' }</h4><br />
	              <p><small>Security Deposit</small></p>
	              <h4 id="securitydeposit">{this.props.security_deposit ? currencyFormatter.format(this.props.security_deposit, {code: 'INR'}).split('.')[0] : '--'}</h4><br />
	              <p><small>Move out date <a style={{cursor: 'pointer'}} onClick={() => {this.props.changeDbView('bookings')}}><i className="fa fa-info-circle" aria-hidden="true"></i></a></small></p>
	              <h4 id="move_out_date">{move_out_date}</h4>
	            </div>

	            <div className="col-md-4 col-sm-4 col-xs-12" style={{paddingLeft: '0px', paddingTop: '2em'}}>

	              <div className="home-downloads-wrapper">
	                <button className="btn btn-primary btn-sm" onClick={() => this.getAgreementToken(JSON.parse(localStorage.activeBooking).id)} style={{marginBottom: '10px'}}>View Agreeemnt</button>
	                <br/><br/>
	                <a href="#" target="_blank" className="btn btn-primary btn-sm disabled" style={{marginBottom: '10px'}}>Terms of Tenancy</a>
	              </div>

	              <div className="home-downloads-mobile-wrapper clearfix">
	                <a href="/mybookings/{ @bookings[0].id }/agreement/" className="btn btn-primary btn-sm" style={{display: 'inline-block'}}>View Agreeemnt</a>
	                <a href="/mybookings/{ @bookings[0].id }/terms_of_tenancy" className="btn btn-primary btn-sm" style={{display: 'inline-block'}}>Terms of Tenancy</a>
	              </div>
	            </div>
	          </div>
	        </div>
	      </section>
			</div>
  	);
	}
}


export default connect(null)(DashboardHome);