import React, {Component} from 'react';
import {API_URL} from '../actions/types.js';
import { Modal } from 'react-bootstrap';
import {connect} from 'react-redux';
import {moveoutRequest, getAgreementForBooking} from '../actions/index.js';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';
import { extendMoment } from 'moment-range';
require('../stylesheets/client_db.css');
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding								: '0',
    borderWidth						: '1px',
    borderRadius          : '0'
  }
};
class Bookings extends Component {
	
	state = {
		modalIsOpen: false,
		end_date: '',
		accName: '',
		accNo: '',
		ifsc: '',
		booking_id: '',
		focused: false
	}
	setDate(date) {
		this.setState({end_date: date})
	}
	openModal = () => {
		this.setState({modalIsOpen: true})
	}
	afterOpenModal = () => {
		return true;
	}
	closeModal = () => {
		this.setState({modalIsOpen: false})
	}
	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value})
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.moveoutRequest(this.state)
		.then(
			(
				response => {
					this.setState({modalIsOpen: false})
				}
			)
		)
		.catch(error =>{
	  	this.setState({modalIsOpen: false})
	  })
	}
	getAgreementToken(id) {
		this.props.getAgreementForBooking(id)
		.then(
			(response) => {
				window.open(`${API_URL}/bookings/${id}/download_agreement?token=${response.payload.data.token}`)
			}
		)
	}
	renderModal = () => {
		const Moment = extendMoment(moment);
		const start = moment()
		const end = moment().add(30, 'days')
		const range = Moment.range(start, end)
		const arrayOfDates = Array.from(range.by('days'))
		const BAD_DATES = arrayOfDates;
		const isDayBlocked = day => BAD_DATES.filter(d => d.isSame(day, 'day')).length > 0;
		return(
			<Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
        <Modal.Header>
        	<h4 className="modal-title"><span>Move out request for Booking #{this.state.booking_id}</span></h4>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label style={{width: '100%'}}>
                	Moveout Date <small>Should be at least 30 days from now</small><br/>
                	<SingleDatePicker
									  date={this.state.end_date}
									  onDateChange={date => {this.setDate(date)}}
									  focused={this.state.focused}
										onFocusChange={({ focused }) => this.setState({ focused })}
										numberOfMonths = {1}
										hideKeyboardShortcutsPanel = {true}
										isDayBlocked={isDayBlocked}
									/>
                </label>
              </div>
              <div className="form-group">
              	<label style={{width: '100%'}}>
                	Full Name
                	<input name="accName" type="text" className="form-control" id="full_name" onChange={this.handleChange} placeholder="Enter your name registered with the bank" />
                </label>
              </div>
              <div className="form-group">
              	<label style={{width: '100%'}}>
                	Bank A/C No.
                	<input name="accNo" type="text" className="form-control" id="acc_no" onChange={this.handleChange} placeholder="Enter your Account No" />
                </label>
              </div>
              <div className="form-group">
              	<label style={{width: '100%'}}>
                	IFSC
                	<input name="ifsc" type="text" className="form-control" id="ifsc" onChange={this.handleChange} placeholder="Enter Bank branch IFSC" />
                </label>
              </div>
              <br/>
              <div className="form-inline">	
              	<div class="form-group">
              		<button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>Move out</button>
              	</div> 
              	<div class="form-group">
              		<a className="btn btn-primary" onClick={this.closeModal}>Close</a>
              	</div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
		)
	}
	renderBookings() {
		return this.props.bookings.filter(booking => (booking.activated || booking.closed) ).map((booking, index) => {
			return (
				<div key={booking.id}>
					<div className="col-md-4">
			      <div className="item wrapper booking item-booking">
			        <div className="item-header" style={{color: '#333'}}>
			          <h3>House ID : {booking.property_id}</h3>
			        </div>
			        <div className="item-body">
			          <div className="group">
			            <small>Occupancy Type</small>
			            <p>{booking.property.select !== 3 ? 'Shared Occupancy' : 'Full Occupancy'} in {booking.property.name}</p>
			          </div>
			          <div className="group">
			            <small>Address</small>
			            <p>{booking.property.address}</p>
			          </div>
			          <div className="group">
			            <small>Staying since</small>
			            <p>{booking.start_date}</p>
			          </div>
			        </div>
			        <div className="item-footer clearfix">
			              <div className="pull-right text-right">
			                <p>Booking Status : <span className={booking.activated ? 'green' : 'red'}>{booking.activated ? 'Activated' : 'Closed'}</span></p>
				            		{booking.activated ? (<button className="btn btn-primary btn-light" style={{marginTop: '0em'}} onClick={() => {this.getAgreementToken(booking.id)}}>Agreement</button>) : ('')}
				            		{booking.activated ? (<button data-toggle="modal" className="btn btn-primary btn-light" onClick={() => {this.openModal(); this.setState({booking_id: booking.id})}}>Move Out</button>) : ('')}
			              </div>
			          </div>
			      </div>
			    </div>
			  </div>
		  )
		})
	}
	render() {
		if(this.props.bookings.filter(booking => !booking.end_date).length > 0)
			return (
				<div className="wrapper clearfix">
					{this.renderModal()}
				  <section className="clearfix bookings-section">
			    	{this.renderBookings()}
				  </section>
				</div>
			)
		else 
			return (
				<div className="wrapper clearfix">
				  <section className="clearfix bookings-section">
						<div className="text-center">
							<h4>Looks pretty empty in here!</h4>
							<a className="btn btn-primary" href="/houses">Explore houses</a>
						</div>
				  </section>
				</div>
			)
	}
}

export default connect( null, {moveoutRequest: moveoutRequest, getAgreementForBooking:getAgreementForBooking})(Bookings);



