import React from 'react';
import {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {APP_URL} from '../actions/types'
import {browserHistory} from 'react-router';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import WebHeader from './WebHeader';
import WebFooter from './WebFooter';
import * as sessionActions from '../actions/sessionActions';
require('../stylesheets/login.css')

class RegisterUser extends Component {
	constructor(props) {
    super(props);
    this.state = {credentials: {name: '', email: '', password: '', password_confirmation: '', gender: '', confirm_success_url: `${APP_URL}/confirm`}}
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
	onChange(event) {
		const field = event.target.name;
		const credentials = this.state.credentials;
		credentials[field] = event.target.value;
		return this.setState({credentials: credentials});
	}

	onSave(event) {
	  event.preventDefault();
	  this.props.actions.registerUser(this.state.credentials);
	}

	render() {
		// if (this.props.shouldRedirect) {
		// 	const location = this.props.location;
		//     if (location.state.nextPathname) {
		//       browserHistory.push(location.state.nextPathname)
		//     } else {
		//       browserHistory.push('/')
		//     }
	 //    }
		return (
			<div>
				<WebHeader />
			    <div className="container">
			      <div className="page-header">
			        <h2>Tenant dashboard registration</h2>
			      </div>
			      <div className="form-wrapper">
			        <form>
			          <div className="form-group">
			              <div className="fg-line">
			              	  <input type="text" className="form-control" onChange={this.onChange} placeholder="Full Name" name="name" />
			              </div>
			          </div>
			          <div className="form-group">
			              <div className="fg-line">
			              	  <input type="email" className="form-control" onChange={this.onChange} placeholder="Email" name="email"/>
			              </div>
			          </div>
			          <div className="form-group">
			              <div className="fg-line">
			              	  <input type="password" className="form-control" onChange={this.onChange} placeholder="Password" name="password" />
			              </div>
			          </div>
			          <div className="form-group">
			              <div className="fg-line">
			                  <input type="password" className="form-control" onChange={this.onChange} placeholder="Confirm Password" name="password_confirmation" />
			              </div>
			          </div>
			          <div className="form-group">
			              <div className="fg-line">
			              	  <select className="form-control" onChange={this.onChange} name="gender">
			              	  	<option>Select</option>
			              	  	<option value={0}>Male</option>
			              	  	<option value={1}>Female</option>
			              	  </select>
			              </div>
			          </div>
			          <br />
			          <div className="form-group">
			            <button className="btn btn-primary" onClick={this.onSave}>Sign Up</button>
			          </div>
			        </form>
			      </div>
			    </div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

function mapStateToProps(state) {
	return {shouldRedirect: state.session.shouldRedirect};
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
