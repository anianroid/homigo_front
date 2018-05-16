import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import DashboardHome from './DashboardHome';
import Payments from './Payments';
import Bookings from './Bookings';
import Documents from './Documents';
import Preloader from './Preloader';
import Wallet from './Wallet';
import Care from './Care';
import {getPendingOtherDues, getPendingMonthlyRents, getPendingFines, getAgreementForBooking, getWalletDetails, getWalletTransactions, getBuilding} from '../actions/index.js';

require ('../stylesheets/client_db.css');


class DashboardContent extends Component {

	componentWillMount() {
    let pendingMonthlyRents = this.props.getPendingMonthlyRents();
    let pendingFines = this.props.getPendingFines();
    let pendingOtherDues = this.props.getPendingOtherDues();
    let walletDetails = this.props.getWalletDetails();
    let walletTransactions = this.props.getWalletTransactions();
    console.log(JSON.parse(localStorage.activeBooking).property.building_id);
    let building = this.props.getBuilding(JSON.parse(localStorage.activeBooking).property.building_id);
  }



	render() {
		if(this.props.activeBooking && this.props.pendingOtherDues && this.props.pendingMonthlyRents && this.props.pendingFines) {
			switch(this.props.view) {
				case 'payments':
					return(
						<Payments 
							pendingOtherDues = {this.props.pendingOtherDues}
							pendingFines = {this.props.pendingFines}
							pendingMonthlyRents = {this.props.pendingMonthlyRents}
							paidPayments={this.props.payments.filter(payment => payment.status === 1)}
						/>
					)
				case 'bookings':
					return(
						<Bookings 
							bookings={this.props.bookings} 
						/>
					)
				case 'documents':
					return(
						<Documents 
							documents={this.props.documents} 
							uploadDocument={this.props.uploadDocument}
							user_doc_details = {this.props.user_doc_details}
						/>
					)
				case 'care':
					return(
						<Care activeBooking={this.props.activeBooking} building={this.props.building}/>
					)
				case 'wallet':
					return (
						<Wallet
							walletTransactions = {this.props.walletTransactions}
							walletDetails = {this.props.walletDetails}
						/>
					)
				default: 
					return(
						<DashboardHome 
							houseId={this.props.activeBooking.property_id}
			  			end_term_charges={this.props.activeBooking.end_term_charges} 
			  			rent={this.props.activeBooking.rent}
			  			start_date={this.props.activeBooking.start_date}
			  			select = {this.props.property ? this.props.property.select : null}
			  			property_name = {this.props.property ? this.props.property.name : null}
			  			location = {this.props.property ? this.props.property.landmark : null}
			  			security_deposit = {localStorage.activeBooking ? JSON.parse(localStorage.activeBooking).securitydeposit.amount : null}
			  			move_out_date = {this.props.activeBooking ? this.props.activeBooking.end_date : null}
			  			changeDbView={this.props.changeDbView}
			  			lockin = {localStorage.activeBooking ? JSON.parse(localStorage.activeBooking).lockin : null}
			  			getAgreementForBooking = {this.props.getAgreementForBooking}
			  		/>
					)
			}
		}
		else {
			return (
				<div>
					<Preloader />
				</div>
			)
		}
	}
}

function mapStateToProps(state) {
	return {
		pendingMonthlyRents: state.payments.pending.monthlyRents,
		pendingOtherDues: state.payments.pending.otherDues,
		pendingFines: state.payments.pending.fines,
		walletDetails: state.wallet.details,
		walletTransactions: state.wallet.all,
		building: state.buildings.building

	}
}

export default connect(mapStateToProps, {getPendingOtherDues: getPendingOtherDues, getPendingMonthlyRents: getPendingMonthlyRents, getPendingFines: getPendingFines, getAgreementForBooking: getAgreementForBooking, getWalletTransactions: getWalletTransactions, getWalletDetails: getWalletDetails, getBuilding: getBuilding})(DashboardContent);



