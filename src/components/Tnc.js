import React, {Component} from 'react';
import {Link} from 'react-router';
import WebHeader from './WebHeader.js';
import WebFooter from './WebFooter.js';
require('../stylesheets/tnc.css');

class Owners extends Component {
	render() {
		return (
			<div>
				<WebHeader location={this.props.location.pathname} />
				<section class="pagetitle parallax parallax-image" style={{backgroundImage:`url(${require('../assets/images/payments.jpg')})`}}>
					<div class="wrapsection">
						<div class="overlay" style={{background:'#303543',opacity:'0.7'}}>
						</div>
						<div class="container">
							<div class="parallax-content">
								<div class="block2 text-center" style={{padding:'20px 0',color:'#fff'}}>
									<h3>
									<span class="text1 big wow bounceIn" data-wow-delay="0s" data-wow-duration="1s">
									<h1><span style={{fontSize: '0.7em', fintWeight: '500', color: '#fff'}}>Terms and Conditions</span></h1>
									</span>
									</h3>
								</div>
							</div>
						</div>
					</div>
					</section>
					<section class="page-wrapper gray">
					<div class="container knowledgebase">
						<div class="row">
							<div class="col-md-3" id="leftCol">
								<ul class="nav nav-stacked" id="sidebar" style={{marginTop:'20px'}}>
									<li class="text-center menutitle">SHARED HOUSES</li>
									<li><a href="#sec0">1. Payment Guidelines</a></li>
									<li><a href="#sec1">2. House Rules</a></li>
									<li><a href="#sec2">3. Services</a></li>
									<li><a href="#sec3">4. General Policies</a></li>
									<br/>
									<li class="text-center menutitle">FULL HOUSES</li>
									<li><a href="#sec4">1. Payment Guidelines</a></li>
									<li><a href="#sec5">2. House Rules</a></li>
									<li><a href="#sec6">3. Services</a></li>
									<li><a href="#sec7">4. General Policies</a></li>
								</ul>
							</div>
							
							<div class="col-md-9">
							
								<br/>
								<ul style={{paddingLeft:'0px'}}>
									<li class="text-center menutitle">SHARED HOUSES</li>
								</ul>
								
								<h3 id="sec0">1. Payment Guidelines</h3>
								<div class="content">
									<div class="unstyle">
										<ul class="chevronlist">
											<h4>SECURITY DEPOSIT GUIDELINES:</h4>
											<li>The security deposit amount should be submitted by the tenant to Homigo <b>24 hours</b> prior to the date of move in. <b>In case the security deposit is not received, the tenant will not be allowed to move in.</b></li>
											<br/><li>In case security deposit is not submitted 24 hrs before move in date, the following will be the consequences:
												<ul>
												<li>INR 1000/- will be deducted from the token advance per day after the selected move in date till the security deposit is paid.</li>
												<li>Move in date will be automatically shifted to the next day.</li>
												<li>Booking will be cancelled in 5 days from the selected move in date.</li>
												</ul>
											</li>
											<br/><li>Homigo should be kept informed <b>1 working day prior to the date of move in</b> so that the necessary arrangements can be made.</li>
											<li><b>Payment mode:</b> Online transfer.</li>
											<li>Any extra charges levied by the payment gateway during the transaction will be charged on the tenant making the payment.</li>

											<br/><h4>RENT PAYMENT GUIDELINES:</h4>
											<li>Rent payment should be made by the tenant on or before <b>5th of every month.</b></li>
											<li><b>Late payment charges:</b> In case the rent is not received by 5th of every month, <b>Rs.250 per day will be charged as late payment charges.</b></li>
											<li>Late Payment Charges and all other fines levied on the tenant will be deducted from the tenant’s security deposit on exit.</li>
											<li><b>Payment mode:</b> Online transfer.</li>
											<li>In case of delays in rental payments, Homigo has the right to report the delay to credit agencies which can impact tenant’s credit score.</li>
											<li>Any extra charges levied by the payment gateway during the transaction will be charged on the tenant making the payment.</li>

											
											<br/><h4>TOKEN PAYMENT GUIDELINES:</h4>
											<li>The token advance paid by the tenant signifies that the place is booked for that particular tenant.</li>
											<li>The token advance amount will be a part of the security deposit.</li>						
											<li>In case the tenant does not occupy the house after the payment of token, <b>token amount will not be refundable.</b></li>
											<li>The rent cycle will start after 10 days of payment of token/the date from when the tenant occupies the place (earlier of the two).</li>
											<li><b>Payment mode:</b> Online transfer.</li>
											<li>Any extra charges levied by the payment gateway during the transaction will be charged on the tenant making the payment.</li>						

										</ul>
									</div>
								</div>
								<h3 id="sec1">2. House Rules</h3>
								<div class="content">
										<div class="unstyle">
										<ul class="chevronlist">
											<h4>HOUSE CLEANING:</h4>
											<li>It is mandatory for all the tenants to arrange for a housekeeper for cleaning and distribute the charges amongst themselves.</li>
											<li>In case any tenant does not cooperate, the same should be brought to Homigo’s notice immediately. Penalty of INR 750 per person will be charged on violation of the rule.</li>
											
											<br/><h4>HOUSE DECORUM:</h4>
											<li>As Homigo houses are located in exclusive and select societies of the city, no misconduct will be tolerated in terms of loud music, drinking/smoking in society corridors etc.</li>
											<li>Visitor timings are hive specific. In some hives it may be dependent on owner and association.</li>
											<li>Any damage to the house property and furniture will be applicable for fine.</li>
											<li>All rules and regulations of the society association / owners' association supercede the Homigo's rules.</li>
										</ul>
									</div>
								</div>

								<h3 id="sec2">3. Services</h3>
								<div class="content">
										<div class="unstyle">
										<ul class="chevronlist">
											<h4>WiFi (where applicable):</h4>
											<li>In case there is any technical issue with the WiFi, the tenant can raise the complaint with the service providers directly. Homigo will provide all the relevant information and details.</li>
											<li>The resolution of any WiFi related issue will take a <b>minimum of 2 working days</b>. The actual time for resolution is totally dependent on the service provider and Homigo is not liable to take any responsibility for the same.</li>
											<li><b>WiFi router is provided by Homigo in the common living area of each flat.</b> The connectivity to each room is not Homigo's responsibility. Shifting the position of the WiFi router has to be handled by the tenants with the help of the service provider directly.</li>

											<br/><h4>DTH:</h4>
											<li>We provide one main HD DTH connection in each flat. Charges for any extra child connection or any extra channels will be borne by the tenants.</li>
											<li>Any issues in the DTH connection have to be handled by the tenants using the details provided on each DTH box.</li>
											<li>Time for the resolution of any issue is directly dependent on the service provider and Homigo does not take any responsibility for the same.</li>

											<br/><h4>ELECTRIC CONNECTION:</h4>
											<li>Electricity bills up to <b>INR 1000 per 1BHK flat, INR 1500 per 2BHK flat, INR 2000 per 3BHK flat and INR 3000 per 4BHK flat per month</b> is covered by Homigo.</li>
											<li>In case the electricity bill exceeds the above mentioned limits, the extra amount is divided among the tenants such that tenants living in AC rooms are charged twice the amount of tenants living in non AC rooms.</li>
											<li>Any electrical issue will be forwarded to the society / electrical department depending on the type of issue. The resolution time of the issue is dependent on the same.</li>

											<br/><h4>GAS CONNECTION:</h4>
											<li>If the issue for replacement of gas cylinder is raised to Homigo, then the cylinder will be replaced within 7 working days (depending on availability).</li>
											<li>Homigo provides all the cylinders / gas stove / gas pipes, but the maintenance of the same is the responsibility of the tenants.</li>
											<li>Gas leakage is a very serious issue and should be brought to Homigo's notice at the earliest. This will be taken as an urgent issue and action will be taken immediately.</li>

											<br/><h4>SOCIETY AMENITIES:</h4>
											<li>Homigo puts no restriction on society amenities and provides society amenities at societies where they are available at no extra cost.</li>
											<li>The availability of the society amenities to the tenants is totally dependent on the society and the society association.</li>
										</ul>
									</div>
								</div>

								<h3 id="sec3">4. General Policies</h3>
								<div class="content">
									<div class="unstyle">
										<ul class="chevronlist">
											<br/><h4>MOVE IN:</h4>
											<li>The tenant is allowed to move in only <b>24 hrs after clearance of security deposit</b>.</li>
											<li>For generating the rental agreement, the tenant is supposed to fill the form at the dashboard. In case the security is cleared and the ID proof is correctly verified, the agreement will be generated in 48 hrs.</li>
											<li>Clearance of the security deposit and the partial rent amount for the move-in month is mandatory for move in.</li>

											<br/><h4>NOTICE:</h4>
											<li>The tenant is supposed to give formal notice one month prior to the date of move out.</li>
											<li>The rent will be charged till 30 days from the notice date.</li>
											<li>Cancellation of notice within the notice period will result in a fine of INR 3000.</li>
											<li>Whether or not the cancellation of move out notice will be allowed is at the discretion of Homigo.</li>
											<li>Only formal notice through the dashboard will be acceptable.</li>
											<li>Extension of stay after the move out date is totally on the discretion of Homigo and is chargeable at INR 750 per day for sharing occupancy and INR 1250 per day for single occupancy.</li>
											
											<br/><h4>MOVE OUT:</h4>
											<li>Tenants need to ensure their presence during the off-board check on the scheduled move out date otherwise, the damages, if any, listed by the off-board team would be considered final.</li>
											<li>The tenant is not allowed to stay at the flat after the move out date.</li>
											<li>The tenant is supposed to inform the Homigo team 2 days before his move out date and get the offboard check done.</li>
											<li>The process of refund will not be initiated until all the keys are handed over.</li>
											<li>15 days rent will be deducted from the security deposit while leaving the flat as maintenance and refurbishing charges.</li>
											<li>The security deposit after deduction of fines and Late Payment Charges will be refunded in <b>7 working days</b> after the date of move out.</li>

											<br/><h4>KEYS:</h4>
											<li>Keys for the main door of the house and particular rooms are provided to all tenants. No separate keys for the cupboards will be provided by Homigo.</li>
											<li>On losing the keys, Homigo charges INR 500 per key replacement or the tenants can get the key replaced themselves.</li>
											
											<br/><h4>LOCK-IN PERIOD:</h4>
											<li>6 months lock in period is imposed by Homigo on the tenant, however in case the society imposes any other lock in period, the same will be applicable.</li>
											<li>It is Homigo's responsibility to inform the tenant about the same before move in.</li>
											
											<br/><h4>RELOCATION:</h4>
											<li>Relocations to a differnt house can only be done after closing the current booking and making a new booking.</li>
											<li>All the rules related to move is, lock in and move out will have to be followed during a relocation.</li>
											<li>Any relocation within the same house involving upgrades to higher rental can be done at any point of time without serving notice or raising a moveout request but will be chargeable at INR 1000 plus service taxes per relocation.</li>

											<br/><h4>MISCELLANEOUS:</h4>
											<li>Collection of keys is the responsibility of the tenant from the Homigo Office.</li>
											<li>All issues should only be raised using the online portal. Homigo will not be responsible for any issues raised using other media.</li>
											<li>A buffer period of 7 days after the tenant’s shift in the house will be provided to Homigo to resolve house related issues.</li>
											<li>Car parking slot will be allotted on a first come first basis (booking time). All other tenants are expected to arrange parking for their respective vehicles themselves.</li>
											<li>In case of theft or any other mishap, Homigo will not be responsible for any damage to the personal belongings of the tenants.</li>
											<li>Every house is equipped with a TV, Washing Machine, Fridge and Geyser and the maintenance of these is the responsibility of the tenants. Homigo is not responsible for the maintenance of any appliances.</li>
											<li>Homigo strives to give its tenants the best of all facilities, however complaints regarding trivial household items like cutlery, mixer-grinder, etc. will not be entertained as it is an add on and the rent is in not inclusive of these items.</li>
											<li>Internal issues / fights among the tenants should be resolved among the flatmates. Involving Homigo is not beneficial and hence undesirable.</li>
											<li>Homigo holds the power to give notice to vacate the flat to any tenant at any point of time because of misbehaviour or breaking of rules.</li>
											<li>For general maintenance and/or showing the house to any new tenant, Homigo shall keep an extra key of the house. It is advised to all the tenants to keep their valuables locked inside the cupboards and not to leave them unattended.</li>
											<li>The services that Homigo provides to tenants are subject to the above Terms and Conditions. Homigo reserves the right to update the Terms and Conditions at any time without any notice to tenants.</li>						
										
											<br/><h4>WHAT THE RENT DOES NOT COVER:</h4>
											<li>Any utensils / crockery provided in the house is an additional service to make your move in smooth and it is not included in the rent.</li>
											<li>All repair services provided by Homigo are additional services to make your stay better and are not a part of the rent.</li>
										
										</ul>
									</div>
								</div>
								
								<br/><br/>
								<ul style={{paddingLeft:'0px'}}>
									<li class="text-center menutitle">FULL HOUSES</li>
								</ul>
								
								<h3 id="sec4">1. Payment Guidelines</h3>
								<div class="content">
									<div class="unstyle">
										<ul class="chevronlist">
											<h4>SECURITY DEPOSIT GUIDELINES:</h4>
											<li>The security deposit amount should be submitted by the tenant to Homigo <b>at least 48 hours</b> prior to the date of move in. In case the security deposit is not received, the tenant will not be allowed to move in.</li>
											<li>In case security deposit is not submitted 48 hrs before move in date, the following will be the consequences:
												<li>INR 1000/- will be deducted from the token advance per day after the selected move in date till the security deposit is paid.</li>
												<li>Move in date will be automatically shifted to the next day.</li>
												<li>Booking will be cancelled in 5 days from the selected move in date.</li>
											</li>
											<li>Homigo should be kept informed <b>1 working day prior to the date of move in</b> so that the necessary arrangements can be made.</li>
											<li><b>Payment mode:</b> Through the dashboard.</li>
											<li>Any extra charges levied by the payment gateway during the transaction will be charged on the tenant making the payment.</li>

											<br/><h4>RENT PAYMENT GUIDELINES:</h4>
											<li>Rent payment should be made by the tenant on or before <b>5th of every month.</b></li>
											<li><b>Late payment charges:</b> In case the rent is not received by 5th of every month, <b>Rs.1000 per day will be charged as late payment charges.</b></li>
											<li>Late Payment Charges and all other fines levied on the tenant will be deducted from the tenant’s security deposit if not paid through the dashboard.</li>
											<li><b>Payment mode:</b> Through the dashboard.</li>
											<li>In case of delays in rental payments, Homigo has the right to report the delay to credit agencies which can impact tenant’s credit score.</li>
											<li>Any extra charges levied by the payment gateway during the transaction will be charged on the tenant making the payment.</li>
											
											<br/><h4>TOKEN PAYMENT GUIDELINES:</h4>
											<li>The token advance paid by the tenant signifies that the place is booked for that particular tenant.</li>
											<li>The token advance amount will be a part of the security deposit.</li>						
											<li>In case the tenant does not occupy the house after the payment of token, <b>token amount will not be refundable.</b></li>
											<li>The rent cycle will start after 15 days of payment of token/the date from when the tenant occupies the place (earlier of the two).</li>
											<li><b>Payment mode:</b> Through the dashboard.</li>
											<li>Any extra charges levied by the payment gateway during the transaction will be charged on the tenant making the payment.</li>

										</ul>
									</div>
								</div>
								<h3 id="sec5">2. House Rules</h3>
								<div class="content">
										<div class="unstyle">
										<ul class="chevronlist">
											<h4>HOUSE CLEANING:</h4>
											<li>It is mandatory for all the tenants to arrange for a housekeeper for cleaning.</li>
											<li>In case any tenant does not cooperate, the same should be brought to Homigo’s notice immediately. Penalty of INR 2000 will be charged on violation of the rule.</li>
											
											<br/><h4>HOUSE DECORUM:</h4>
											<li>As Homigo houses are located in exclusive and select societies of the city, no misconduct will be tolerated in terms of loud music, drinking/smoking in society corridors etc.</li>
											<li>Visitor timings are hive specific. In some hives it may be dependent on owner and association.</li>
											<li>Any damage to the house property and furniture will be applicable for fine.</li>
											<li>All rules and regulations of the society association / owners' association supercede the Homigo's rules.</li>
										</ul>
									</div>
								</div>

								<h3 id="sec6">3. Services</h3>
								<div class="content">
										<div class="unstyle">
										<ul class="chevronlist">
											<br/><h4>UTILITY BILLS:</h4>
											<li>No utility bills are covered by Homigo.</li>

											<br/><h4>SOCIETY AMENITIES:</h4>
											<li>Homigo puts no restriction on society amenities and provides society amenities at societies where they are available at no extra cost.</li>
											<li>The availability of the society amenities to the tenants is totally dependent on the society and the society association.</li>
										</ul>
									</div>
								</div>

								<h3 id="sec7">4. General Policies</h3>
								<div class="content">
									<div class="unstyle">
										<ul class="chevronlist">
											<br/><h4>MOVE IN:</h4>
											<li>The tenant is allowed to move in only <b>24 hrs after clearance of security deposit</b>.</li>
											<li>For generating the rental agreement, the tenant is supposed to fill the form at the dashboard. In case the security is cleared and the ID proof is correctly verified, the agreement can be generated online.</li>
											<li>Clearance of the security deposit and the partial rent amount for the move-in month is mandatory for move in.</li>

											<br/><h4>NOTICE:</h4>
											<li>The tenant is supposed to give formal notice one month prior to the date of move out.</li>
											<li>The rent will be charged till 30 days from the notice date.</li>
											<li>Cancellation of notice within the notice period will result in a fine of INR 3000.</li>
											<li>Approval of cancellation request of move out notice is at the discretion of Homigo as per the availability.</li>
											<li>Only formal notice through the dashboard will be acceptable.</li>
											<li>Extension of stay after the move out date is totally on the discretion of Homigo and is chargeable at INR 3000 per day</li>
											
											<br/><h4>MOVE OUT:</h4>
											<li>Tenants need to ensure their presence during the off-board check on the scheduled move out date otherwise, the damages, if any, listed by the off-board team would be considered final.</li>
											<li>The tenant is not allowed to stay at the flat after the move out date.</li>
											<li>The tenant is supposed to have an off board check before move out.</li>
											<li>The process of refund will not be initiated until all the keys are handed over.</li>
											<li>Subscription Charges equal 15 days of rent will be deducted from the security deposit while leaving the flat as maintenance and refurbishing charges.</li>
											<li>The security deposit after deduction of fines and Late Payment Charges will be refunded in <b>7 working days</b> after the date of move out.</li>

											<br/><h4>KEYS:</h4>
											<li>Keys for the main door of the house and particular rooms are provided to all tenants. No separate keys for the cupboards will be provided by Homigo.</li>
											<li>On losing the keys, Homigo charges INR 500 per key replacement or the tenants can get the key replaced themselves.</li>
											
											<br/><h4>LOCK-IN PERIOD:</h4>
											<li>In general 11 months lock in period is imposed by Homigo on the tenant, however the lock in period varies as per society and owners preference and the same will be reflected on the house details page.</li>
											<li>It is Homigo's responsibility to inform the tenant about the same before move in.</li>

											<br/><h4>MISCELLANEOUS:</h4>
											<li>Collection of keys is the responsibility of the tenant from the Homigo Office.</li>
											<li>All issues should only be raised using the dashboard. Homigo will not be responsible for any issues raised using other media.</li>
											<li>A buffer period of 7 days after the tenant’s shift in the house will be provided to Homigo to resolve house related issues.</li>
											<li>Car parking slot will be allotted on a first come first basis (booking time). All other tenants are expected to arrange parking for their respective vehicles themselves.</li>
											<li>In case of theft or any other mishap, Homigo will not be responsible for any damage to the personal belongings of the tenants.</li>
											<li>Homigo strives to give its tenants the best of all facilities, however complaints regarding trivial household items like cutlery, mixer- grinder etc. will not be entertained as it is an add on and the rent is in not inclusive of these items.</li>
											<li>Internal issues / fights among the tenants should be resolved among the flatmates. Involving Homigo is not beneficial and hence undesirable.</li>
											<li>Homigo holds the power to give notice to vacate the flat to any tenant at any point of time because of misbehaviour or breaking of rules.</li>
											<li>Tenants mandatorily needs to upload their original ID and Address proof (any one of these documents are acceptable- Passport, Driving license, Aadhar card, Voter ID card). Tenants can pay rent and deposit only when the above mentioned documents are verified.</li>
											<li>The services that Homigo provides to tenants are subject to the above Terms and Conditions. Homigo reserves the right to update the Terms and Conditions at any time without any notice to tenants.</li>
										
											<br/><h4>WHAT THE RENT DOES NOT COVER:</h4>
											<li>Any utensils / crockery provided in the house is an additional service to make your move in smooth and it is not included in the rent.</li>
											<li>All repair services provided by Homigo are additional services to make your stay better and are not a part of the rent.</li>
										
										</ul>
									</div>
								</div>
								
							</div>
						</div>
					</div>
					</section>
				<WebFooter />
		  </div>
		);
	}
}

export default Owners;