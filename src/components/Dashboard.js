import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import WebFooter from './WebFooter';
import WebHeader from './WebHeader';
import {getBookings, getActiveBookings, getPayments, getDocuments, changeDashboardView, uploadDocument, getPendingOtherDues, getPendingMonthlyRents, getPendingFines} from '../actions/index.js';
import {userLogout} from '../actions/sessionActions.js';
import DashboardHome from './DashboardHome';
import swal from 'sweetalert2';
import {browserHistory} from 'react-router';
import Payments from './Payments';
import Preloader from './Preloader';
import DashboardHeader from './DashboardHeader';
import DashboardNavBar from './DashboardNavBar';
import DashboardContent from './DashboardContent';
require ('../stylesheets/client_db.css');
require ('../stylesheets/home.css');


class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.props.getPendingOtherDues();
    this.props.getPendingMonthlyRents();
    this.props.getPendingFines();
	}

	componentWillMount() {
    let bookings = this.props.getBookings();
    let activeBookings = this.props.getActiveBookings();
    let payments = this.props.getPayments();
    let documents = this.props.getDocuments();
    let current_user = JSON.parse(localStorage.getItem('userData'));
  }

	render() {
		let deposits_check = false;
		let documents_check = true;
		let compatibility_check = false;
		let totalDue = localStorage.activeBooking ? JSON.parse(localStorage.getItem('activeBooking')).total_dues : 0;
		let payments_unpaid = [];
		if(localStorage.activeBooking) {
			if(JSON.parse(localStorage.activeBooking).securitydeposit.amount - JSON.parse(localStorage.activeBooking).securitydeposit.paid === 0) {
				deposits_check = true;
			}
		}
		this.props.documents.filter(
			(document) => {
				if(!document.verified) {
					documents_check = false;
				}
			}
		)
		if(this.props.activeBooking.id)
			return (
				<div>
					<WebHeader 
						location={this.props.location.pathname} 
					/>
					<DashboardHeader 
						payments={this.props.payments}
						currentUser = {JSON.parse(localStorage.userData)} 
						deposits_check={deposits_check} 
						documents_check={documents_check} 
						compatibility_check={false} 
						totalDue={totalDue} 
						changeDbView = {this.props.changeDashboardView}
						userLogout = {this.props.userLogout}
					/>
			    <DashboardNavBar 
			    	handleDbNavClick={this.props.changeDashboardView}
			    />
			    <DashboardContent 
			    	bookings={this.props.bookings}
			    	activeBooking={this.props.activeBooking}
			    	payments={this.props.payments} 
			    	documents={this.props.documents}
			    	uploadDocument={this.props.uploadDocument} 
			    	view={this.props.dashbaordView}
			    	property={JSON.parse(localStorage.activeBooking).property}
			    	changeDbView={this.props.changeDashboardView}
			    	user_doc_details = {this.props.user_doc_details}
			    />
					<WebFooter />
				</div>
			);
		else
			{
				if(this.props.bookings.length > 0) {
					return (
						<div>
							<WebHeader />
							<DashboardHeader 
								payments={this.props.payments}
								currentUser = {JSON.parse(localStorage.userData)} 
								deposits_check={deposits_check} 
								documents_check={documents_check} 
								compatibility_check={false} 
								totalDue={totalDue} 
								changeDbView = {this.props.changeDashboardView}
								userLogout = {this.props.userLogout}
							/>
							<DashboardNavBar 
					    	handleDbNavClick={this.props.changeDashboardView}
					    />
							<DashboardContent 
					    	bookings={this.props.bookings}
					    	activeBooking={this.props.activeBooking}
					    	payments={this.props.payments} 
					    	documents={this.props.documents}
					    	uploadDocument={this.props.uploadDocument} 
					    	view={this.props.dashbaordView}
					    	property={localStorage.activeBooking ? JSON.parse(localStorage.activeBooking).property : null}
					    	changeDbView={this.props.changeDashboardView}
					    	user_doc_details = {this.props.user_doc_details}
					    />
							<WebFooter />
						</div>
					)
				}
				else {
					return (
						<div>
							<WebHeader />
							<DashboardHeader 
								payments={this.props.payments}
								currentUser = {JSON.parse(localStorage.userData)} 
								deposits_check={deposits_check} 
								documents_check={documents_check} 
								compatibility_check={false}
								totalDue={totalDue} 
								changeDbView = {this.props.changeDashboardView}
								userLogout = {this.props.userLogout}
							/>
							<DashboardNavBar 
					    	handleDbNavClick={this.props.changeDashboardView}
					    />
							<Preloader />
							<WebFooter />
						</div>
					)
				}
			}
	}
}

function mapStateToProps(state) {
	return {
		current_user: JSON.parse(localStorage.userData) || {},
		bookings: state.bookings.all || [],
		activeBooking: state.bookings.active || [],
		payments: state.payments.all || [],
		documents: state.documents.all || [],
		dashbaordView: state.dashboardView.dashboardView || '',
		user_doc_details: state.documents.user_doc_details || ''
	}
}

export default connect(mapStateToProps, {getBookings: getBookings, getActiveBookings: getActiveBookings, getPayments: getPayments, getDocuments: getDocuments, changeDashboardView: changeDashboardView, uploadDocument: uploadDocument, getPendingOtherDues: getPendingOtherDues, getPendingMonthlyRents: getPendingMonthlyRents, getPendingFines: getPendingFines, userLogout: userLogout})(Dashboard);











