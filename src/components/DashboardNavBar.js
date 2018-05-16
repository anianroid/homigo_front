import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import WebFooter from './WebFooter';
import WebHeader from './WebHeader';
import {getBookings, getPayments} from '../actions/index.js';
import DashboardHome from './DashboardHome';
import Payments from './Payments';
import DashboardHeader from './DashboardHeader';
require ('../stylesheets/client_db.css');


class DashboardNavBar extends Component {

	render() {
		return (
	    <section className="content mobile-nav-scroll">
	    	<div id="tenantdb-nav-wrapper" style={{display: 'table'}} className="container-fluid">
		      <div className="nav-wrapper clearfix">
		        <a href="/home"><div id="home_link" className="nav-item">Home</div></a>
		        <a onClick={() => this.props.handleDbNavClick('payments')}><div className="nav-item">Payments</div></a>
		        <a onClick={() => this.props.handleDbNavClick('documents')}><div className="nav-item">Documents</div></a>
		        <a onClick={() => this.props.handleDbNavClick('bookings')}><div className="nav-item">Bookings</div></a>
		        <a onClick={() => this.props.handleDbNavClick('care')}><div className="nav-item">Care</div></a>
		        <a onClick={() => this.props.handleDbNavClick('wallet')}><div className="nav-item">Transactions</div></a>
		      </div>
		    </div>
			</section>
		);
	}
}

export default DashboardNavBar;
