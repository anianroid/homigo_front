import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import WebHeader from './WebHeader';
import WebFooter from './WebFooter';
import {resendConfirmation} from '../actions/sessionActions';
require('../stylesheets/login.css')

class ResendConfirmation extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	email: ''
    }
  }

  handleChange = (event) => {
		return this.setState({email: event.target.value});
	}

	handleSubmit = () => {
		this.props.resendConfirmation(this.state.email);
	}

	render() {
		return (
			<div>
				<WebHeader />
				<div className="container">
					<div className="page-header">
				    <h2>Resend confirmation mail</h2>
				  </div>

				  <div className="form-wrapper">
				      <div className="form-group">
				        <input type="email" className="form-control" name="email" onChange={this.handleChange} placeholder="user@example.com" value={this.state.email}/>
				      </div>
				      <button name="commit" className="btn btn-primary" onClick={this.handleSubmit}>Resend Confirmation Instructions</button>
				  </div>
				</div>
				<WebFooter />
			</div>
		);
	}
}
export default connect(null, {resendConfirmation: resendConfirmation})(ResendConfirmation);
