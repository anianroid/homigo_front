import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUserKycDetails} from '../actions/index.js'
import swal from 'sweetalert2';
require('../stylesheets/client_db.css');
class KYCForm extends Component {
	constructor() {
		super();
		
		this.state = {
			user: {
				father: (JSON.parse(localStorage.userData).father ? JSON.parse(localStorage.userData).father : ''),
				dob_day: '',
				dob_month: '',
				dob_year: '',
				dob: '',
				age: (JSON.parse(localStorage.userData).age ? JSON.parse(localStorage.userData).age : ''),
				pan: (JSON.parse(localStorage.userData).pan ? JSON.parse(localStorage.userData).pan : ''),
				address: (JSON.parse(localStorage.userData).address ? JSON.parse(localStorage.userData).address : ''),
				city: (JSON.parse(localStorage.userData).city ? JSON.parse(localStorage.userData).city : ''),
				state: (JSON.parse(localStorage.userData).state ? JSON.parse(localStorage.userData).state : ''),
				pincode: (JSON.parse(localStorage.userData).pincode ? JSON.parse(localStorage.userData).pincode : ''),
				emergency_contact_name: (JSON.parse(localStorage.userData).emergency_contact_name ? JSON.parse(localStorage.userData).emergency_contact_name : ''),
				emergency_contact_phn: (JSON.parse(localStorage.userData).emergency_contact_phn ? JSON.parse(localStorage.userData).emergency_contact_phn : ''),
				emergency_contact_email: (JSON.parse(localStorage.userData).emergency_contact_email ? JSON.parse(localStorage.userData).emergency_contact_email : ''),
				emergency_contact_relation: (JSON.parse(localStorage.userData).emergency_contact_relation ? JSON.parse(localStorage.userData).emergency_contact_relation : '')
			},
			form_part: 1
		};

		this.setState(JSON.parse(localStorage.userData));

	}

	statesOptions() {
		const options = ['Andaman and Nicobar Islands',
			'Andhra Pradesh',
			'Arunachal Pradesh',
			'Assam',
			'Bihar',
			'Chandigarh',
			'Chhattisgarh',
			'Dadra and Nagar Haveli',
			'Daman and Diu',
			'Delhi',
			'Goa',
			'Gujarat',
			'Haryana',
			'Himachal Pradesh',
			'Jammu and Kashmir',
			'Jharkhand',
			'Karnataka',
			'Kerala',
			'Lakshadweep',
			'Madhya Pradesh',
			'Maharashtra',
			'Manipur',
			'Meghalaya',
			'Mizoram',
			'Nagaland',
			'Orissa',
			'Pondicherry',
			'Punjab',
			'Rajasthan',
			'Sikkim',
			'Tamil Nadu',
			'Telangana',
			'Tripura',
			'Uttaranchal',
			'Uttar Pradesh',
			'West Bengal'];
		options.map(option => {
			let el = document.createElement("option");
			el.text = option;
			el.value = option;
			document.getElementById("selectState").appendChild(el);
		});
	}

	handleChange = (event) => {
		const field = event.target.name;
		const user = this.state.user;
		user[field] = event.target.value;
		if(field == 'dob_month') {
			this.setState({user: user});
			this.daysCalculator();
		}
		return this.setState({user: user});
	}

	populateYears = () => {
		let i = 1900;
		var select = document.getElementById("select-dob-year");
		select.options.length = 1;
		while(i <= 2015) {
			select.options[select.options.length] = new Option(i, i);
			i++;
		}
		return true;
	}

	populateMonths = () => {
		let i = 1;
		var select = document.getElementById("select-dob-month");
		select.options.length = 1;
		while(i <= 12) {
			select.options[select.options.length] = new Option(i, i);
			i++;
		}
		return true;
	}

	daysCalculator = () => {
		let i = 1;
		var select = document.getElementById("select-dob-day");
		select.options.length = 1;
		while(i <= new Date(parseInt(this.state.user.dob_year), parseInt(this.state.user.dob_month), 0).getDate()) {
			select.options[select.options.length] = new Option(i, i);
			i++;
		}
		return true;
	}

