import React, {Component} from 'react';


class HomeFeatures extends Component {
	render() {
		return (
			<div>
				<div className="clearfix">
		      <div className="container-fluid section experience">
		        <header>
		          <h2 className="text-center">The Good Life</h2>
		          <p className="text-center sub-head">Experience it with us.</p>
		        </header>
		        <div className="col-md-4 col-sm-4 col-xs-4">
		          <div className="experience-card clearfix">
		            <div className="col-sm-3 col-xs-12">
		              <div className="experience-icon">
		                <img src={require('../assets/icons/furnishing@2x.png')}/>
		              </div>
		            </div>
		            <div className="col-sm-9 col-xs-12">
		              <div className="experience-content">
		                <h4>Tasteful Furniture</h4>
		                <p className="content-text">Ready to move-in homes for your convenience, filled with a tastefully designed and curated collection of furnishings.</p>
		              </div>
		            </div>
		          </div>
		        </div>
		        <div className="col-md-4 col-sm-4 col-xs-4">
		          <div className="experience-card clearfix">
		            <div className="col-sm-3 col-xs-12">
		              <div className="experience-icon">
		                <img src={require('../assets/icons/choices@2x.png')}/>
		              </div>
		            </div>
		            <div className="col-sm-9 col-xs-12">
		              <div className="experience-content">
		                <h4>Different Stay Options</h4>
		                <p className="content-text">Owing to the varied needs of our patrons, we offer flexibility in terms of sharing or complete rooms, even entire houses.</p>
		              </div>
		            </div>
		          </div>
		        </div>
		        <div className="col-md-4 col-sm-4 col-xs-4">
		          <div className="experience-card clearfix">
		            <div className="col-sm-3 col-xs-12">
		              <div className="experience-icon">
		                <img src={require('../assets/icons/wifi@2x.png')}/>
		              </div>
		            </div>
		            <div className="col-sm-9 col-xs-12">
		              <div className="experience-content">
		                <h4>Great WiFi</h4>
		                <p className="content-text">Be it an official video call to halfway around the world or a lazy Sunday Netflix binge, you need never compromise.</p>
		              </div>
		            </div>
		          </div>
		        </div>
		        <div className="col-md-4 col-sm-4 col-xs-4">
		          <div className="experience-card clearfix">
		            <div className="col-sm-3 col-xs-12">
		              <div className="experience-icon">
		                <img src={require('../assets/icons/utilities@2x.png')}/>
		              </div>
		            </div>
		            <div className="col-sm-9 col-xs-12">
		              <div className="experience-content">
		                <h4>Utilities Included</h4>
		                <p className="content-text">We take care of all your recurring bills (DTH, Power, Water and Gas), to save you time to focus on more important tasks than timely paying for utilities.</p>
		              </div>
		            </div>
		          </div>
		        </div>
		        <div className="col-md-4 col-sm-4 col-xs-4">
		          <div className="experience-card clearfix">
		            <div className="col-sm-3 col-xs-12">
		              <div className="experience-icon">
		                <img src={require('../assets/icons/apparel@2x.png')}/>
		              </div>
		            </div>
		            <div className="col-sm-9 col-xs-12">
		              <div className="experience-content">
		                <h4>In-house Laundry</h4>
		                <p className="content-text">Providing you with In-House Laundry solutions, automatic Washing Machines to wash and dry at your convenience and comfort.</p>
		              </div>
		            </div>
		          </div>
		        </div>
		        <div className="col-md-4 col-sm-4 col-xs-4">
		          <div className="experience-card clearfix">
		            <div className="col-sm-3 col-xs-12">
		              <div className="experience-icon">
		                <img src={require('../assets/icons/community@2x.png')}/>
		              </div>
		            </div>
		            <div className="col-sm-9 col-xs-12">
		              <div className="experience-content">
		                <h4>Vibrant Community</h4>
		                <p className="content-text">From the day you move-in, forge new relationships and connections with fellow Homigos as a part of our ever growing community.</p>
		              </div>
		            </div>
		          </div>
		        </div>
		        <div className="col-md-4 col-sm-4 col-xs-4">
		          <div className="experience-card clearfix">
		            <div className="col-sm-3 col-xs-12">
		              <div className="experience-icon">
		                <img src={require('../assets/icons/cleaning@2x.png')}/>
		              </div>
		            </div>
		            <div className="col-sm-9 col-xs-12">
		              <div className="experience-content">
		                <h4>House Keeping</h4>
		                <p className="content-text">Our services include regular housekeeping so having to haggle with the maid or enduring a dirty home are problems of the past.</p>
		              </div>
		            </div>
		          </div>
		        </div>
		        <div className="col-md-4 col-sm-4 col-xs-4">
		          <div className="experience-card clearfix">
		            <div className="col-sm-3 col-xs-12">
		              <div className="experience-icon">
		                <img src={require('../assets/icons/security@2x.png')}/>
		              </div>
		            </div>
		            <div className="col-sm-9 col-xs-12">
		              <div className="experience-content">
		                <h4>24/7 Care-taker (Security)</h4>
		                <p className="content-text">In the interest of a hassle-free experience, we station caretakers to be available for security and any assistance to tenants at all times.</p>
		              </div>
		            </div>
		          </div>
		        </div>
		        <div className="col-md-4 col-sm-4 col-xs-4">
		          <div className="experience-card clearfix">
		            <div className="col-sm-3 col-xs-12">
		              <div className="experience-icon">
		                <img src={require('../assets/icons/movement@2x.png')}/>
		              </div>
		            </div>
		            <div className="col-sm-9 col-xs-12">
		              <div className="experience-content">
		                <h4>Flexible Relocation</h4>
		                <p className="content-text">Men plan and god laughs, and so we facilitate easy relocation among other Homigo homes to follow wherever life takes you.</p>
		              </div>
		            </div>
		          </div>
		        </div>
		      </div>
		    </div>
		  </div>
		);
	}
}


export default HomeFeatures;