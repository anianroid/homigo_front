import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import WebHeader from './WebHeader';
import WebFooter from './WebFooter';
require('../stylesheets/login.css')

class ResendConfirmation extends Component {

	render() {
		return (
			<div>
				<WebHeader />
				<div className="container">
					<div className="page-header">
				    <h3>Email Confirmed</h3>
				    <a class="btn btn-primary" href="/">Take me home!</a>
				  </div>
				</div>
				<WebFooter />
			</div>
		);
	}
}
export default ResendConfirmation;
