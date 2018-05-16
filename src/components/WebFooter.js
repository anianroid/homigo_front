import React, {Component} from 'react';


class WebFooter extends Component {
	render() {
		return (
			<div className="footer bg-soft-grey">
			  <div className="container-fluid footer-top">
			    <div className="col-md-9 col-sm-9 col-xs-6">
			      <div className="footer-logo"><h3>Homigo</h3></div>
			      <p className="footer-contact-details">
			        Homigo Realty Pvt Ltd<br/>
			        #2-10/1, 4th Floor, Ajay Plaza,<br/>
			        BTM Layout, Bangalore - 76
			      </p>
			      <br/>
			      <p>98 6446 6446</p><br/>
			      <div className="social-links">
			        <a href="https://www.facebook.com/homigo.in/"><i className="fa fa-facebook-official"></i></a> &nbsp; 
			        <a href="https://twitter.com/homigoIndia"><i className="fa fa-twitter"></i></a> &nbsp; 
			        <a href="https://www.instagram.com/homigo.in/"><i className="fa fa-instagram"></i></a>
			      </div>
			      <br/>
			    </div>
			    <div className="col-md-3 col-sm-3 col-xs-6 x-padded">
			      <h3>Explore</h3>
			      <ul className="footer-links">
			        <li><a href="/houses">Houses</a></li>
			        <li><a href="/pyr" target="_blank">Post your requirement</a></li>
			        <li><a href="/forowners">Owners</a></li>
			        <li><a href="http://blog.homigo.in">Blog</a></li>
			      </ul>
			    </div>
			  </div>
			  <div className="container-fluid footer-bottom">
			    <div className="pull-left">
			      <p>© 2017 Homigo Realty Pvt. Ltd. All Rights Reserved | <a target="_blank" href="/tnc">Terms &amp; Conditions</a></p>
			    </div>
			  </div>
			</div>
		);
	}
}

export default WebFooter;