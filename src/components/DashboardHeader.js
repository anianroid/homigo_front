import React, {Component} from 'react';
import {Link} from 'react-router';
import Preloader from './Preloader';
import ReactTooltip from 'react-tooltip';
require ('../stylesheets/client_db.css');


class DashboardHeader extends Component {

	render() {
		if(localStorage.pendingFines.length > 0 && localStorage.pendingFines.length > 0) {
			if(this.props.currentUser) {
				let currentUser = this.props.currentUser;
				let pendingMonthlyRentsArray = localStorage.pendingMonthlyRents ? JSON.parse(localStorage.pendingMonthlyRents) : [];
		    let pendingFinesArray = localStorage.pendingFines ? JSON.parse(localStorage.pendingFines) : []
		    let pendingOtherDuesArray = localStorage.otherDues ? JSON.parse(localStorage.pendingOtherDues) : [];
				let totalPendingMonthlyRent = pendingMonthlyRentsArray.length > 0 ? pendingMonthlyRentsArray.map(item => item.amount).reduce((a,b) => a+b) : 0;
				let totalPendingFine = pendingFinesArray.length > 0 ? pendingFinesArray.map(item => item.amount).reduce((a,b) => a+b) : 0;
				let totalPendingOtherDue = pendingOtherDuesArray.length > 0 ? pendingOtherDuesArray.map(item => item.amount).reduce((a,b) => a+b) : 0;
				let pendingSecuritydeposit = localStorage.activeBooking ? JSON.parse(localStorage.activeBooking).securitydeposit.amount - JSON.parse(localStorage.activeBooking).securitydeposit.paid : '--';
				let totalDue = totalPendingMonthlyRent+totalPendingFine+totalPendingOtherDue+pendingSecuritydeposit;
				return (
					<div>
						<section className="tenant-db-header row">
				      <div className="wrapper header-wrapper clearfix">
				        <div className="col-md-4 col-sm-4 col-xs-12">
				          <div className="col-md-4 col-sm-4 col-xs-12">
				            <div className="profile-image">
				                <img src={currentUser.image ? currentUser.image : require('../assets/images/avatar.png')} />
				            </div>
				          </div>
				          <div className="col-md-8 col-sm-8 col-xs-12">
				            <h3 className="profile-name">{currentUser.name}<br/><a href="/editProfile"><span style={{fontSize: '0.7em', opacity: '0.6'}}>Edit Profile</span></a> <a><span style={{fontSize: '0.7em', opacity: '0.6'}}>|</span></a> <a onClick={this.props.userLogout}><span style={{fontSize: '0.7em', opacity: '0.6'}}>Logout</span></a></h3>
				            <div className="profile-details">
				              <p>{currentUser.email}</p>
				              <p>{currentUser.number}</p>
				            </div>
				          </div>
				        </div>
			          <div className="col-md-4 col-sm-4 col-xs-12">
			            <div className="progress-wrapper">
			              <div className="progress-track">
			                <div className={this.props.documents_check?"progress-bubble bubble-first primarybg":"progress-bubble bubble-first graybg" }></div>
			                <div className={this.props.deposits_check?"progress-bubble bubble primarybg":"progress-bubble bubble graybg" }></div>
			                <div className={this.props.compatibility_check?"progress-bubble bubble-last primarybg":"progress-bubble bubble-last graybg" }></div>
			              </div>
			              <div className="progress-labels">
			                <div className="progress-label">Documents</div>
			                <div className="progress-label">Security Deposit</div>
			                <div className="progress-label">Compatibility</div>
			              </div>
			            </div>        
			          </div>
				        <div className="col-md-4 col-sm-4 col-xs-12" style={{border: '0px'}}>
				          <div className="pay-now">
				            <p>Total Due</p><h2 id="totaldue"> ₹ <a onClick={() => {this.props.changeDbView('payments')}}>{totalDue}</a></h2>
				            <a data-tip={`<small>Monthly Rent &#8377; ${totalPendingMonthlyRent}</small><br><small>Security Deposit &#8377;${pendingSecuritydeposit}</small><br><small>Fine &#8377; ${totalPendingFine}</small><br><small>Other Due &#8377; ${totalPendingOtherDue}</small>`} data-html={true} data-place="right" style={{fontSize: '0.8em'}}><i className="fa fa-info-circle" aria-hidden="true"></i></a>
				            <ReactTooltip type="dark" effect="solid"/>
				          </div>
				        </div>
				      </div>
				    </section>
				    <section className="tenant-db-header-mobile row">
				      <div className="col-xs-12">
				        <h2 className="profile-name">{ currentUser.name }</h2>
				        <div className="profile-details">
				          <p>{ currentUser.email }</p>
				          <p>{ currentUser.number }</p>
				        </div><br />
				      </div>
				      <div className="col-xs-12">
			          <div className="progress-wrapper">
		              <div className="progress-track">
		                <div className={this.props.documents_check?"progress-bubble bubble-first primarybg":"progress-bubble bubble-first graybg" }></div>
		                <div className={this.props.deposits_check?"progress-bubble bubble primarybg":"progress-bubble bubble graybg" }></div>
		                <div className={this.props.compatibility_check?"progress-bubble bubble-last primarybg":"progress-bubble bubble-last graybg" }></div>
		              </div>
		              <div className="progress-labels">
		                <div className="progress-label">Documents</div>
		                <div className="progress-label">Security Deposit</div>
		                <div className="progress-label">Compatibility</div>
		              </div>
		            </div>
				      </div>
				    </section>
					</div>
				);
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


export default DashboardHeader;


