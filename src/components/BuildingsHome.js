import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import {createStore} from 'redux';
import {getHouses, filterBuildings} from '../actions/index';
import {Link} from 'react-router';
import WebFooter from './WebFooter.js';
import WebHeader from './WebHeader.js';
import BuildingsFilterLink from './BuildingsFilterLink.js';
import MainMap from './MainMap';
require('../stylesheets/houses.css');
require('../stylesheets/home.css');
const now = require("performance-now");

class BuildingsHome extends Component {
	componentWillMount() {
		let buildings = this.props.getHouses();
	}

	handleBuildingHover(buildingId) {
		return null;
	}

	renderBuildings() {
		if (this.props.buildings) {
			return this.props.buildings.map((building, index) => {
				const bgPreviewImage = {
					backgroundImage: 'url('+building.preview_img.replace('development', 'production')+')'
				}
				if(this.state && this.state.activeId === building.id) {
					return (
						<Link key={index} id={building.id} to={'/hives/'+building.id} params={{buildingId: building.id}} target="_blank">
				            <div className="item item-building item-active text-center" style={bgPreviewImage}>
				              <div id="overlay">
				                <header>
				                  <p className="item-subhead">{building.name.split(' ')[0]}</p>
				                  <h3>{building.name.split(' ')[1]}</h3>
				                </header>
				                <div className="seperator seperator-item"></div>
				                <div className="item-content"><p>{building.landmark}</p></div>
				              </div>
				            </div>
				        </Link>
					);
				}
				else {
					return (
						<Link key={building.id} to={'/hives/'+building.id} params={{buildingId: building.id}} target="_blank">
				            <div className="item item-building text-center" style={bgPreviewImage}>
				              <div id="overlay">
				                <header>
				                  <p className="item-subhead">{building.name.split(' ')[0]}</p>
				                  <h3>{building.name.split(' ')[1]}</h3>
				                </header>
				                <div className="seperator seperator-item"></div>
				                <div className="item-content"><p>{building.landmark}</p></div>
				              </div>
				            </div>
				        </Link>
					);
				}
			});
		}
	}
	handleMarkerClick = () => {
  //   this.setState({ activeId: id });
  //   let itemsList = document.getElementById('items');
		// let item = document.getElementById(id);
		// itemsList.scrollTop = item.offsetTop-15;


		// var cosParameter = itemsList.scrollY / 2,
  //       scrollCount = 0,
  //       oldTimestamp = now();
  //   function step (newTimestamp) {
  //       scrollCount += Math.PI / (1000 / (newTimestamp - oldTimestamp));
  //       if (scrollCount >= Math.PI) itemsList.scrollTo(item.offsetTop-15, 0);
  //       itemsList.scrollTo(item.offsetTop-15, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
  //       oldTimestamp = newTimestamp;
  //       itemsList.requestAnimationFrame(step);
  //   }
  //   //itemsList.requestAnimationFrame(step);


  }
	render() {
		return (
			<div>
				<WebHeader location={this.props.location.pathname} />
				<div className="container houses-container">
				 <div id="desktop-head" className="page-header">
				   <h2 className="text-center">At the right places</h2>
				 </div>
				 <div id="mobile-head" className="text-center">
				   <h3>Choose your locality</h3>
				 </div>
				 <div>
				  <div className="nav-location-wrapper">
					  <ul className="nav nav-location">
					    <li><BuildingsFilterLink filter="Bellandur" center="12.932027,77.676593">Bellandur</BuildingsFilterLink></li>
					    <li><BuildingsFilterLink filter="BTM Layout" center="12.902398,77.611197">BTM Layout</BuildingsFilterLink></li>
					    <li><BuildingsFilterLink filter="HSR Layout" center="12.902383,77.645392">HSR Layout</BuildingsFilterLink></li>
					    <li><BuildingsFilterLink filter="Indira Nagar" center="12.974353,77.664631">Indira Nagar</BuildingsFilterLink></li>
					    <li><BuildingsFilterLink filter="Koramangala" center="12.934961,77.622881">Koramangala</BuildingsFilterLink></li>
					    <li><BuildingsFilterLink filter="Marathahalli" center="12.956439,77.728244">Marathahalli</BuildingsFilterLink></li>
					    <li><BuildingsFilterLink filter="MG Road" center="12.968521,77.601091">MG Road</BuildingsFilterLink></li>
					  </ul>
					</div>
				 </div>

				  <div className="row content">
				    <div className="col-md-6 col-sm-6 col-xs-12">
				      <div id="map">
				      	<MainMap
								  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6qmCAqZlKh3loYU3HkU9iIMQdEynEZa0"
								  loadingElement={<div style={{ height: `100%` }} />}
								  containerElement={<div style={{ height: `100%` }} />}
								  mapElement={<div style={{ height: `100%` }} />}
								  buildingsData = {this.props.buildings}
								  onMarkerClick={this.handleMarkerClick}
								/>
				      </div>
				    </div>
				    <div className="col-md-6 col-sm-6 col-xs-12">
				      <div id="items" className="items-wrapper">
				        {this.renderBuildings()}
				        <p className='post-requirement'>Can't find your requirement? <a href='https://homigoteam.typeform.com/to/spC4tP' data-mode='2' target='_blank' className='typeform-share btn btn-primary'>Post your requirement</a></p>
				      </div>
				    </div>
				  </div>
				</div>
				<WebFooter />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {buildings: state.buildings.show, filter: state.buildings.filter};
}


export default connect( mapStateToProps, {getHouses: getHouses})(BuildingsHome);