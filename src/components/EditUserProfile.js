import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import WebHeader from './WebHeader';
import WebFooter from './WebFooter';
import {updateUserDetails} from '../actions/index';

class EditUserProfile extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	user: {
	    	name: JSON.parse(localStorage.userData).name ? JSON.parse(localStorage.userData).name : '', 
	    	number: JSON.parse(localStorage.userData).number ? JSON.parse(localStorage.userData).number : '', 
	    	fatherName: JSON.parse(localStorage.userData).father ? JSON.parse(localStorage.userData).father : '', 
	    	age: JSON.parse(localStorage.userData).age ? JSON.parse(localStorage.userData).age : '', 
	    	pan: JSON.parse(localStorage.userData).pan ? JSON.parse(localStorage.userData).pan : '', 
	    	city: JSON.parse(localStorage.userData).city ? JSON.parse(localStorage.userData).city : '', 
	    	pincode: JSON.parse(localStorage.userData).pincode ? JSON.parse(localStorage.userData).pincode : ''
	    }
    }
  }

  handleChange = (e) => {
  	const field = e.target.name;
		const user = this.state.user;
		user[field] = e.target.value;
		return this.setState({user: user});
  }

	render() {
		return (
			<div>
				<WebHeader />
				<div id="render">
					<div class="container">
					    <div class="page-header">
					        <h3>Edit Information</h3>
					    </div>
					    <div class="form-wrapper" style={{padding: '2% 25%'}}>
					      <div class="form-group">
							    <label>Full Name</label><br />
							    <input type="text" className="form-control" onChange={this.handleChange} name="name" value={this.state.user.name} />
							  </div>
							  
							  <div class="form-group">
							    <label>Gender</label><br />
							    <select name="gender" className="form-control">
							    	<option value="0">Male</option>
							    	<option value="1">Female</option>
							    </select>
							  </div>
							  
							  <div class="form-group">
							    <label>Phone Number</label><br />
							    <input type="text" className="form-control" onChange={this.handleChange} name="number" value={this.state.user.number} />
							  </div>
							  
							  <div class="form-group">
							    <label>Father's Name</label><br />
							    <input type="text" className="form-control" onChange={this.handleChange} name="fatherName" value={this.state.user.fatherName} />
							  </div>
							  
							  <div class="form-group">
							    <label>Age</label><br />
							    <input type="text" className="form-control" onChange={this.handleChange} name="age" value={this.state.user.age} />
							  </div>
							  
							  <div class="form-group">
							    <label>PAN</label><br />
							    <input type="text" className="form-control" onChange={this.handleChange} name="pan" value={this.state.user.pan} />
							  </div>
							  
							  <div class="form-group">
							    <label>City</label><br />
							    <input type="text" className="form-control" onChange={this.handleChange} name="city" value={this.state.user.city} />
							  </div>

							  <div class="form-group">
							    <label>Pin Code</label><br />
							    <input type="text" className="form-control" onChange={this.handleChange} name="pincode" value={this.state.user.pincode} />
							  </div>

							  <div>
								  <div className="pull-left">
								  	<button class="btn btn-primary" onClick={() => {this.props.updateUserDetails(this.state)}}>Submit</button>
								  </div>
								  <div className="pull-left" style={{marginLeft: '1em'}}>
								  	<a class="btn btn-primary" href="/home">Back</a>
								  </div>
								</div>

					    </div>
					</div>
				</div>
				<WebFooter />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		updateUserProfile: state.session.update
	}
}
export default connect(mapStateToProps, {updateUserDetails: updateUserDetails})(EditUserProfile);
