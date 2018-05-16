import React, {Component} from 'react';
import {connect} from 'react-redux';
import WebHeader from './WebHeader.js';
import HomeFeatures from './HomeFeatures.js';
import HomeSpotlight from './HomeSpotlight.js';
import HomeSlider from './HomeSlider.js';
import WebFooter from './WebFooter.js';
import HomeHighlights from './HomeHighlights.js';
import LoveItLiveIt from './LoveItLiveIt.js';
import Preloader from './Preloader';
import {getHouses} from '../actions/index.js';
require('../stylesheets/style.css');
require('../stylesheets/home.css');
class Home extends Component {

	componentWillMount() {
    let buildings = this.props.getHouses();
  }
	render() {
		let buildings_selected = this.props.buildings.slice(0, 9);
		if(buildings_selected.length > 0) {
			return (
				<div className="mainWrapper">
					<WebHeader location={this.props.location.pathname} location={this.props.location.pathname}/>
					<HomeSpotlight />
					<HomeSlider buildings={buildings_selected}/>
					<HomeFeatures />
					<HomeHighlights />
					<LoveItLiveIt />
					<WebFooter />
			  </div>
			);
		}
		else {
			return (
				<div className="mainWrapper">
					<WebHeader location={this.props.location.pathname} location={this.props.location.pathname}/>
					<HomeSpotlight />
					<Preloader />
					<HomeFeatures />
					<HomeHighlights />
					<WebFooter />
			  </div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		buildings: state.buildings.all
	}
}

export default connect(mapStateToProps, {getHouses: getHouses})(Home);