import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class WebHeader extends Component {

	mobileNavClick(element) {
    const navIcon = document.getElementById('nav-icon')
    const mainNavMobile = document.getElementById('main-nav-mobile')
    mainNavMobile.classList.toggle('open-collapse')
    navIcon.classList.toggle('open')
	}

	render() {

			if(sessionStorage.userData) {
				return (
					<div className="header clearfix">
							<div className="container-fluid sticky-container-mobile">
				         <div className="logo-mobile">
				           <h2><a href="/">Homigo</a></h2>
				         </div>
				         <nav className="navbar main-nav nav-menu">
				           <div className="navbar-header logo">
				             <h2><a href="/">Homigo</a></h2>
				           </div>
				           <ul className="navbar-nav navbar-right">
				             <li className="contact">
				               <a href="tel:+919864466446"><i className="glyphicon glyphicon-earphone"></i> 9864466446</a>
				             </li>
				             <li className="profile-action"><a id="profile" href="/home">{JSON.parse(sessionStorage.userData).name}</a></li>
				           </ul>
				         </nav>
				          <div>
				            <a href="tel:+919864466446"><div className="phone"><i className="glyphicon glyphicon-earphone"></i></div></a>
				            <span id="nav-toggle" onClick={this.mobileNavClick}>
				              <div id="nav-icon">
				               <span></span>
				               <span></span>
				               <span></span>
				               <span></span>
				               <span></span>
				               <span></span>
				              </div>
				            </span>
				          </div>
				          <div className="main-nav-mobile nav-menu" id="main-nav-mobile">
				           <ul className="nav">
				             <li><a href="/houses">Houses</a></li>
				             <li><a href="/forowners">Owners</a></li>
				             <li><a href="http://blog.homigo.in">Blog</a></li><hr/>
				             <li><a href="/home">{JSON.parse(sessionStorage.userData).name}</a></li>
				           </ul>
				         </div>
				      </div>
				    </div>
				);
			}
			else {
				return (
					<div className="header clearfix">
						<div className="container-fluid sticky-container-mobile">
				         <div className="logo-mobile">
				           <h2><a href="/">Homigo</a></h2>
				         </div>
				         <div className="main-nav-mobile nav-menu" id="main-nav-mobile">
				           <ul className="nav">
				             <li><a href="/houses">Houses</a></li>
				             <li><a href="/forowners">Owners</a></li>
				             <li><a href="http://blog.homigo.in">Blog</a></li><hr/>
				             <li><a href="/login">Login</a></li>
				           </ul>
				         </div>
				         <nav className="navbar main-nav nav-menu">
				           <div className="navbar-header logo">
				             <h2><a href="/">Homigo</a></h2>
				           </div>
				           <ul className="navbar-nav navbar-right">
				             <li className="contact">
				               <a style={{textDecoration: 'underline'}} href="tel:+919864466446"><i className="glyphicon glyphicon-earphone"></i> 9864466446</a>
				             </li>
				             <li className="btn btn-primary profile-action" style={{marginTop: '0.2em'}}><a id="login" href="/home">Login</a></li>
				           </ul>
				         </nav>
				          <div>
				            <a href="tel:+919864466446"><div className="phone"><i className="glyphicon glyphicon-earphone"></i></div></a>
				            <span id="nav-toggle">
				              <div id="nav-icon" onClick={this.mobileNavClick}>
				               <span></span>
				               <span></span>
				               <span></span>
				               <span></span>
				               <span></span>
				               <span></span>
				              </div>
				            </span>
				          </div>
				        </div>
				    </div>
				);
			}
	}

}

function mapStateToProps(state, ownProps) {
	if(sessionStorage.session)
  	return {logged_in: sessionStorage.session.status, data: sessionStorage.uid};
  else
  	return {logged_in: false};
}


export default connect(mapStateToProps)(WebHeader);
