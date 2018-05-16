import React, {Component} from 'react';
import {recordTokenPayment} from '../actions/index';
import {connect} from 'react-redux';
class Checkout extends React.Component {
  state = {
    amount: 100,
    data: {"payment":{"booking_id":28,"payment_type":1,"parent_id":28,"amount":10000,"tax_charged":0},"razorpay_payment_id":"pay_9LsIugzACGwTCJ"}
  };

  constructor() {
    super()
    this.changeAmount = this.changeAmount.bind(this);
    this.openCheckout = this.openCheckout.bind(this);
    this.razorpayOptions = this.razorpayOptions.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  sendData(id) {
    this.props.recordTokenPayment({"payment":{"booking_id":this.props.bookingId,"payment_type":this.props.paymentType,"parent_id":this.props.parentId,"amount":this.props.amount,"tax_charged":0},"razorpay_payment_id":id});
  }

  razorpayOptions(sendData) {
    
    return {
      "key": this.props.razorpayKey,
      "amount": this.props.razorpayAmount,
      "name": this.props.name,
      "description": this.props.razorpayDescription,
      "handler": function(response) {
        sendData(response.razorpay_payment_id)
      },
      "prefill": {
        "name": JSON.parse(localStorage.userData).name,
        "contact": JSON.parse(localStorage.userData).number,
        "email": JSON.parse(localStorage.userData).email
      },
      "theme": {
        "color": "#664ea0"
      }
    };
  }

  componentWillMount(){
    this.rzp = new window.Razorpay(this.razorpayOptions(this.sendData));
    this.razorpayOptions = this.razorpayOptions.bind(this);
    this.sendData = this.sendData.bind(this);
  }


  changeAmount(e) {
    this.setState({amount: e.target.value})
  }

  openCheckout() { 
    this.rzp.open()
  }
  
  render () {
    return (
      <div>
        <a style={{color: '#664ea0'}} onClick={this.openCheckout}>Pay Rs. {this.props.razorpayAmount/100}</a> 
      </div>
    )
  }
}

export default connect(null,{recordTokenPayment: recordTokenPayment})(Checkout);
