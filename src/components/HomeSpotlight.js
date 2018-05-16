import React, {Component} from 'react';
import {Link} from 'react-router';

// =========================== Facebook video ============================= //


class HomeSpotlight extends Component {
	render() {
		return (
			<div className="clearfix">
				<div className="home-main-wrapper">
			    <div className="home-main-content clearfix">
			      <div className="col-md-6 col-sm-6 col-xs-12">
			        <div className="home-main-text">
			          <p>Co-living spaces like never before</p>
			          <h1>Don't just stay. Live.</h1>
			          <Link to="/houses" className="btn btn-primary">Explore Houses</Link>&nbsp;
			          <a href="/request/callback" data-mode="2" target="_blank" className="btn btn-primary">Request a callback</a>

			        </div>
			      </div>
			      <div className="col-md-6 col-sm-6 col-xs-12 text-right">
			        <div className="main-video-wrapper">
			          <div className="main-video">  
			            <div className="fb-video"
			              data-href="https://www.facebook.com/video.php?v=1025205917622477"
			              data-allowfullscreen="true"
			              data-autoplay="true"
			              data-height="auto">
			            </div>
			          </div>
			        </div>
			        <div className="main-video-bg"></div>
			      </div>
			    </div>
			  </div>
		  </div>
		);
	}
}

export default HomeSpotlight;