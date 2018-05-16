import React from 'react';
import {Component} from 'react'; 
const currencyFormatter = require('currency-formatter');
class Wallet extends Component {

	constructor(props) {
		super(props);
	}

	renderWalletTransactions = () => {
		return(
			this.props.walletTransactions.map((item, index) => {
				return (
					<div key={index} className="tile payment wallet-item cleafix">
						<div>
							<div className="tile-header clearfix">
						  	<div className="col-md-4 col-sm-4 col-xs-4">
						  		<p><small>Amount</small></p>
						    	<h4 className={item.amount < 0 ? "margin-top1percent red" : "margin-top1percent green"}>{item.amount < 0 ? currencyFormatter.format(item.amount*-1, {code: 'INR'}).split('.')[0] : currencyFormatter.format(item.amount, {code: 'INR'}).split('.')[0]}</h4>
							  </div>
						  	<div className="col-md-4 col-sm-4 col-xs-4">
						    	<p><small>Payment Type</small></p>
						    	<p className="margin-top5">{item.amount > 0 ? 'Credit' : 'Debit'} {item.due_type ? ' ('+item.due_type+')' : ''}</p>
						  	</div>
						  	<div className="col-md-2 col-sm-2 col-xs-4">
						    	<p><small>Date</small></p>
						    	<p className="margin-top5">{item.created_at.split('T')[0]}</p>
						  	</div>
							</div>
						</div>
					</div>
				)
			})
		);
	}

	render() {
		if(this.props.walletDetails && this.props.walletTransactions.length <= 0) {
			console.log(this.props.walletDetails);
			return (
				<div className="wrapper clearfix">
				  <section className="clearfix">
				  	<div className="tile payment wallet-item cleafix" style={{borderBottom: 'none'}}>
							<div className="wallet-tile-top">
								<div className="tile-header clearfix" style={{paddingBottom: '1%'}}>
									<div className="col-md-4 col-sm-4 col-xs-12">
							    	<p><h5>Balance</h5></p>
							    	<h4 style={{marginBottom: '0'}}>{currencyFormatter.format(this.props.walletDetails.balance, {code: 'INR'}).split('.')[0]}</h4>
							  	</div>
							  	<div className="col-md-4 col-sm-4 col-xs-12">
							  		<p><h5>Account No.</h5></p>
							    	<h4 style={{marginBottom: '0'}}>{this.props.walletDetails.account_no}</h4>
								  </div>
							  	<div className="col-md-2 col-sm-2 col-xs-12" style={{paddingLeft: '0'}}>
							    	<p><h5>IFSC Code</h5></p>
							    	<h4 style={{marginBottom: '0'}}>{this.props.walletDetails.ifsc_code} <br /><small>The fifth character is 'zero'</small></h4>
							  	</div>
								</div>
								<p>
					  			<small>Use NEFT / IMPS to deposit money</small>
					  		</p>
							</div>
						</div>

				  	<div className="wallet-log-wrapper">
				  		<h4 style={{marginTop: '5%', textAlign: 'center'}}>No transactions found!</h4>
					  	
						</div>


				  </section>
				</div>
			);	
		}
		if(this.props.walletDetails && this.props.walletTransactions.length > 0) {
			return (
				<div className="wrapper clearfix">
				  <section className="clearfix">
	

				  	<div 
				  		className="tile payment wallet-item cleafix" 
				  		style={{
				  			borderBottom: 'none',
						    marginBottom: '2%',
						    boxShadow: '2px 2px 10px 1px #0000000f',
						    padding: '1%',
						    borderRadius: '2px'
				  		}}
				  	>
							<div className="wallet-tile-top">
								<div className="tile-header clearfix" style={{paddingBottom: '1%'}}>
									<div className="col-md-4 col-sm-4 col-xs-12">
							    	<p><h5>Balance</h5></p>
							    	<h4 style={{marginBottom: '0'}}>{currencyFormatter.format(this.props.walletDetails.balance, {code: 'INR'}).split('.')[0]}</h4>
							  	</div>
							  	<div className="col-md-4 col-sm-4 col-xs-12">
							  		<p><h5>Account No.</h5></p>
							    	<h4 style={{marginBottom: '0'}}>{this.props.walletDetails.account_no}</h4>
								  </div>
							  	<div className="col-md-3 col-sm-3 col-xs-12" style={{paddingLeft: '0'}}>
							    	<p><h5>IFSC Code</h5></p>
							    	<h4 style={{marginBottom: '0'}}>{this.props.walletDetails.ifsc_code} <br /><small>The 5th character is 'zero'</small></h4>
							  	</div>
								</div>
								<p>
					  			<small>Use NEFT / IMPS to deposit money</small>
					  		</p>
							</div>
						</div>

				  	<div className="wallet-log-wrapper">					  	
				  		{this.renderWalletTransactions()}
						</div>
				  </section>
				</div>
			);
		}
		else {
			return (
				<div className="wrapper clearfix">
				  <section className="clearfix bookings-section">
						<div className="text-center">
							<h4>No wallet data found! Book a house to get started.</h4>
							<a className="btn btn-primary" href="/houses">Explore houses</a>
						</div>
				  </section>
				</div>
			);
		}
	}
}


export default Wallet;





