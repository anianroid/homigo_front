import React, {Component} from 'react';
import {Link} from 'react-router';
import WebHeader from './WebHeader.js';
import WebFooter from './WebFooter.js';

class Owners extends Component {
	render() {
		return (
			<div>
				<WebHeader location={this.props.location.pathname} />
				<div className="clearfix">
				  <div className="home-main-wrapper" style={{marginTop: '3em'}}>
				    <div className="home-main-content owners-content clearfix">
				      <h1 id="owners_head_text">Boost your rental yield with us.</h1>
				    </div>
				    <div className="main-foot-image clearfix">
				      <img className="img-responsive" style={{width: '100%', height: 'auto'}} alt="Owners Page Cover Image" src={require('../assets/images/owners_cover.png')} id="owners_main_img" />
				    </div>
				  </div>
				  <div>
				    <div className="clearfix">
				      <div className="container-fluid section experience">
				        <header>
				          <h2 className="text-center">The experience you deserve</h2>
				          <p className="text-center sub-head">Sit back and relax</p>
				        </header>
				        <div className="col-md-4 col-sm-4 col-xs-4">
				          <div className="experience-card clearfix">
				            <div className="col-sm-3 col-xs-12">
				              <div className="experience-icon">
				                <img alt="experience-icon-better-yield" src={require('../assets/icons/better_yield@2x.png')} />
				              </div>
				            </div>
				            <div className="col-sm-9 col-xs-12">
				              <div className="experience-content">
				                <h4>Better yield</h4>
				                <p className="content-text">
				                  Work with our design team to turn your property into a furnished co-living space and enjoy a higher rental yield.
				                </p>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div className="col-md-4 col-sm-4 col-xs-4">
				          <div className="experience-card clearfix">
				            <div className="col-sm-3 col-xs-12">
				              <div className="experience-icon">
				                <img alt="experience-icon-timely-rents" src={require('../assets/icons/timely_rents@2x.png')} />
				              </div>
				            </div>
				            <div className="col-sm-9 col-xs-12">
				              <div className="experience-content">
				                <h4>Timely rents</h4>
				                <p className="content-text">Get timely rentals into your account without getting into any hassles.</p>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div className="col-md-4 col-sm-4 col-xs-4">
				          <div className="experience-card clearfix">
				            <div className="col-sm-3 col-xs-12">
				              <div className="experience-icon">
				                <img alt="experience-icon-property-management" src={require('../assets/icons/property_management@2x.png')} />
				              </div>
				            </div>
				            <div className="col-sm-9 col-xs-12">
				              <div className="experience-content">
				                <h4>Property management</h4>
				                <p className="content-text">Professional house maintenance to keep your house at its best.</p>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div className="col-md-4 col-sm-4 col-xs-4">
				          <div className="experience-card clearfix">
				            <div className="col-sm-3 col-xs-12">
				              <div className="experience-icon">
				                <img alt="experience-icon-security" src={require('../assets/icons/security@2x.png')} />
				              </div>
				            </div>
				            <div className="col-sm-9 col-xs-12">
				              <div className="experience-content">
				                <h4>Background verification</h4>
				                <p className="content-text">Background verification of all the tenants before they move in.</p>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div className="col-md-4 col-sm-4 col-xs-4">
				          <div className="experience-card clearfix">
				            <div className="col-sm-3 col-xs-12">
				              <div className="experience-icon">
				                <img alt="experience-icon-house-broker" src={require('../assets/icons/broker@2x.png')} />
				              </div>
				            </div>
				            <div className="col-sm-9 col-xs-12">
				              <div className="experience-content">
				                <h4>No dealing with brokers</h4>
				                <p className="content-text">Why pay brokers to find tenants, when we do it for free.</p>
				              </div>
				            </div>
				          </div>
				        </div>
				        <div className="col-md-4 col-sm-4 col-xs-4">
				          <div className="experience-card clearfix">
				            <div className="col-sm-3 col-xs-12">
				              <div className="experience-icon">
				                <img alt="experience-icon-drink-with-glass" src={require('../assets/icons/drink@2x.png')} />
				              </div>
				            </div>
				            <div className="col-sm-9 col-xs-12">
				              <div className="experience-content">
				                <h4>Hassle Free Renting</h4>
				                <p className="content-text">Sit back and watch your income grow while we manage your renting.</p>
				              </div>
				            </div>
				          </div>
				        </div>
				      </div>
				    </div>
				  </div>
				  <div>
				    <div className="clearfix">
				      <div className="container-fluid section owners_foot" id="owners_foot_cta">
				        <div className="col-md-12 text-center space-top">
				          <div className="cta-foot">
				            <h1>BE A PART.<span>DON'T MISS OUT.</span></h1><br />
				            <a className="btn btn-primary" href="https://homigoteam.typeform.com/to/ijbq4X" data-mode="2" target="_blank">Post your property</a>
				          </div>
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

export default Owners;