import React, {Component} from 'react';
import {connect} from 'react-redux';
import WebFooter from './WebFooter';
import WebHeader from './WebHeader';

class Pyr extends React.Component {

    render() {


        let $zoho = $zoho || {};
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
                    var LDTuvidObj = document.forms['WebToLeads2676338000003892015']['LDTuvid'];
                    if (LDTuvidObj) {
                        LDTuvidObj.value = $zoho.salesiq.visitor.uniqueid();
                    }
                    var firstnameObj = document.forms['WebToLeads2676338000003892015']['First Name'];
                    if (firstnameObj) {
                        name = firstnameObj.value + ' ' + name;
                    }
                    $zoho.salesiq.visitor.name(name);
                    var emailObj = document.forms['WebToLeads2676338000003892015']['Email'];
                    if (emailObj) {
                        email = emailObj.value;
                        $zoho.salesiq.visitor.email(email);
                    }
                }
            } catch (e) {}
        }



        let mndFileds=new Array('Last Name','Phone');
        let fldLangVal=new Array('Name','Phone');
        let name='';
        let email='';

        function checkMandatory() {
            for(let i=0;i<mndFileds.length;i++) {
              let fieldObj=document.forms['WebToLeads2676338000003892015'][mndFileds[i]];
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



        return(
            <div>
                <WebHeader />
                <div style={{marginTop: '2em'}}>
                    <div id='crmWebToEntityForm' style={{width:'600px', margin:'auto'}}>
                        <h2 className="text-center">Post Your Requirement</h2><br/>
                        <form action='https://crm.zoho.com/crm/WebToLeadForm' name='WebToLeads2676338000003892015' method='POST' onSubmit='javascript:document.charset="UTF-8"; return checkMandatory()' accept-charset='UTF-8'>
                            <input type='text' style={{display:'none'}} name='xnQsjsdp' value='11fea4fe484445f5830c20450b79c1d5dadbfdf143cd7a1b4ce093dd46f7c323'/>
                            <input type='hidden' name='zc_gad' id='zc_gad' value=''/>
                            <input type='text' style={{display:'none'}} name='xmIwtLD' value='6f9e448b2d42c1123f7e1997e1c73a3f05b77b06753e203bf48f3166e0002e4c'/>
                            <input type='text' style={{display:'none'}}  name='actionType' value='TGVhZHM='/>

                            <input type='text' style={{display:'none'}} name='returnURL' value='https&#x3a;&#x2f;&#x2f;homigo.in' /> 
                            <input type='text' style={{display:'none'}} id='ldeskuid' name='ldeskuid'></input>
                            <input type='text' style={{display:'none'}} id='LDTuvid' name='LDTuvid'></input>
                            <table 
                                style={{
                                    width:'600px', 
                                    backgroundColor:'white', 
                                    color:'black'
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
                                        Name<span style={{color:'red'}}>*</span>
                                    </td>
                                    <td style={{width:'250px'}}>
                                        <input className="form-control" type='text' style={{width:'250px'}}  maxlength='80' name='Last Name' />
                                    </td>
                                </tr>

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
                                        Phone<span style={{color:'red'}}>*</span></td>
                                        <td style={{width:'250px'}} >
                                            <input className="form-control" type='text' style={{width:'250px'}}  maxlength='30' name='Phone' />
                                        </td>
                                </tr>

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
                                        Budget Range</td><td style={{width:'250px'}} ><input className="form-control" type='text' style={{width:'250px'}}  maxlength='255' name='LEADCF5' />
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
                                        Location Interested
                                    </td>
                                    <td 
                                        style={{
                                            width:'250px'
                                        }}
                                    >
                                        <select className="form-control" style={{width:'250px'}} name='LEADCF12' multiple>
                                            <option value='AECS&#x20;Layout'>AECS Layout</option>
                                            <option value='Bannerghatta&#x20;Main&#x20;Road'>Bannerghatta Main Road</option>
                                            <option value='Bellandur'>Bellandur</option>
                                            <option value='Bommanahalli'>Bommanahalli</option>
                                            <option value='BTM&#x20;Layout'>BTM Layout</option>
                                            <option value='Domlur'>Domlur</option>
                                            <option value='Electronic&#x20;City'>Electronic City</option>
                                            <option value='HSR&#x20;Layout'>HSR Layout</option>
                                            <option value='Indira&#x20;Nagar'>Indira Nagar</option>
                                            <option value='ITPL&#x20;Main&#x20;Road'>ITPL Main Road</option>
                                            <option value='Jayanagar'>Jayanagar</option>
                                            <option value='JP&#x20;Nagar'>JP Nagar</option>
                                            <option value='Kadubeesanahalli'>Kadubeesanahalli</option>
                                            <option value='Koramangala'>Koramangala</option>
                                            <option value='Marathahalli'>Marathahalli</option>
                                            <option value='Old&#x20;Airport&#x20;Road'>Old Airport Road</option>
                                            <option value='Outer&#x20;Ring&#x20;Road'>Outer Ring Road</option>
                                            <option value='Sarjapur&#x20;Main&#x20;Road'>Sarjapur Main Road</option>
                                            <option value='Whitefield'>Whitefield</option>
                                        </select>
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
                                        Type of Accomodation
                                    </td>
                                    <td style={{width:'250px'}}>
                                        <select className="form-control" style={{width:'250px'}} name='LEADCF10'>
                                            <option value='-None-'>-None-</option>
                                            <option value='Single&#x20;Bed&#x20;-&#x20;Room&#x20;Sharing'>Single Bed - Room Sharing</option>
                                            <option value='Full&#x20;Room'>Full Room</option>
                                            <option value='Studio'>Studio</option>
                                            <option value='Full&#x20;1&#x20;BHK'>Full 1 BHK</option>
                                            <option value='Full&#x20;2&#x20;BHK'>Full 2 BHK</option>
                                            <option value='Full&#x20;3&#x20;BHK'>Full 3 BHK</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td colspan='2' style={{textAlign: 'center', paddingTop:'15px'}}>
                                        <input className="btn btn-primary" style={{fontSize:'16px', color:'#131307'}}  type='submit' value='Submit' /><br/>
                                        <input className="btn" type='reset' style={{fontSize:'12px', color: '#131307'}} value='Reset' />
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div> 
                </div>
                <WebFooter />
            </div>
        )
    }


}
    
export default Pyr;