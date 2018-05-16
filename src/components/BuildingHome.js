import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {connect} from 'react-redux';
import {createStore} from 'redux';
import {getBuilding, changeHousesChoice, getPropertiesForBuilding, scheduleVisit, getRooms} from '../actions/index';
import {Link} from 'react-router';
import WebFooter from './WebFooter.js';
import WebHeader from './WebHeader.js';
import BuildingsFilterLink from './BuildingsFilterLink.js';
import BuildingMap from './BuildingMap';
import Preloader from './Preloader';
import Slider from 'react-slick';
import { Modal } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
require('../stylesheets/houses.css');
require('../stylesheets/home.css');
const now = require("performance-now");
const currencyFormatter = require('currency-formatter');

let count_items = 0;

class BuildingHome extends Component {
  
  constructor() {
    super();
    this.state = {house_type: 100, modalIsOpen: false, visitor: {name: '', email: '', contact: '', date: '', time_slot: '', hive_id: ''}}
    this.renderHouses = this.renderHouses.bind(this);
    this.resetHouses = this.resetHouses.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.scheduleClick = this.scheduleClick.bind(this);
  }

  componentWillMount() {
    let building = this.props.getBuilding(this.props.params["buildingId"]);
    let houses = this.props.getPropertiesForBuilding(this.props.params["buildingId"]);
    let rooms = this.props.houses.map(
      house => {
        this.props.getRooms(this.props.building.id, house.id)
      }
    )
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }
  afterOpenModal() {
    return true;
  }
  closeModal() {
    this.setState({modalIsOpen: false})
  }

  onChange(event) {
    const field = event.target.name;
    const visitor = this.state.visitor;
    visitor[field] = event.target.value;
    return this.setState({visitor: visitor});
  }

  scheduleClick() {
    this.setState({modalIsOpen: false})
    this.props.scheduleVisit(this.state.visitor);
  }

  housesCount(type) {
    if(type === 'shared') {
      return this.props.houses.filter(house => house.select !== 3).length
    }
    if(type === 'full') {
      return this.props.houses.filter(house => house.select === 3).length
    }
  }

  lowestRent(data, type) {
    let rents = [];
    if(data.length > 0) {
      if(type === 'shared') {
        for (var i in data) 
        {
          if(data[i].lowest_rent.shared) {
            rents.push(data[i].lowest_rent.shared);
          }
        }
        if(rents.length > 0) {
          if(Math.min(rents)) {
            return currencyFormatter.format(rents.reduce(function(a,b){return Math.min(a,b);}), {code: 'INR'}).split('.')[0]+' Onwards';
          }
          else {
            return currencyFormatter.format(rents[0], {code: 'INR'}).split('.')[0]+' Onwards';
          }
        }
        else {
          return <div><i style={{color: "red"}} className="fa fa-minus-circle"></i></div>;
        }
      }
      else if(type === 'full') {
        for (var i in data) 
        {
          if(data[i].lowest_rent.full && data[i].select === 3) {
            rents.push(data[i].lowest_rent.full);
          }
        }
        if(rents.length > 0) {
          return currencyFormatter.format(rents.reduce(function(a,b) {return Math.min(a,b);}), {code: 'INR'}).split('.')[0]+' Onwards';
        }
        else {
          return (<div><i style={{color: "red"}} className="fa fa-minus-circle"></i></div>);
        }
      }
      else if(type === 'overall') {
        for (var i in data) 
        {
          if(data[i].lowest_rent.full>0 && data[i].select === 3) {
            rents.push(data[i].lowest_rent.full);
          }
          if(data[i].lowest_rent.shared>0) {
            rents.push(data[i].lowest_rent.shared);
          }
        }
        if(rents.length > 0) {

          let lowest_overall = rents.reduce(function(a,b) {
            return Math.min(a,b);
          });
          return currencyFormatter.format(lowest_overall, {code: 'INR'}).split('.')[0]+' Onwards';
        }
        else {
          return (<div><i style={{color: "red"}} className="fa fa-minus-circle"></i></div>);
        }
      }
    }
    else {
      return <i style={{color: "red"}} className="fa fa-minus-circle"></i>;
    }
  }

