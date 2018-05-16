import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fliterOnClick, changeMapState} from '../actions/index';


const Link = ({
  active, 
  children,
  onClick
}) => {
  if(active) {
    return <span>{ children }</span>;
  }
  return (
    <a 
    	onClick={onClick}>
      { children }
    </a>
  )
};

class BuildingsFilterLink extends Component {

	render() {
		return (
			<Link 
        onClick = { () =>
          {
            let newCenter = this.props.center.split(',');
            let newLat = parseFloat(newCenter[0]);
            let newLng = parseFloat(newCenter[1]);
    				this.props.fliterOnClick(this.props.filter);
            this.props.changeMapState({lat: newLat, lng: newLng}, 13);
          }
  			}

			>
				{this.props.children}
			</Link>
		);
	}
}


export default connect( null, {fliterOnClick: fliterOnClick, changeMapState: changeMapState })(BuildingsFilterLink);