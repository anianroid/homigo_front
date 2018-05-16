import React, {Component} from 'react';
import 'react-dates/initialize';
require('../stylesheets/index.css');
require('../stylesheets/home.css');
require('../stylesheets/houses.css');
require('../stylesheets/style.css');

class App extends Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export default App;
