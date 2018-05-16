import React, {Component} from 'react';
import Slider from 'react-slick';

class HomeSlider extends Component {
	renderSlides(length) {
		return this.props.buildings.map((building, index) => {
			return (
				<div key={index}>
	        <a href={'/hives/'+building.id} target="_blank">
	          <div className="slider-item">
	             <img className="img-responsive" alt="building img preview house" src={building.preview_img.replace('development', 'production')} />
	            <p className="slider-sub-head">{building.name.split(' ')[0]}</p>
	            <h2>{building.name.split(' ')[1]}</h2>
	            <div className="seperator"></div>
	            <p className="slider_building_location">{building.location}</p>
	          </div>
	        </a>
	      </div>
      )
		});
	}
	render() {
		let settings = '';
		settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      lazyLoad: true,
      autoplay: true
    };
	  if(window.innerWidth < 500){
	  	settings = {
	      dots: false,
	      infinite: true,
	      speed: 500,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      lazyLoad: true,
	      autoplay: true
	    };
	  }
		return (
			<div>
				<div className="home-slider section">
			    <header>
			      <h2 className="text-center">Homigo Hives</h2>
			      <p className="text-center sub-head">Live. Share. Socialize</p>
			    </header>
			    <Slider {...settings}>
		        {this.renderSlides()}
			    </Slider>
			    <div className="pull-right">
			      <p className="foot-link"><a className="btn btn-primary" href="/houses">Explore all</a></p>
			    </div>
			    <br/>
			  </div>
			</div>
		);
	}
}

export default HomeSlider;