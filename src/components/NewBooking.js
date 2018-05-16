import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getRooms, getBuilding, createBooking, updateUserContact} from '../actions/index.js';
import WebHeader from './WebHeader';
import WebFooter from './WebFooter';
import Preloader from './Preloader';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import { Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController, isInclusivelyBeforeDay } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
require('../stylesheets/newBooking.css');
require('../stylesheets/datePicker.css');
const sharedRoomIcon = require('../assets/icons/shared_occupancy.png');
const fullRoomIcon = require('../assets/icons/single_occupancy.png');
const currencyFormatter = require('currency-formatter');
class NewBooking extends Component {

	constructor(props) {
    super(props);
    this.state = {booking: {start_date: null, room_id: null, furnishingtype: 0, bookingtype: 0}, focused: false, contact: '', modalIsOpen: false}
    this.onChange = this.onChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.setDate = this.setDate.bind(this);
  }
  openModal() {
    this.setState({modalIsOpen: true})
  }
  afterOpenModal() {
    return true;
  }
  closeModal() {
    this.setState({modalIsOpen: false})
  }
	onChange(event) {
		let field='start_date';
		if(event.target) {
			field = event.target.name;
		}
		let booking = this.state.booking;
		booking[field] = event.target.value;
		this.setState({booking: booking});
		if(field == 'bookingtype') {
			this.setState((state) => {
				return {booking: {...state.booking, room_id: null}}
			})
		}
	}
	contactChangeHandle = (event) => {
    return this.setState({contact: event.target.value});
	}
	setDate(date) {
		let field='start_date';
		let booking = this.state.booking;
		booking[field] = date;
		this.setState({booking: booking});
	}
	compare(a,b) {
		return (a.id - b.id);
	}
	onCreate(event) {  
	  event.preventDefault();
	  if(JSON.parse(localStorage.userData).number) {
		  this.setState(state =>  {
		  	return {
		  		booking: {
			  		start_date: state.booking.start_date,
			  		...state.booking
			  	}
		  	}
		  })
		  this.props.createBooking(this.state);
		}
		else {
			this.openModal();
		}
	}

	renderBookingChoices() {
		if(JSON.parse(localStorage.building_properties).filter(property => property.id == this.props.params["propertyId"])[0].select !== 3) {
			return (
				<div className="card-body card-padding">
		      <p id="choosetype">
		        <label className="radio radio-inline m-r-20">
		        	<input type="radio" name="bookingtype" value={0} onChange={this.onChange} className="form-control" checked={this.state.booking.bookingtype == 0} />
		          <i className="input-helper"></i>
		          Share a room
		        </label>
		        <label className="radio radio-inline m-r-20">
		          <input type="radio" name="bookingtype" value={1} onChange={this.onChange} className="form-control" checked={this.state.booking.bookingtype == 1} />
		          <i className="input-helper"></i>
		          Take a full room
		        </label>
		      </p>
		      <br/>
		      <br/>
		      <div className="clearfix"></div>
		    </div>
			)
		}
		else {
			return (
				<div></div>
			)
		}
	}

	componentWillMount() {
		localStorage.setItem('propertyId', this.props.params["propertyId"]);
    let rooms = this.props.getRooms(this.props.params["buildingId"], this.props.params["propertyId"]);
    let building = this.props.getBuilding(this.props.params["buildingId"]);
  }

  updateUserContact = () => {
  	this.props.updateUserContact({
  		user: {
  			number: this.state.contact
  		}
  	});
  	this.setState({modalIsOpen: false});
  	return null;
  }

