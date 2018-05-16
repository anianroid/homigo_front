import React, {Component} from 'react';
class HomeHighlights extends Component {
	render() {
		return (
			<div>
				<div className="bg-soft-grey">
			    <div className="clearfix">
			      <div className="container-fluid section spotlight">
			        <div className="col-md-6 col-sm-6 col-xs-12">
			          <header className="highlights-custom-header"><h2>Why Homigo?</h2><p className="sub-head">Sharing your desire for simplicity, we offer you an experience unparallelled in comfort and convenience. Claim a house you can call your own.</p></header>
			           <div className="item-wrapper">
			            <div className="item-body">
			              <img src={require('../assets/images/spotlight/new_amigos.jpg')} className="img-responsive img-resp" alt="New Amigos Icon" />
			            </div>
			            <div className="item-caption">
			              <h3>New amigos. New stories.</h3>
			              <p>Our name says it all. Through our homigo houses, we are building an ecosystem where new friendships are born and moving into a new city becomes a pleasant experience.</p>
			            </div>
			          </div>
			        </div>
			        <div className="col-md-6 col-sm-6 col-xs-12">
			          <div className="item-wrapper">
			            <div className="item-body">
			              <img src={require('../assets/images/spotlight/waste_time.jpg')} className="img-responsive img-resp" alt="Wasting Time Icon" />
			            </div>
			            <div className="item-caption">
			              <h3>Waste time. Just not on house hunting.</h3>
			              <p>Why spend your precious time in getting a house/flatmate, furnishing it, setting up WiFi/DTH and paying recurring bills? Pass on the headache to us. We don't mind.</p>
			            </div>
			          </div>
			          <div className="item-wrapper">
			            <div className="item-body">
			              <img src={require('../assets/images/spotlight/comfortable.jpg')} className="img-responsive img-resp" alt="Comfortable Icon" />
			            </div>
			            <div className="item-caption">
			              <h3>Cosy. Comfortable. Calming</h3>
			              <p>Homigo house is not just a house but an experience. It is so tastefully furnished that you would never want to step out of it. Don't believe us? Ask our homigos.</p>
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


export default HomeHighlights;