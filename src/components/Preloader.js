import React, {Component} from 'react';
import WebHeader from './WebHeader.js';
import WebFooter from './WebFooter.js';

class Preloader extends Component {
	render() {
		return (
			<div>
				<div className="preloader">
					<img src={require('../assets/loader.gif')} />
				</div>
				<WebFooter />
			</div>
		);
	}
}

export default Preloader;