	renderChoices() {
		let property = JSON.parse(localStorage.building_properties).filter(property => property.id == this.props.params["propertyId"]);
		property = property['0'];
		localStorage.setItem('property', JSON.stringify(property));

		if(property.select === 3) {
			return this.props.rooms.map((room, index) => {
				this.state.booking.room_id = room.id;
				return (
					<div key={index} className="card-body card-padding">
			      <br/>
			      <br/>
			      <div className="clearfix"></div>
			      <div className="row text-center fullHouseOptions">
			        <div className="col-md-4 col-lg-4 col-xs-12" style={room.sf_full ? {border: '1px solid #f2f2f2'} : {display: 'none'}}>
			          <label className="radio radio-inline m-r-20">
			            <p style={{paddingBottom: '1rem'}}>
			              <span>Semi Furnished <p><small>NO UTILITIES</small></p></span>
			            </p>
			            <input type="radio" name="furnishingtype" className="form-control" value={0} onChange={this.onChange}/>
			            <i className="input-helper input-helper-margin-right6_5percent input-helper-mobile-margin-right5percent"></i>
			          </label>
			          <h4>
			            ₹ {room.sf_full}<small>/month</small><br/>
			            <p><small>Maintenance</small> {room.maintenance ? currencyFormatter.format(room.maintenance, {code: 'INR'}).split('.')[0] : 'Variable'}</p>
			          </h4>
				      </div>
				      <div className="col-md-4 col-lg-4 col-xs-12" style={room.ff_full ? {border: '1px solid #f2f2f2'}	 : {display: 'none'}}>
			          <label className="radio radio-inline m-r-20">
			            <p style={{paddingBottom: '1rem'}}>
			              <span>Fully Furnished <p><small>NO UTILITIES</small></p></span>
			            </p>
			            <input type="radio" name="furnishingtype" className="form-control" value={1} onChange={this.onChange}/>
			            <i className="input-helper input-helper-margin-right6_5percent input-helper-mobile-margin-right5percent"></i>
			          </label>
			          <h4>
			            ₹ {room.ff_full} <small>/month</small><br/>
			            <p><small>Maintenance</small> {room.maintenance ? currencyFormatter.format(room.maintenance, {code: 'INR'}).split('.')[0] : 'Variable'}</p>
			          </h4>
				      </div>
				      <div className="col-md-4 col-lg-4 col-xs-12" style={room.ff_bills_full ? {border: '1px solid #f2f2f2'} : {display: 'none'}}>
			          <label className="radio radio-inline m-r-20">
			            <p style={{paddingBottom: '1rem'}}>
			              <span>Fully Furnished <p><small>UTILITIES INCLUDED</small></p></span>
			            </p>
			            <input type="radio" name="furnishingtype" className="form-control" value={2} onChange={this.onChange}/>
			            <i className="input-helper input-helper-margin-right6_5percent input-helper-mobile-margin-right5percent"></i>
			          </label>
			          <h4>
			            ₹ {room.ff_bills_full}<small>/month</small><br/>
			            <p><small>Maintenance</small> {room.maintenance ? currencyFormatter.format(room.maintenance, {code: 'INR'}).split('.')[0] : 'Variable'}</p>
			          </h4>
				      </div>
				    </div>
				  </div>
			  )
			})
		}
		else {
			return this.props.rooms.sort(this.compare).map((room, index) => {	
				let rent = room.shared
				let roomIcon = sharedRoomIcon
				if(this.state.booking.bookingtype == 1) {
					rent = room.full
					roomIcon = fullRoomIcon
					if(room.available < 2) {
						return (
							<div key={index} className="col-md-4 col-lg-4 col-xs-12" style={{opacity: '0.2'}}>
			          <label className="radio radio-inline m-r-20">
			            <p>
			              <img className="shared" src={roomIcon} height="40" />
			              <br/><br/>
			              <span>Room {room.label}</span>
			            </p>
			            <input type="radio" name="room_id" className="form-control" disabled={true} value={room.id} checked={this.state.booking.room_id === room.id} onChange={this.onChange}/>
			            <i className="input-helper input-helper-margin-right6_5percent input-helper-mobile-margin-right5percent"></i>
			          </label>
			          <h4 className="shared">
			            {currencyFormatter.format(rent, {code: 'INR'}).split('.')[0]}
			          </h4>
				      </div>
						)
					}
				}
				if(this.state.booking.bookingtype === 0) {
					if(!room.shared) {
						return (
							<div key={index} className="col-md-4 col-lg-4 col-xs-12" style={{opacity: '0.2'}}>
			          <label className="radio radio-inline m-r-20">
			            <p>
			              <img className="shared" src={roomIcon} height="40" />
			              <br/><br/>
			              <span>Room {room.label}</span>
			            </p>
			            <input type="radio" name="room_id" className="form-control" disabled={true} value={room.id} onChange={this.onChange}/>
			            <i className="input-helper input-helper-margin-right6_5percent input-helper-mobile-margin-right5percent"></i>
			          </label>
			          <h4 className="shared">
			            {rent ? currencyFormatter.format(rent, {code: 'INR'}).split('.')[0] : 'NA'}
			          </h4>
				      </div>
						)
					}
				}
				if(room.available < 1) {
					return (
						<div key={index} className="col-md-4 col-lg-4 col-xs-12" style={{opacity: '0.2'}}>
		          <label className="radio radio-inline m-r-20">
		            <p>
		              <img className="shared" src={roomIcon} height="40" />
		              <br/><br/>
		              <span>Room {room.label}</span>
		            </p>
		            <input type="radio" name="room_id" className="form-control" disabled={true} value={room.id} onChange={this.onChange}/>
		            <i className="input-helper input-helper-margin-right6_5percent input-helper-mobile-margin-right5percent"></i>
		          </label>
		          <h4 className="shared">
		            {rent ? currencyFormatter.format(rent, {code: 'INR'}).split('.')[0] : 'NA'}
		          </h4>
			      </div>
					)
				}
				return (
		      
	        <div key={index} className="col-md-4 col-lg-4 col-xs-12" id="room_id">
	          <label className="radio radio-inline m-r-20">
	            <p>
	              <img className="shared" src={roomIcon} height="40" />
	              <br/><br/>
	              <span>Room {room.label}</span>
	            </p>
	            <input type="radio" name="room_id" className="form-control" value={room.id} onChange={this.onChange}/>
	            <i className="input-helper input-helper-margin-right6_5percent input-helper-mobile-margin-right5percent"></i>
	          </label>
	          <h4 className="shared">
	            {currencyFormatter.format(rent, {code: 'INR'}).split('.')[0]}<small></small>
	          </h4>
		      </div>
			  )
			})
		}
	}
	render() {
		if(this.props.building) {
			const Moment = extendMoment(moment);
			const start = moment().add(16, 'days');
			const end = moment().add(2, 'years');
			const range = Moment.range(start, end);
			let arrayOfDates = Array.from(range.by('days'));
			const start_1 = moment().add(0, 'days');
			const end_1 = moment().add(0, 'days');
			const range_1 = Moment.range(start_1, end_1);
			let arrayOfDates_1 = (Array.from(range_1.by('days')));
			const BAD_DATES = arrayOfDates_1.concat(arrayOfDates);
			const isDayBlocked = day => BAD_DATES.filter(d => d.isSame(day, 'day')).length > 0;
			return (
				<div>
					<WebHeader location={this.props.location.pathname} />
						<div className="container">
				      <div className="page-header">
				        <h2>One step closer to your awesome place</h2>
				      </div>
				      <div>
				        <h3>{this.props.building.name}</h3>
				        <p>{this.props.building.address}</p>
				      </div>
				      {this.renderBookingChoices()}
					    <div className="row text-center">
				    		{this.renderChoices()}
				    	</div>
				    	<br/>
				      <br/>
				      <br/>
				      <br/>
				      <div className="row">
				        <div className="col-md-6 col-lg-6 col-sm-6" id="guidelines" style={{paddingRight:'5px'}}>
				          <div>
				            <p className="c-gray">Guidelines</p>
				            <ul style={{paddingLeft: '5px'}}>
				              <li><p> 1. Before making the booking kindly contact the team for confirmation of the availability of the room on your move in se.</p></li><br/>
				              <li><p> 2. Move In date is supposed to be within 15 days from today's date. Your rent will start from the day you move in / the day you select right now (earlier of the two).</p></li><br/>
				              <li><p> 3. Security deposit has to be cleared at-least 24 hours before moving in. In some societies move in may have to be delayed due to society regulations.</p></li><br/>
				              <li><p> 4. Valid ID Proofs have to be uploaded on the dashboard and only after verification of these ID Proofs, you can move in.</p></li>
				            </ul>
				          </div>
				        </div>
				        <div className="col-md-1 col-lg-1 col-sm-1"></div>
				        <div className="col-md-5 col-lg-5 col-sm-5">
				          <div>
				            <div className="input-group form-group" id='datetimepicker1'>
				              <label className="input-group-addon">
				              Select your move in date
				              </label>
				              <div className="dtp-container fg-line" style={{maxWidth:'200px'}}>
				              	
										    <SingleDatePicker
												  date={this.state.booking.start_date}
												  onDateChange={date => {this.setDate(date)}}
												  focused={this.state.focused}
 													onFocusChange={({ focused }) => this.setState({ focused })}
 													numberOfMonths = {1}
 													hideKeyboardShortcutsPanel = {true}
 													isDayBlocked={isDayBlocked}
												/>
				              </div>
				            </div>
				            <div style={{marginRight: '0%'}}>
				              <a className="btn btn-primary" style={{display: 'inline-flex'}} href="/">Cancel</a>
				              <button type="submit" className="btn btn-primary" onClick={this.onCreate}>Next</button>
				            </div>
				          </div>
				        </div>
				      </div>
				    </div>
					<WebFooter />
					<Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <div>
                <input type="number" className="form-control" name="contact" onChange={this.contactChangeHandle} value={this.state.contact} placeholder="Contact Number"/>
                <button className="btn btn-primary" onClick={this.updateUserContact}>Submit</button>
              </div>
            </Modal.Body>
          </Modal>
				</div>
			)
		}
		else {
			return (
				<div>
					<Preloader />
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		rooms: state.buildings.rooms, 
		building: state.buildings.building
	}
}


export default connect(mapStateToProps, {getRooms: getRooms, getBuilding: getBuilding, createBooking: createBooking, updateUserContact: updateUserContact})(NewBooking);