	renderPart1() {
		if(this.state.form_part === 1) {
	    return (
	    	<div>
		      <div className="form-group">
		        <label>Father's Name</label><br />
		        	<input type="text" className="form-control" onChange={this.handleChange} name="father" value={this.state.user.father}/>
		      </div>
		      <div className="form-group">
		        <label>Your Age</label><br />
		          <input type="number" className="form-control" onChange={this.handleChange} name="age" value={this.state.user.age}/>
		      </div>
		      <div className="form-group">
		        <label>Your DOB</label><br />
		        	<div className="col-md-4">
			          <select className="form-control" onChange={this.handleChange} id="select-dob-year" onFocus={this.populateYears} name="dob_year" value={this.state.user.dob_year}>
			          	<option value={null}>Select Year</option>
			          </select>
			        </div>
			        <div className="col-md-4">
			          <select className="form-control" onChange={this.handleChange} id="select-dob-month" onFocus={this.populateMonths} onFocusOut={this.daysCalculator} name="dob_month" value={this.state.user.dob_month}>
			          	<option value={null}>Select Month</option>
			          </select>
			        </div>
			        <div className="col-md-4">
			          <select className="form-control" onChange={this.handleChange} id="select-dob-day" name="dob_day" value={this.state.user.dob_day}>
			          	<option value={null}>Select Day</option>
			          </select>
			        </div>
		      </div>
		      <div className="form-group">
		        <label>PAN</label><br />
		          <input type="text" className="form-control" onChange={this.handleChange} name="pan" value={this.state.user.pan}/>
		      </div>
		      <div className="form-group">
		        <label>Permanent Address</label><br />
		          <textarea name="address" className="form-control" onChange={this.handleChange} value={this.state.user.address}>
		          </textarea>
		      </div>
		      <div className="form-group">
		        <label>City</label><br />
		        <input type="text" className="form-control" onChange={this.handleChange} name="city" value={this.state.user.city}/>
		      </div>
		      <div className="form-group">
		        <label>State</label><br />
		          <select id="selectState" className="form-control" onChange={this.handleChange} name="state" onFocus={this.statesOptions}>
		        	</select>
		      </div>
		      <div className="form-group">
		        <label>Pin Code</label><br />
		          <input type="number" className="form-control" onChange={this.handleChange} name="pincode" value={this.state.user.pincode}/>
		      </div>
		      <div className="form-group">
		        <a className="btn btn-primary" onClick={() => {this.setState({form_part: 2})}}>Next</a>
		      </div>
		    </div>
	    )
	  }
	  return null;
		        
	}

	renderPart2() {
		if(this.state.form_part === 2) {
			return (
				<div>
	        <div className="form-group">
	          <label>Contact's Name</label><br />
	            <input type="text" className="form-control" onChange={this.handleChange} name="emergency_contact_name" value={this.state.user.emergency_contact_name} />
	        </div>
	        <div className="form-group">
	          <label>Contact's Phone</label><br />
	            <input type="number" className="form-control" onChange={this.handleChange} name="emergency_contact_phn" value={this.state.user.emergency_contact_phn} />
	        </div>
	        <div className="form-group">
	          <label>Contact's Email</label><br />
	            <input type="email" className="form-control" onChange={this.handleChange} name="emergency_contact_email" value={this.state.user.emergency_contact_email} />
	        </div>
	        <div className="form-group">
	          <label>Contact's Relationship</label><br />
	            <input type="text" className="form-control" onChange={this.handleChange} name="emergency_contact_relation" value={this.state.user.emergency_contact_relation} />
	        </div>
	        <div>
	          <div className="pull-left"><button className="btn btn-primary" onClick={() => {this.setState({form_part: 1})}}>Back</button></div>
	          <div className="pull-right"><button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button></div>
	        </div>
	      </div>
			)
		}
		return null;
	}


	handleSubmit = () => {
		this.state.user['dob'] = this.state.user.dob_year + '-' + this.state.user.dob_month + '-' + this.state.user.dob_day;
		delete this.state.user['dob_month'];
		delete this.state.user['dob_day'];
		delete this.state.user['dob_year'];
		if(this.state.user !== null) {
			this.props.updateUserKycDetails(this.state)
		}
		else {
			swal('Please fill all the fields!');
		}
	}

	render() {
		return (
			<div className="wrapper clearfix">
		  	<section className="clearfix">
			    <div className="documents-form">
			      <div className="documents-form-header">
			        <div className="documents-progress">
			          <div className="progress-labels">
			            <div className="progress-label" style={this.state.form_part === 1 ? {color: '#664ea0'} : {color: 'inherit'}}><h4>Personal Details</h4></div>
			            <div className="progress-label pull-right" style={this.state.form_part === 2 ? {color: '#664ea0'} : {color: 'inherit'}}><h4>Emergency Contact</h4></div>
			          </div>
			          <div className="track">
			            
			          </div>
			        </div>
			      </div>
			      <br />
			      <div className="documents-form-body">
			        <div className="form">
								{this.renderPart1()}
								{this.renderPart2()}
							</div>
				  	</div>
				  </div>
				</section>
			</div>
		)
	}
}


export default connect(null, {updateUserKycDetails: updateUserKycDetails})(KYCForm);