  renderFurnishing() {
    if(this.props.building)
      return this.props.building.amenities
      .filter(
        (val) => val.category === 1
      )
      .map(
        (item, index) => {
          return(
            <li key={index}>{item.name}</li>
          )
          count_items = count_items+1;
        }
      )
  }
  renderAppliances() {
    if(this.props.building)
      return this.props.building.amenities
      .filter(
        (val) => val.category === 2
      )
      .map(
        (item, index) => {
          return(
            <li key={index}>{item.name}</li>
          )
          count_items = count_items+1;
        }
      )
  }
  renderCommonAmenities() {
    if(this.props.building)
      return this.props.building.amenities
      .filter(
        (val) => val.category === 3
      )
      .map(
        (item, index) => {
          return(
            <li key={index}>{item.name}</li>
          )
          count_items = count_items+1;
        }
      )
  }
  renderUtilities() {
    if(this.props.building)
      return this.props.building.amenities
      .filter(
        (val) => val.category === 4
      )
      .map(
        (item, index) => {
          return(
            <li key={index}>{item.name}</li>
          )
          count_items = count_items+1;
        }
      )
  }
  renderImages(length) {
    return this.props.building.building_pictures.map((building, index) => {
      return (
        <div key={index}>
          <img className="responsive-img" src={building.url.replace('development', 'production')} />
        </div>
      )
    });
  }
  renderImageGallery() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: false,
      autoplay: true
    };
    return (
      <Slider {...settings}>
        {this.renderImages()}
      </Slider>
    )
  }


  // Start animations and rerenders //
    sharedHouseRender() {
      this.props.changeHousesChoice(1);
      this.setState({house_type: 1});
      document.getElementById('full-house').style.display = "none";
      document.getElementById('shared-close-collapse').style.visibility = "visible";
      document.getElementById('shared-house').classList.remove('col-md-6');
      document.getElementById('shared-house').classList.remove('col-sm-6');
      document.getElementById('shared-house').classList.add('col-md-12');
      document.getElementById('shared-house').classList.add('col-sm-12');
      document.getElementById('shared-house-link').classList.add('col-sm-12');
      document.getElementById('shared-house-link').classList.remove('item-link-animate');
      document.getElementById('shared-choice-wrapper').style.padding = "0%";
      document.getElementById('shared-house-link').style.width = "100%";
      document.getElementById('shared-close-collapse').style.display = "block";
    }
    fullHouseRender() {
      this.props.changeHousesChoice(2);
      this.setState({house_type: 2});
      document.getElementById('shared-house').style.display = "none";
      document.getElementById('full-close-collapse').style.visibility = "visible";
      document.getElementById('full-house').classList.remove('col-md-6');
      document.getElementById('full-house').classList.remove('col-sm-6');
      document.getElementById('full-house').classList.add('col-md-12');
      document.getElementById('full-house').classList.add('col-sm-12');
      document.getElementById('full-house-link').classList.add('col-sm-12');
      document.getElementById('full-house-link').classList.remove('item-link-animate');
      document.getElementById('full-choice-wrapper').style.padding = "0%";
      document.getElementById('full-house-link').style.width = "100%";
      document.getElementById('full-close-collapse').style.display = "block";
    }
    resetHouses() {
      this.setState({house_type: 0});
      this.props.changeHousesChoice(0);
      document.getElementById('full-house').style.display = "block";
      document.getElementById('full-house').classList.remove('col-md-12');
      document.getElementById('full-house').classList.remove('col-sm-12');
      document.getElementById('full-house').classList.add('col-md-6');
      document.getElementById('full-house').classList.add('col-sm-6');
      document.getElementById('full-house-link').classList.remove('col-sm-12');
      document.getElementById('full-house-link').classList.add('item-link-animate');
      if(window.screen.width > 500) {
        document.getElementById('full-choice-wrapper').style.padding = "20%"
      }
      else {
        document.getElementById('full-choice-wrapper').style.padding = "10% 2%"
      }
      document.getElementById('full-house-link').style.width = "75%";
      document.getElementById('full-close-collapse').style.display = "none";
      document.getElementById('shared-house').style.display = "block";
      document.getElementById('shared-house').classList.remove('col-md-12');
      document.getElementById('shared-house').classList.remove('col-sm-12');
      document.getElementById('shared-house').classList.add('col-md-6');
      document.getElementById('shared-house').classList.add('col-sm-6');
      document.getElementById('shared-house-link').classList.add('col-sm-12');
      document.getElementById('shared-house-link').classList.add('item-link-animate');
      if(window.screen.width > 500) {
        document.getElementById('shared-choice-wrapper').style.padding = "20%"
      }
      else {
        document.getElementById('shared-choice-wrapper').style.padding = "10% 2%"
      }
      document.getElementById('shared-house-link').style.width = "75%";
      document.getElementById('shared-close-collapse').style.display = "none";
    }
  // End animations and rerenders //

  renderHouses() {
    const user_gender = sessionStorage.userData ? (JSON.parse(sessionStorage.userData).gender == 0 ? 0 : 1) : 2
    let displayNone = {
      display: 'none'
    }
    function compare(a,b) {
      return (a.availableCount - b.availableCount)*-1;
    }
    switch(this.state.house_type) {
      case 0: {
        return null;
      }
      case 1: {
        if(this.props.houses.filter(house => house.select != 3).length > 0)
          return this.props.houses
          .filter(
            (house) => {
              return house.select != 3;
            })
          .sort(compare)
          .map(
            (house, index) => {
              let gender = house.occupied_by ? (house.occupied_by == 1 ? 'F' : 'OPEN') : 'M'
              let genderClass = house.occupied_by ? (house.occupied_by == 1) ? 'femaleColor' : '' : 'maleColor'
              let styleClass = 'btn btn-primary btn-sm ';
              if(house.availableCount === 0) {
                styleClass += 'disabled';
              }
              return (
                <div key={house.id} style={house.availableCount === 0 ? {opacity: '0.4', border: '1px solid #0000002e'} : (user_gender !== house.occupied_by ? (user_gender === 2 ? {} :(house.occupied_by === 2 ? {} : {opacity: '0.4', border: '1px solid #0000002e'})) : {})}>
                  <header>
                    <div><p>HID{house.id}</p></div>
                    <div><p className={genderClass}>{gender}</p></div>
                    <div><p>{house.property_type}</p></div>
                  </header>
                  <div>
                    <div>
                      <h4>{house.lowest_rent.shared ? currencyFormatter.format(house.lowest_rent.shared, {code: 'INR'}).split('.')[0] : 'NA'}</h4>
                      <h4><small>Per Bed</small></h4>
                    </div>
                    <div>
                      <h4>{house.lowest_rent.full ? currencyFormatter.format(house.lowest_rent.full, {code: 'INR'}).split('.')[0] : 'NA'}</h4>
                      <h4><small>Full Room</small></h4>
                    </div>
                    <div>
                      <h4>3 <small>months</small></h4>
                      <h4><small>Deposit</small></h4>
                    </div>
                    <div>
                      <h4>{house.availableCount} <small>Room(s)</small></h4>
                      <h4><small>Availability</small></h4>
                    </div>
                  </div>
                  <footer>
                    <div>
                      <a href={`/houses/${house.id}/${house.building_id}/book`} className={house.availableCount === 0 ? 'btn btn-property disabled' : (user_gender !== house.occupied_by ? (user_gender === 2 ? 'btn btn-property' :(house.occupied_by === 2 ? 'btn btn-property' : 'btn btn-property disabled')) : 'btn btn-property')}>Book Now</a>
                    </div>
                  </footer>
                </div>
              )
            }
          ) 
        else
          return (
            <div className="text-center noContentContainer">
              <h3>Opps!</h3>
              <p>There are no shared houses in here!</p>
              <div><a href="/houses" className="btn btn-primary">Explore Houses</a></div>
            </div>
          )
      }
      case 2: {
        if(this.props.houses.filter(house => house.select === 3).length > 0)
          return this.props.houses
          .filter(
            (house) => {
              return house.select === 3;
            })
          .sort(compare)
          .map(
            (house, index) => {
              let gender = house.occupied_by ? (house.occupied_by == 1) ? 'F' : 'OPEN' : 'M'
              let genderClass = house.occupied_by ? (house.occupied_by == 1) ? 'femaleColor' : '' : 'maleColor'
              let totalavailability = house.availableCount ? 'Available' : 'Booked';
              let maintenance = 0;
              let styleClass = 'btn btn-primary btn-sm disabled';
              if(house.totalavailability){
                totalavailability = 'Available';
                let styleClass = 'btn btn-primary btn-sm ';
              }
              if(house.maintenance)
                maintenance = house.maintenance;
              return (
                <div key={house.id} style={house.availableCount === 0 ? {opacity: '0.4', border: '1px solid #0000002e'} : {}}>
                  <header>
                    <div><p>HID{house.id}</p></div>
                    <div><p className={genderClass}>{gender}</p></div>
                    <div><p>{house.property_type}</p></div>
                  </header>
                  <div>
                    <div>
                      <h4>{currencyFormatter.format(house.lowest_rent.full, {code: 'INR'}).split('.')[0]}</h4>
                      <h4><small>Rent</small></h4>
                    </div>
                    <div>
                      <h4>{house.maintenance ? currencyFormatter.format(house.maintenance, {code: 'INR'}).split('.')[0] : 'Variable'}</h4>
                      <h4><small>Maintenance</small></h4>
                    </div>
                    <div>
                      <h4>6 <small>months</small></h4>
                      <h4><small>Deposit</small></h4>
                    </div>
                    <div>
                      <h4>{totalavailability}</h4>
                      <h4><small>Availability</small></h4>
                    </div>
                  </div>
                  <footer>
                    <div>
                      <a href={`/houses/${house.id}/${house.building_id}/book`} className={totalavailability === 'Booked' ? 'btn btn-property disabled' : 'btn btn-property' }>Book Now</a>
                    </div>
                  </footer>
                </div>
              )
            }
          )
        else
          return (
            <div className="text-center noContentContainer">
              <h3>Oops!</h3>
              <p>There are no full houses in here!</p>
              <div><a href="/houses" className="btn btn-primary">Explore Houses</a></div>
            </div>
          )
      }
      case 100: {
        console.log('Houses list cleared');
        break;
      }
      default: {
        if(this.props.houses.filter(house => house.select != 3).length > 0)
          return this.props.houses
          .filter(
            (house) => {
              return house.select != 3;
            })
          .sort(compare)
          .map(
            (house, index) => {
              let gender = house.occupied_by ? (house.occupied_by == 1) ? 'F' : 'OPEN' : 'M'
              let genderClass = house.occupied_by ? (house.occupied_by == 1) ? 'femaleColor' : '' : 'maleColor'
              let styleClass = 'btn btn-primary btn-sm ';
              if(house.totalavailability === 0) {
                styleClass += 'disabled';
              }
              return (
                <div key={house.id} style={house.availableCount === 0 ? {opacity: '0.4', border: '1px solid #0000002e'} : {}}>
                  <header>
                    <div><p>HID{house.id}</p></div>
                    <div><p className={genderClass}>{gender}</p></div>
                    <div><p>{house.property_type}</p></div>
                  </header>
                  <div>
                    <div>
                      <h4>{house.lowest_rent.shared ? currencyFormatter.format(house.lowest_rent.shared, {code: 'INR'}).split('.')[0] : 'NA'}</h4>
                      <h4><small>Per Bed</small></h4>
                    </div>
                    <div>
                      <h4>{house.lowest_rent.full ? currencyFormatter.format(house.lowest_rent.full, {code: 'INR'}).split('.')[0] : 'NA'}</h4>
                      <h4><small>Full Room</small></h4>
                    </div>
                    <div>
                      <h4>3 <small>months</small></h4>
                      <h4><small>Deposit</small></h4>
                    </div>
                    <div>
                      <h4>{house.available ? house.available : '1.5'} <small>Room(s)</small></h4>
                      <h4><small>Availability</small></h4>
                    </div>
                  </div>
                  <footer>
                    <div>
                      <a href={`/houses/${house.id}/${house.building_id}/book`} className={house.available === 0 ? 'btn btn-property disabled' : 'btn btn-property'}>Book Now</a>
                    </div>
                  </footer>
                </div>
              )
            }
          ) 
        else
          return (
            <div className="text-center noContentContainer">
              <h3>Oops!</h3>
              <p>There are no shared houses in here!</p>
              <div><a href="/houses" className="btn btn-primary">Explore Houses</a></div>
            </div>
          )
      }
    }
  }
  render() {

    var $zoho = $zoho || {};
    $zoho.salesiq = $zoho.salesiq || {
        widgetcode: '341cd52063259b097bce23e26e98e992758ceaed5eb6597cb19fe08fbc0ed25ff6feec4ce2f3a3303a81b473cd753312',
        values: {},
        ready: function() {
            $zoho.salesiq.floatbutton.visible('hide');
        }
    };
    let d = document;
    let s = d.createElement('script');
    s.type = 'text/javascript';
    s.id = 'zsiqscript';
    s.defer = true;
    s.src = 'https://salesiq.zoho.com/widget';
    let t = d.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);

    function trackVisitor() {
        try {
            if ($zoho) {
                var LDTuvidObj = document.forms['WebToLeads2676338000003892004']['LDTuvid'];
                if (LDTuvidObj) {
                    LDTuvidObj.value = $zoho.salesiq.visitor.uniqueid();
                }
                var firstnameObj = document.forms['WebToLeads2676338000003892004']['First Name'];
                if (firstnameObj) {
                    name = firstnameObj.value + ' ' + name;
                }
                $zoho.salesiq.visitor.name(name);
                var emailObj = document.forms['WebToLeads2676338000003892004']['Email'];
                if (emailObj) {
                    email = emailObj.value;
                    $zoho.salesiq.visitor.email(email);
                }
            }
        } catch (e) {}
    }

    let mndFileds=new Array('Last Name','Phone','LEADCF81','LEADCF8');
    let fldLangVal=new Array('Name','Phone','Date','Time');
    let name='';
    let email='';

    function checkMandatory() {
      for(let i=0;i<mndFileds.length;i++) {
        let fieldObj=document.forms['WebToLeads2676338000003892004'][mndFileds[i]];
        if(fieldObj) {
        if (((fieldObj.value).replace(/^\s+|\s+$/g, '')).length==0) {
         if(fieldObj.type =='file')
          { 
           alert('Please select a file to upload.'); 
           fieldObj.focus(); 
           return false;
          } 
        alert(fldLangVal[i] +' cannot be empty.'); 
                fieldObj.focus();
                return false;
        }  else if(fieldObj.nodeName=='SELECT') {
               if(fieldObj.options[fieldObj.selectedIndex].value=='-None-') {
          alert(fldLangVal[i] +' cannot be none.'); 
          fieldObj.focus();
          return false;
           }
        } else if(fieldObj.type =='checkbox'){
         if(fieldObj.checked == false){
          alert('Please accept  '+fldLangVal[i]);
          fieldObj.focus();
          return false;
           } 
         } 
         try {
             if(fieldObj.name == 'Last Name') {
          name = fieldObj.value;
            }
        } catch (e) {}
          }
      }
      trackVisitor();
    }
    if(this.props.building) {
      return (
        <div>
          <WebHeader location={this.props.location.pathname} />
            <div className="clearfix">
              <div className="home-main-wrapper">
                <div className="home-main-content clearfix">
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="home-main-text">
                      <h1>{this.props.building.name}</h1>
                      <p><span id="lowest_rent">{this.lowestRent(this.props.houses, 'overall')['html']}</span> </p>
                      <h3><i className="glyphicon glyphicon-map-marker"></i> {this.props.building.location}, Bangalore</h3><br />
                      <button  className="btn btn-primary" onClick={this.openModal}>Schedule Visit</button> &nbsp; <a className="btn btn-primary" href={"https://www.google.co.in/maps/dir//"+this.props.building.latitude+","+this.props.building.longitude} target="_blank">Route</a>
                    </div>
                  </div>
                  <Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
                    <Modal.Header>
                      <h2 className="text-center">Schedule a visit</h2>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <div id='crmWebToEntityForm' style={{width:'auto', margin:'auto'}}>
                          <form action='https://crm.zoho.com/crm/WebToLeadForm' name="WebToLeads2676338000003892004" method='POST' onSubmit='javascript:document.charset="UTF-8"; return checkMandatory()' accept-charset='UTF-8'>
                            <input type='text' style={{display:'none'}} name='xnQsjsdp' value='11fea4fe484445f5830c20450b79c1d5dadbfdf143cd7a1b4ce093dd46f7c323'/>
                            <input type='hidden' name='zc_gad' id='zc_gad' value=''/>
                            <input type='text' style={{display:'none'}} name='xmIwtLD' value='6f9e448b2d42c1123f7e1997e1c73a3f66b29be41561e281c36af57c523af75f'/>
                            <input type='text' style={{display:'none'}}  name='actionType' value='TGVhZHM='/>
                            <input type='text' style={{display:'none'}} name='returnURL' value='https&#x3a;&#x2f;&#x2f;homigo.in' /> 
                            <input type='text' style={{display:'none'}} id='ldeskuid' name='ldeskuid'></input>
                            <input type='text' style={{display:'none'}} id='LDTuvid' name='LDTuvid'></input>
                            <table style={{
                                width:'100%', 
                                backgroundColor: 'white', 
                                color: 'black'
                              }}
                            >
                              <tr>
                                <td 
                                  style={{
                                    nowrap:'nowrap', 
                                    textAlign: 'left', 
                                    fontSize: '12px', 
                                    fontFamily: 'Arial', 
                                    width:'200px'
                                  }}
                                >
                                  Name<span style={{color: 'red'}}>*</span>
                                </td>
                                <td 
                                  style={{
                                    width:'250px'
                                  }} 
                                >
                                  <input 
                                    className="form-control" 
                                    type='text' 
                                    style={{width:'250px'}}  
                                    maxlength='80' 
                                    name='Last Name' 
                                  />
                                </td>
                              </tr>

                              <tr>
                                <td 
                                  style={{
                                    nowrap:'nowrap', 
                                    textAlign:'left', 
                                    fontSize:'12px', 
                                    fontFamily:'Arial', 
                                    width:'200px'
                                  }}
                                >
                                  Phone <span style={{color:'red'}}>*</span>
                                </td>
                                <td 
                                  style={{
                                    width: '250px'
                                  }}
                                >
                                  <input 
                                    className="form-control" 
                                    type='text' 
                                    style={{width:'250px'}}  
                                    maxlength='30' 
                                    name='Phone' 
                                  />
                                </td>
                              </tr>

                              <tr>
                                <td 
                                  style={{
                                    nowrap:'nowrap', 
                                    textAlign:'left', 
                                    fontSize:'12px', 
                                    fontFamily:'Arial', 
                                    width: '200px'
                                  }}
                                >Date<span style={{color: 'red'}}>*</span>
                                </td>
                                <td 
                                  style={{
                                    width:'250px'
                                  }}
                                >
                                  <input 
                                    className="form-control" 
                                    type='text' 
                                    style={{width:'250px'}}  
                                    maxlength='20' 
                                    name='LEADCF81' 
                                    placeholder='dd/MM/yyyy' 
                                  />
                                </td>
                              </tr>

                              <tr>
                                <td 
                                  style={{
                                    nowrap:'nowrap', 
                                    textAlign:'left', 
                                    fontSize:'12px', 
                                    fontFamily:'Arial', 
                                    width:'200px'
                                  }}
                                >Time <span style={{color:'red'}}>*</span></td><td style={{width:'250px'}}>
                                  <select 
                                    style={{
                                      width:'250px'
                                    }} 
                                    name='LEADCF8'
                                    className="form-control"
                                  >
                                    <option value='-None-'>-None-</option>
                                    <option value='Morning'>Morning</option>
                                    <option value='Afternoon'>Afternoon</option>
                                    <option value='Evening'>Evening</option>
                                  </select>
                                </td>
                              </tr>

                              <tr 
                                style={{
                                  display:'none'
                                }} 
                              >
                                <td 
                                  style={{
                                    nowrap:'nowrap', 
                                    textAlign:'left', 
                                    fontSize: '12px', 
                                    fontFamily: 'Arial', 
                                    width: '50%'
                                  }}
                                >Hive Name
                                </td>
                                <td 
                                  style={{
                                    width:'250px'
                                  }}
                                >
                                  <input 
                                    type='text' 
                                    style={{
                                      width:'250px'
                                    }}  
                                    maxlength='255' 
                                    name='LEADCF9' 
                                    value={this.props.building.name}
                                    className="form-control"
                                  ></input>
                                </td>
                              </tr>
                              <tr>
                                <td 
                                  colspan='2' 
                                  style={{
                                    textAlign:'center', 
                                    paddingTop: '15px'
                                  }}
                                >
                                  <input 
                                    style={{
                                      fontSize:'16px', 
                                      color: '#131307'
                                    }}
                                    type='submit' 
                                    value='Submit'
                                    className="btn btn-primary"
                                  />
                                </td>
                              </tr>
                            </table>
                          </form>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                  <div className="col-md-6 col-sm-6 col-xs-12 text-right">
                    <div className="main-video-wrapper">
                      <div className="main-video margin-top12percent">
                        <div id="pic-gallery">
                        {this.renderImageGallery()}
                        </div>  
                      </div>
                    </div>
                    <div className="main-video-bg"></div>
                  </div>
                </div>
              </div>
              <div className="bg-soft-grey">
                <div className="clearfix">
                  <div className="container-fluid section experience">
                    <header>
                      <h2 className="text-center">Life at {this.props.building.name.split(' ')[1]}</h2>
                      <p className="text-center sub-head">Experience it with us.</p>
                    </header>
                    <div className="col-md-3 col-sm-3 col-xs-6">
                      <div className="experience-card building-experience-card clearfix">
                        <div className="col-sm-12">
                          <div className="building-experience-icon">
                            <img src={require('../assets/icons/furnishing@2x.png')} />
                            <h4>Furnishing <small><a data-tip="Available in shared living and furnished package of full houses only"><i className="fa fa-info-circle" aria-hidden="true"></i></a></small></h4>
                            <ReactTooltip type="dark" effect="solid"/>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="building-experience-content">
                            <ul id="furnishing">
                              {this.renderFurnishing()}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-6">
                      <div className="experience-card building-experience-card clearfix">
                        <div className="col-sm-12">
                          <div className="building-experience-icon">
                            <img src={require('../assets/icons/appliances@2x.png')} />
                            <h4>Appliances <small><a data-tip="Available in shared living and furnished package of full houses only"><i className="fa fa-info-circle" aria-hidden="true"></i></a></small></h4>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="building-experience-content">
                            <ul id="appliances">
                              {this.renderAppliances()}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-6">
                      <div className="experience-card building-experience-card clearfix">
                        <div className="col-sm-12">
                          <div className="building-experience-icon">
                            <img src={require('../assets/icons/social_amenities@2x.png')} />
                            <h4>Common Amenities <small><a data-tip="May be subject to availability and/or society association" data-placement="top"><i className="fa fa-info-circle" aria-hidden="true"></i></a></small></h4>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="building-experience-content">
                            <ul id="social_amenities">
                              {this.renderCommonAmenities()}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-6">
                      <div className="experience-card building-experience-card clearfix">
                        <div className="col-sm-12">
                          <div className="building-experience-icon">
                            <img src={require('../assets/icons/utilities@2x.png')} />
                            <h4>Utilities <small><a data-tip="Available in shared living and furnished(utilities included) package of full houses only" data-placement="top"><i className="fa fa-info-circle" aria-hidden="true"></i></a></small></h4>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="building-experience-content">
                            <ul id="utilities">
                              {this.renderUtilities()}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="clearfix">
                  <div className="container-fluid spotlight" id="houses-spotlight">
                    <header><h2 className="text-center">Options at {this.props.building.name.split(' ')[1]}</h2></header><br /><br />
                    <div className="clearfix">
                      <div id="choice-content">
                        <div id="shared-house" className="col-md-6 col-sm-6 col-xs-12 item-choice">
                          <div id="shared-choice-wrapper" className="item-choice-wrapper">
                            <div className="item-bg shared-choice"></div>
                            <div id="shared-close-collapse" className="close-collapse pull-right" onClick={this.resetHouses}><i className="glyphicon glyphicon-remove"></i></div>
                            <div id="shared-house-link" data-choice-type="shared" onClick={this.housesCount('shared') ? this.sharedHouseRender.bind(this) : null} className="item-link item-link-animate">
                              <p>Share your house</p>
                              <h2>Shared Living</h2>
                              <p><span id="lowest_rent_shared">{this.lowestRent(this.props.houses, 'shared')}</span></p>
                              <div className="renderHousesWrapper">
                                {this.renderHouses()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="full-house" className="col-md-6 col-sm-6 col-xs-12 item-choice">
                          <div id="full-choice-wrapper" className="item-choice-wrapper has-border">
                            <div className="item-bg full-choice"></div>
                            <div id="full-close-collapse" className="close-collapse pull-right" onClick={this.resetHouses}><i className="glyphicon glyphicon-remove"></i></div>
                            <div id="full-house-link" data-choice-type="full" onClick={this.housesCount('full') ? this.fullHouseRender.bind(this) : null} className="item-link item-link-animate">
                              <p>Take entire apartment</p>
                              <h2>Full Houses</h2>
                              <p><span id="lowest_rent_full">{this.lowestRent(this.props.houses, 'full')}</span></p>
                              <div className="renderHousesWrapper">
                                {this.renderHouses()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix">
                <div className="container-fluid map-options-container">
                  <header>
                    <h2 className="text-center">Neighbourhood</h2>
                  </header>
                  <div style={{display: 'none'}} className="map-options-outer">
                    <div className="col-md-8">
                      <div className="map-options-wrapper">
                        <ul className="map-opitons">
                          <li><a id="bar" className="btn btn-primary" >Pubs / Bars</a></li>
                          <li><a id="movies" className="btn btn-primary" >Movies</a></li>
                          <li><a id="atm" className="btn btn-primary" >ATM</a></li>
                          <li><a id="bus_stop" className="btn btn-primary" >Bus Stations</a></li>
                          <li><a id="grocery" className="btn btn-primary" >Super Markets</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-4">
                    </div>
                  </div>
                  <div className="clearfix">
                    <div className="has-map">
                      <div className="buildingMap" id="map">
                        <BuildingMap
                          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6qmCAqZlKh3loYU3HkU9iIMQdEynEZa0"
                          loadingElement={<div style={{ height: `100%` }} />}
                          containerElement={<div style={{ height: `100%` }} />}
                          mapElement={<div style={{ height: `100%` }} />}
                          building = {this.props.building}
                          onMarkerClick={this.handleMarkerClick}
                        />
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
    else {
      return (
        <div>
          <WebHeader location={this.props.location.pathname} />
            <Preloader />
          <WebFooter />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {building: state.buildings.building, housesChoice: state.housesChoice.housesChoice, houses: state.buildings.properties, visit: state.buildings.visit};
}


export default connect( mapStateToProps, {getBuilding: getBuilding, changeHousesChoice: changeHousesChoice, getPropertiesForBuilding: getPropertiesForBuilding, scheduleVisit: scheduleVisit, getRooms: getRooms})(BuildingHome);







