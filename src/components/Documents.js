import React, {Component} from 'react';
import { Modal } from 'react-bootstrap';
import {connect} from 'react-redux';
import {updateUserKycDetails} from '../actions/index.js';
import KYCForm from './KYCForm';
import moment from 'moment';
import Dropzone from 'react-dropzone';
require('../stylesheets/client_db.css');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Documents extends Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false,
			openEditDetailsModal: false,
			document: {
				file: '',
				description: ''
			},
			kycView: false
		};

		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.onChange = this.onChange.bind(this);
		this.submitDocument = this.submitDocument.bind(this);
	}

	componentDidUpdate = (prevProps, prevState) => {
		if(this.state.modalIsOpen !== prevState.modalIsOpen) {
			this.render();
		}
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
		let document = this.state.document;
		document[field] = event.target.value;
		return this.setState({document: document});
	}

	submitDocument(event) {
		event.preventDefault();
		this.props.uploadDocument(this.state);
		this.setState({modalIsOpen: false});
	}

	onDrop = (acceptedFiles, rejectedFiles) => {
		if(acceptedFiles.length > 0) {
			let document = this.state.document;
			let file = this.getBase64(acceptedFiles[0]);
			document['file'] = file;
		}
	}

	getBase64 = (file) => {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload =  () => {
   	let document = this.state.document;
		document['file'] = reader.result;
		return this.setState({document: document});
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
	}

	renderDocuments() {
		return this.props.documents.map((document, index) => {
			return (
				<div key={index} className="row clearfix document graybg-light">
          <div className="col-md-3 col-sm-3 col-xs-3">
            <div className="remove-icon">
              <i className="glyphicon glyphicon-minus-sign redbg"></i>
            </div>
            <div className="info-label"><small>Document Type</small></div>
            <div className="info-detail">
              <h5>{document.description}</h5>
            </div>
          </div>

          <div className="col-md-3 col-sm-3 col-xs-3">
            <div className="info-label"><small>Created at</small></div>
            <div className="info-detail">
              <h5>{moment(document.file_updated_at).format('DD-MM-YYYY')}</h5>
            </div>
          </div>

          <div className="col-md-3 col-sm-3 col-xs-3">
            <div className="info-label"><small>Status</small></div>
            <div className="info-detail">
              <h5>{document.verified?'Verified':'Verification Pending'}</h5>
            </div>
          </div>

          <div className="col-md-3 col-sm-3 col-xs-3">
            <div className="info-action">
              <a href={document.url}>Download</a>
            </div>
          </div>
        </div>
		  )
		})
	}

	render() {
		if(JSON.parse(localStorage.userData).emergency_contact_name && (!this.state.kycView || this.props.user_doc_details)) {
			if(this.props.documents.length > 0) {
				return (
					<div>
						<div className="documents-wrapper wrapper clearfix" style={{borderBottom: 'none'}}>
						  <section className="clearfix item item-documents-wrapper" style={{boxShadow: 'none'}}>
						    <div className="documents-action">
						      <div className="pull-left">
						        <button onClick={() => {this.setState({'kycView': true})}} className="btn btn-primary btn-light">Edit Details</button>
						      </div>
						      <div className="pull-right">
						        <button onClick={this.openModal} className="btn btn-primary btn-light">New</button>
						      </div>
						    </div><br/>
						    <div className="clearfix">
						    	<div className="documents-body">
						    		{this.renderDocuments()}
						    	</div>
						    </div>
						    
						  </section>
						</div>
						<div className="clearfix">
						  <div className="documents-body">

						  	<Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
	                <Modal.Header closeButton>
	                	<h4 className="modal-title"><span>Upload New Document</span></h4>
	                </Modal.Header>
	                <Modal.Body>
	                  <div>
	                    <form>
					              <div className="form">
					                <div className="form-group">
					                	<label>Select file to upload</label>
					                  <Dropzone onDrop={(files) => this.onDrop(files)}>
									            <div>Try dropping some files here, or click to select files to upload.</div>
									          </Dropzone>
					                </div>
					                <div className="form-group">
					                  <label>Select type of Document</label>
					                  <select className="form-control selectpicker" name="description" onChange={this.onChange}>
					                  	<option value="">Select an option</option>
					                  	<option value="Aadhar Card">Aadhar Card</option>
					                  	<option value="PAN Card">PAN Card</option>
					                  	<option value="Driving License">Driving License</option>
					                  	<option value="Voter's ID">Voter's ID</option>
					                  </select>
					                </div>
					                <div className="form-group text-center">
					                  <button className="btn btn-primary btn-xxl form-control" onClick={this.submitDocument}>Upload</button>
					                </div>
					                <p className="text-center"><small><a onClick={this.closeModal}>Cancel</a></small></p>
					              </div>
					            </form>
	                  </div>
	                </Modal.Body>
	                <Modal.Footer>
	                  <button style={{float: 'left'}} className="btn btn-primary" onClick={this.closeModal}>Close</button>
	                </Modal.Footer>
	              </Modal>
						  </div>
						</div>
					</div>
				)
			}
			else
				return (
				<div className="wrapper clearfix">
					<Modal show={this.state.modalIsOpen} onHide={this.closeModal}>
            <Modal.Header closeButton>
            	<h4 className="modal-title"><span>Upload New Document</span></h4>
            </Modal.Header>
            <Modal.Body>
              <div>
                <form>
		              <div className="form">
		                <div className="form-group">
		                	<label>Select file to upload</label>
		                  <Dropzone onDrop={(files) => this.onDrop(files)}>
						            <div>Try dropping some files here, or click to select files to upload.</div>
						          </Dropzone>
		                </div>
		                <div className="form-group">
		                  <label>Select type of Document</label>
		                  <select className="form-control selectpicker" name="description" onChange={this.onChange}>
		                  	<option value="Aadhar Card">Aadhar Card</option>
		                  	<option value="PAN Card">PAN Card</option>
		                  	<option value="Driving License">Driving License</option>
		                  	<option value="Voter's ID">Voter's ID</option>
		                  </select>
		                </div>
		                <div className="form-group text-center">
		                  <button className="btn btn-primary btn-xxl form-control" onClick={this.submitDocument}>Upload</button>
		                </div>
		                <p className="text-center"><small><a onClick={this.closeModal}>Cancel</a></small></p>
		              </div>
		            </form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button style={{float: 'left'}} className="btn btn-primary" onClick={this.closeModal}>Close</button>
            </Modal.Footer>
          </Modal>
				  <section className="clearfix bookings-section">
						<div className="text-center">
							<h4>Looks pretty empty in here!</h4>
							<button onClick={this.openModal} className="btn btn-primary btn-light">New</button>
						</div>
				  </section>
				</div>
			)
		}

		return <KYCForm />
	}
}

function mapStateToProps(state) {
	return {
		user_doc_details: state.documents.user_doc_details
	}
}

export default connect(mapStateToProps, {})(Documents);




