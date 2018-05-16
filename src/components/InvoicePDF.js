import React, {Component} from 'react';
import {connect} from 'react-redux';
import InvoicePDF from './InvoicePDF';
import swal from 'sweetalert2';
import { generateComponentAsPDF } from '../helpers/generate-pdf.js';
require('../stylesheets/invoice.css');

class Invoice extends Component {

  render() {
    let current_user = JSON.parse(localStorage.userData);
    let razorpayPaymentInfo = JSON.parse(localStorage.razorpayPaymentInfo);
    return (
      <div>
        <div id="render">
          <div id="section-to-print" className="container invoice">

            <div className="block-header text-center">
              <h2><span id="logo">Homigo</span> Realty Private Limited</h2>
            </div>

            <div className="card">
              <div className="card-header ch-alt text-center">
                
              </div>

              <div className="card-body card-padding">
                <div className="row">
                  <div className="col-md-4">
                    <p className="c-gray">Receipt from</p><hr />

                    <h4>Homigo Realty Pvt. Ltd.</h4>

                      <span className="text-muted">
                          <address>
                            #2-10/1, 4th Floor,<br />
                            N S Palya, 6th Cross Road<br />
                            BTM Layout, Bangalore-560076
                          </address>
                      </span>
                  </div>

                  <div className="col-md-4">
                    <p className="c-gray">Relevant details</p><hr />
                    <span className="text-muted">
                        
                        <p><b>PAN</b> AADCH6390N</p>
                        <p><b>CIN</b> U70100KA2015PTC081053</p>

                        8822-HOMIGO<br />
                        support@homigo.in
                    </span>
                  </div>

                  <div className="col-md-4">
                    <p className="c-gray">Receipt to</p><hr />
                    <h4>{current_user.name}</h4>
                      <span className="text-muted">
                          <address>
                            {current_user.address}
                          </address>
                        {current_user.number}<br/>
                        {current_user.email}
                      </span>
                  </div>
                </div>
                <hr />
                <div className="clearfix"></div>
                <div className="row m-t-25 p-0 m-b-25">
                  <div className="col-md-4 col-sm-4 col-xs-4">
                    <div className="bgm brd-2 p-15">
                      <div className="c-gray m-b-5">Invoice#</div>
                      <h3>{razorpayPaymentInfo.id}</h3>
                    </div>
                  </div>

                  <div className="col-md-4 col-sm-4 col-xs-4">
                    <div className="bgm brd-2 p-15">
                      <div className="c-gray m-b-5">Date</div>
                      <h3>Date</h3>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4 col-xs-4">
                    <div className="bgm brd-2 p-15">
                      <div className="c-gray m-b-5">Total</div>
                      <h3> ₹ {razorpayPaymentInfo.amount} </h3>
                    </div>
                  </div>
                </div><br />
                <div className="clearfix"></div>
                <h4 className="c-gray">Description</h4><hr />
                <table className="table">
                  <tbody>
                  <tr>
                    <td width="75%">
                      <div className="text-muted">
                        <dl className="dl-horizontal"><dt>Transaction ID</dt><dd>{razorpayPaymentInfo.gateway_transaction_id}</dd></dl>
                      </div>              
                    </td>
                    <td className="highlight"></td>
                  </tr>
                  </tbody>
                </table>
                <br />
              </div>
              <footer className="m-t-15 p-20">
                <ul className="list-inline text-center list-unstyled">
                  <li className="m-l-5 m-r-5"><small>support@homigo.in</small></li>
                  <li className="m-l-5 m-r-5"><small>8822-HOMIGO</small></li>
                  <li className="m-l-5 m-r-5"><small>www.homigo.in</small></li>
                </ul>
              </footer>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Invoice;


