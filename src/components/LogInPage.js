import React from 'react';
import {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import WebHeader from './WebHeader';
import WebFooter from './WebFooter';
import Preloader from './Preloader';
import * as sessionActions from '../actions/sessionActions';
require('../stylesheets/login.css')

class LogInPage extends Component {
	constructor(props) {
    super(props);
    this.state = {credentials: {email: '', password: ''}}
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
	  this.props.actions.logInUser(this.state.credentials);
	}

	render() {
		if (this.props.shouldRedirect) {
    	const location = this.props.location;
    	if(window.screen.width < 500) {
    		browserHistory.push('/home')
    	}
	    if (location.state) {
	      browserHistory.push(location.state.nextPathname)
	    } else {
	      browserHistory.push('/')
	    }
	  }
		const responseGoogle = (response) => {
			this.props.actions.googleLogin(response.accessToken)
		}

		const responseFacebook = (response) => {
			this.props.actions.facebookLogin(response.accessToken)
		}
		if(this.props.location) {
			return (
				<div>
					<WebHeader location={this.props.location.pathname} />
					<div className="container">
					  <div className="page-header">
					    <h2>Guest Login</h2>
					  </div>
					  <div className="form-wrapper">
					  	<form>
							<div className="form-group">
								<label>Email</label>
								<input type="email" className="form-control" name='email' value={this.state.credentials.email} onChange={this.onChange} />
							</div>
							<div className="form-group">
								<label>Password</label>
								<input type="password" className="form-control" name='password' value={this.state.credentials.password} onChange={this.onChange} />
							</div>
							<div className="col-md-6 col-sm-6 col-xs-6">
								<button	type="submit" className="btn btn-primary" onClick={this.onSave}>Sign In</button>
								<p style={{marginTop: '1em'}}><a href="/forgotpassword">Forgot Password?</a></p>
							</div>
							<div className="col-md-6 col-sm-6 col-xs-6 text-right">
								<span>
									<GoogleLogin
										className="btn btn-google"
								    clientId="1055533242641-mct5djuajhbv9kmp6gokvsduak0gm2mf.apps.googleusercontent.com"
								    onSuccess={responseGoogle}
								    fetchBasicProfile="true"
								    autoLoad={false}
								  > 
								  	<i className="fa fa-google"></i>
								  </GoogleLogin>
								  &nbsp;
								  <FacebookLogin
								    appId="707864779344941"
								    autoLoad={false}
								    fields="name,email,picture"
								    callback={responseFacebook}
								    cssClass="btn btn-facebook"
								    icon="fa-facebook"
								    textButton=""
								  >
								  </FacebookLogin>
								</span>
							  <p style={{marginTop: '1em'}}>
							  	New user? <a href="/register">Sign up</a>
							  </p>
							</div>
							<div className="clearfix">
					      <div style={{paddingTop: '0.5rem'}} className="col-md-12 col-sm-12 col-xs-12 text-center">
					      	<small><a style={{fontSize: '1em'}} className="login_link_1" href="/resendconfirmation">Didn't receive confirmation instructions?</a></small>
					      </div>
					    </div>
						</form>
					  </div>
					</div>
				</div>
			);
		}
		else {
			return (
				<div>
					<Preloader />
				</div>
			)
		}
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
export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
