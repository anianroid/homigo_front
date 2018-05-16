import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import WebHeader from './WebHeader';
import WebFooter from './WebFooter';
import {updatePassword} from '../actions/sessionActions';
require('../stylesheets/login.css')

class EditPassword extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	credentials: 
    	{
    		password: '', 
    		password_confirmation: '', 
    		headers: {
    			'access-token': this.props.location.query.token,
    			client: this.props.location.query.client_id,
    			...this.props.location.query
    		}
    	}
    }
  }

  handleChange = (event) => {
  	const field = event.target.name;
		const credentials = this.state.credentials;
		credentials[field] = event.target.value;
		return this.setState({credentials: credentials});
  }

	render() {
		return (
			<div>
				<WebHeader />
				<div className="container">
				  <div className="page-header">
				    <h2>Change your password</h2>
				  </div>
				  <div className="form-wrapper">
			      <div className="form-group">
			        <input type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="New Password" value={this.state.credentials.password}/>
			      </div>
			      <div className="form-group">
			        <input type="password" className="form-control" onChange={this.handleChange} name="password_confirmation"  placeholder="Confirm New Password" value={this.state.credentials.password_confirmation}/>
			      </div>
			      <div className="clearfix"></div>
			      <button className="btn btn-primary" type="submit" onClick={() => {this.props.updatePassword(this.state.credentials)}}>Change my password</button>
				  </div>
				</div>
				<WebFooter />
			</div>
		);
	}
}
export default connect(null, {updatePassword: updatePassword})(EditPassword);
