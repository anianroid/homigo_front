import React from 'react';
import {browserHistory} from 'react-router';
import {Component} from 'react'; 
class Payments extends Component {

	constructor(props) {
    super(props);
    this.state = {pendingPayments: [...this.props.pendingOtherDues.map(item => {return{...item, payment_url: '/payments/new/miscellaneous', payment_type: 0}}), ...this.props.pendingFines.map(item => {return {...item, payment_url: '/payments/new/miscellaneous', payment_type: 1}}), ...this.props.pendingMonthlyRents.map(item => {return {...item, payment_url: '/payments/new/rent', payment_type: 2}})], paidPayments: this.props.paidPayments, depositValue: null}
  }

	pendingPaymentsFilter(filter) {
		switch(filter) {
			case 0:
				this.setState({pendingPayments: [...this.props.pendingOtherDues.map(item => {return{...item, payment_url: '/payments/new/miscellaneous', payment_type: 0}})]})
				break;
			case 1:
				this.setState({pendingPayments: [...this.props.pendingFines.map(item => {return {...item, payment_url: '/payments/new/miscellaneous', payment_type: 1}})]})
				break;
			case 2:
				this.setState({pendingPayments: [...this.props.pendingMonthlyRents.map(item => {return {...item, payment_url: '/payments/new/rent', payment_type: 2}})]})
				break;
			default:
				this.setState({pendingPayments: [...this.props.pendingOtherDues, ...this.props.pendingFines, ...this.props.pendingMonthlyRents]})
		}	
	}

	paidPaymentsFilter(filter) {
		if(filter) {
			this.setState({paidPayments: this.props.paidPayments.filter(
				payment => payment.payment_type === filter
			)})
		}
		else {
			this.setState({paidPayments: this.props.paidPayments})
		}
	}

	parsePaymentType(paymentType) {
		switch(paymentType) {
			case 1: 
				return 'Miscellaneous'
			case 2:
				return 'Monthly Rent'
			default:
				return 'Miscellaneous'
		}
	}

	handlePayButtonClick = (payment) => {
		localStorage.setItem('paymentObject', JSON.stringify(payment)); 
		browserHistory.push(payment.payment_url);
	}

	pendingPaymentsRender = () => {
		return (
			this.state.pendingPayments.map(
				(payment, index) => {
					return(
						<div key={index} className="tile payment">
							<div>
								<div className="tile-header collapsed clearfix">
							  	<div className="col-md-3 col-sm-3 col-xs-3">
							    	<h4>&#8377; {payment.amount}</h4>
							    	<p><small>{payment.created_at.split('T')[0]}</small></p>
								  </div>
							  	<div className="col-md-4 col-sm-4 col-xs-4">
							    	<p><small>{this.parsePaymentType(payment.payment_type)}</small></p>
							    	<p>Booking #{payment.booking_id}</p>
							  	</div>
							  	<div className="col-md-5 col-sm-5 col-xs-4 text-center">
							    	<div style={{marginTop: '5px'}}><a className="btn btn-primary btn-light" onClick={() => {this.handlePayButtonClick(payment)}}>Pay</a></div>
							  	</div>
								</div>
							</div>
						</div>
					)		
				}
			)
		)
	}
	paidPaymentsRender() {
		return (
			this.state.paidPayments.map(
				(payment, index) => {
					return(
						<div key={index} className="tile payment">
							<div>
								<div className="tile-header collapsed clearfix">
							  	<div className="col-md-3 col-sm-3 col-xs-3">
							    	<h4>&#8377; {payment.amount}</h4>
							    	<p><small>{payment.created_at.split('T')[0]}</small></p>
								  </div>
							  	<div className="col-md-4 col-sm-4 col-xs-4">
							    	<p><small>{this.parsePaymentType(payment.payment_type)}</small></p>
							    	<p>Booking #{payment.booking_id}</p>
							  	</div>
							  	<div className="col-md-5 col-sm-5 col-xs-4 text-center">
							    	<div style={{marginTop: '5px'}}><a href={`payments/${payment.id}/receipt`} className="btn btn-primary btn-light">Receipt</a></div>
							  	</div>
								</div>
							</div>
						</div>
					)		
				}
			)
		)
	}
	pendingDepositRender() {
		if(JSON.parse(localStorage.activeBooking).securitydeposit.amount - JSON.parse(localStorage.activeBooking).securitydeposit.paid > 0) {
			return (
				<div className="tile payment">
					<div>
						<div className="tile-header collapsed clearfix">
					  	<div className="col-md-3 col-sm-3 col-xs-3">
					    	<h4>&#8377; {JSON.parse(localStorage.activeBooking).securitydeposit.amount - JSON.parse(localStorage.activeBooking).securitydeposit.paid}</h4>
						  </div>
					  	<div className="col-md-4 col-sm-4 col-xs-4">
					    	<p><small>Security Deposit</small></p>
					    	<p>Booking #booking id</p>
					  	</div>
					  	<div className="col-md-5 col-sm-5 col-xs-4 text-center">
					    	<div style={{marginTop: '5px'}}><input type="number" style={{marginTop: '0', marginRight: '0', display: 'inline-flex'}} className="form-control" onChange={(event) => {this.setState({depositValue: event.target.value})}}/>&nbsp;<a href="payments/new/deposit" onClick={() => {localStorage.setItem('depositValue', this.state.depositValue)}} className="btn btn-primary btn-light">Pay</a></div>
					  	</div>
						</div>
					</div>
				</div>
			)
		}
		else {
			return null;
		}
	}
	render() {
		if(this.state.paidPayments)
			return (
				<div className="wrapper clearfix">
				  <section className="clearfix">
				    <div id="pending_payments_desktop" className="col-md-6 col-sm-6 col-xs-12">
				      <p className="mobile-sub-head">Pending Payments</p>
				      <div id="pending_payments">
				        <div className="payments_filter">
				          <div className="form-inline" style={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>
				            <div className="form-group">
				              <div className="checkbox">
				                <label onClick={() => this.pendingPaymentsFilter(2)}> Monthly Rents</label>
				              </div>
				            </div>
				            <div className="form-group">
				              <div className="checkbox">
				                <label onClick={() => this.pendingPaymentsFilter(1)}> Fines</label>
				              </div>
				            </div>
				            <div className="form-group">
				              <div className="checkbox">
				                <label onClick={() => this.pendingPaymentsFilter(0)}> Other Dues</label>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div className="pending_payments_render">
				        	{this.pendingDepositRender()}
				          {this.pendingPaymentsRender()}
				        </div>
				      </div>
				    </div>
				    <div id="paid_payments_desktop" className="col-md-6 col-sm-6 col-xs-12">
				      <p className="mobile-sub-head">Successful Payments</p>
				      <div id="paid_payments">
				        <div className="payments_filter">
				          <div className="form-inline" style={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>
				            <div className="form-group">
				              <div className="checkbox">
				                <label onClick={() => this.paidPaymentsFilter(2)}> Monthly Rents</label>
				              </div>
				            </div>
				            <div className="form-group">
				              <div className="checkbox">
				                <label onClick={() => this.paidPaymentsFilter(1)}> Fines</label>
				              </div>
				            </div>
				            <div className="form-group">
				              <div className="checkbox">
				                <label onClick={() => this.paidPaymentsFilter(0)}> Other Dues</label>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div className="paid_payments_render">
				          {this.paidPaymentsRender()}
				        </div>
				      </div>
				    </div>
				    
				  </section>
				</div>
			);
		else
			return (
				<div className="wrapper clearfix">

				</div>
			);
	}
}


export default Payments;