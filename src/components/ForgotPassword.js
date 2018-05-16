import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import WebHeader from './WebHeader';
import WebFooter from './WebFooter';
import {resetPassword} from '../actions/sessionActions';
require('../stylesheets/login.css')

class LogInPage extends Component {
	constructor(props) {
    super(props);
    this.state = {email: null}
  }

  handleOnChange = (event) => {
  	const field = event.target.name;
		const credentials = this.state;
		credentials[field] = event.target.value;
		return this.setState({email: credentials['email']});
  }

	render() {
		return (
			<div>
				<WebHeader />
				<div className="container">
					<div className="page-header">
				    <h2>Forgot password?</h2>
				  </div>

				  <div className="form-wrapper">
				      <div className="form-group">
				        <input type="email" className="form-control" name="email" onChange={this.handleOnChange} placeholder="user@example.com" value={this.state.email}/>
				      </div>
				      <button name="commit" className="btn btn-primary" onClick={() => {this.props.resetPassword(this.state.email)}}>Reset Password</button>
				  </div>
				</div>
				<WebFooter />
			</div>
		);
	}
}
export default connect(null, {resetPassword: resetPassword})(LogInPage);
