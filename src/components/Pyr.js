import React, {Component} from 'react';
import {connect} from 'react-redux';
import WebFooter from './WebFooter';
import WebHeader from './WebHeader';
import('../stylesheets/zoho_form_contact.css');
class Pyr extends React.Component {

    render() {
        var isSalesIQIntegrationEnabled = false;
        function zf_validateandsubmitdata(){
        if(isSalesIQIntegrationEnabled){
        var visitorinfo = {};
        var elements = document.getElementById("form").elements;
        for (var idx = 0; idx<elements.length;idx++) {
        var inpElem = elements[idx];
        var name = inpElem.getAttribute("name");
        var fieldType = inpElem.getAttribute("fieldType");
        if(fieldType==="1" || fieldType==="7" || fieldType==="9" || fieldType==="11"){
        var invlovedinsalesiq = inpElem.getAttribute("invlovedinsalesiq");
        if(fieldType==="1"){
        var nameFieldInvolved = inpElem.getAttribute("nameFieldInvolved");
        var phoneFieldInvolved = inpElem.getAttribute("phoneFieldInvolved");
        if(invlovedinsalesiq==="true"){
        if(phoneFieldInvolved){
        var salesIQValue=inpElem.value;
        visitorinfo.contactnumber = salesIQValue;
        }if(nameFieldInvolved){
        var salesIQValue=inpElem.value;
        visitorinfo.name = salesIQValue;
        }
        }
        }if(fieldType==="7"){
        if(invlovedinsalesiq==="true"){
        var salesIQValue=inpElem.value;
        visitorinfo.name = salesIQValue;
        }
        }if(fieldType==="9"){
        if(invlovedinsalesiq==="true"){
        var salesIQValue=inpElem.value;
        visitorinfo.email = salesIQValue;
        }
        }if(fieldType==="11"){
        if(invlovedinsalesiq==="true"){
        var compName = inpElem.getAttribute("compname");
        var phoneFormat = inpElem.getAttribute("phoneFormat");
        var salesIQValue="";
        if(phoneFormat==="1"){
        salesIQValue = document.getElementById("international_"+compName+"_countrycode").value; 
        }else{
        var countryCode = document.getElementById(compName+"_countrycode").value;
        var first = document.getElementById(compName+"_first").value;
        var last = document.getElementById(compName+"_second").value;
        salesIQValue =countryCode+first+last;
        }
        visitorinfo.contactnumber = salesIQValue;
        }
        }
        }
        }
        // parent.postMessage(JSON.stringify({ type: 'zoho.salesiq.apimessage', visitor: visitorinfo } ), '*');
        }
        }

        var zf_DateRegex = new RegExp("^(([0][1-9])|([1-2][0-9])|([3][0-1]))[-](Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[-](?:(?:19|20)[0-9]{2})$");
var zf_MandArray = [ "SingleLine"]; 
var zf_FieldArray = [ "SingleLine", "PhoneNumber_countrycode", "Checkbox"]; 
var isSalesIQIntegrationEnabled = false;



        return(
            <div>
                <WebHeader />
                <div style={{marginTop: '2em'}}>
                    <div id='crmWebToEntityForm' style={{width:'600px', margin:'auto'}}>
                        <h2 className="text-center">Post Your Requirement</h2><br/>
                        <form action='https://forms.zohopublic.com/homigorealty/form/WebsiteVisit/formperma/Q7TgowQMGssIeWXidlan1qHZ6TdV6jcs_28stLCf2TA/htmlRecords/submit' name='form' method='POST' onSubmit='javascript:document.charset="UTF-8"; return zf_ValidateAndSubmit();' accept-charset='UTF-8' enctype='multipart/form-data' id='form'><input type="hidden" name="zf_referrer_name" value="" />
                            <input type="hidden" name="zf_redirect_url" value="" />
                            <input type="hidden" name="zc_gad" value="" />
                            <div className="zf-templateWrapper">
                            <ul className="zf-tempHeadBdr"><li className="zf-tempHeadContBdr"><h2 className="zf-frmTitle"><em>Your Contact Details</em></h2>
                            <p className="zf-frmDesc"></p>
                            <div className="zf-clearBoth"></div></li></ul>
                            <div className="zf-subContWrap zf-topAlign"><ul>
                            <li className="zf-tempFrmWrapper zf-small"><label className="zf-labelName">Name 
                            <em className="zf-important">*</em>
                            </label>
                            <div className="zf-tempContDiv"><span> 
                            <input type="text" name="SingleLine" checktype="c1" maxlength="255" invlovedinsalesiq={false} /> </span><p id="SingleLine_error" className="zf-errorMessage" style={{display:"none"}}>Invalid value</p>
                            </div><div className="zf-clearBoth"></div></li>
                            <li  className="zf-tempFrmWrapper zf-small"><label className="zf-labelName">Phone
                            </label>
                            <div className="zf-tempContDiv"><div>
                            <input invlovedinsalesiq={false} type="text" name="PhoneNumber_countrycode" compname="PhoneNumber" checktype="c7" phoneFormat="1" maxlength="20" id="international_PhoneNumber_countrycode" fieldType="11"/>
                            <div className="zf-clearBoth"></div></div><p id="PhoneNumber_error" className="zf-errorMessage" style={{display:"none"}}>Invalid value</p>
                            </div><div className="zf-clearBoth"></div></li>   
                            <li className="zf-checkbox zf-tempFrmWrapper zf-sideBySide"><label className="zf-labelName">Interested Areas
                            </label>
                            <div className="zf-tempContDiv"><div className="zf-overflow">
                            <span className="zf-multiAttType"> 
                            <input className="zf-checkBoxType" type="checkbox" id="Checkbox_1" name="Checkbox" checktype="c1" value="BTM Layout"/>
                            <label for="Checkbox_1" className="zf-checkChoice">BTM Layout</label> </span>
                            <span className="zf-multiAttType"> 
                            <input className="zf-checkBoxType" type="checkbox" id="Checkbox_2" name="Checkbox" checktype="c1" value="Bellendur"/>
                            <label for="Checkbox_2" className="zf-checkChoice">Bellendur</label> </span>
                            <span className="zf-multiAttType"> 
                            <input className="zf-checkBoxType" type="checkbox" id="Checkbox_3" name="Checkbox" checktype="c1" value="HSR Layout"/>
                            <label for="Checkbox_3" className="zf-checkChoice">HSR Layout</label> </span>
                            <span className="zf-multiAttType"> 
                            <input className="zf-checkBoxType" type="checkbox" id="Checkbox_4" name="Checkbox" checktype="c1" value="Indira Nagar"/>
                            <label for="Checkbox_4" className="zf-checkChoice">Indira Nagar</label> </span>
                            <span className="zf-multiAttType"> 
                            <input className="zf-checkBoxType" type="checkbox" id="Checkbox_5" name="Checkbox" checktype="c1" value="Koramangala"/>
                            <label for="Checkbox_5" className="zf-checkChoice">Koramangala</label> </span>
                            <span className="zf-multiAttType"> 
                            <input className="zf-checkBoxType" type="checkbox" id="Checkbox_6" name="Checkbox" checktype="c1" value="MG Road"/>
                            <label for="Checkbox_6" className="zf-checkChoice">MG Road</label> </span>
                            <span className="zf-multiAttType"> 
                            <input className="zf-checkBoxType" type="checkbox" id="Checkbox_7" name="Checkbox" checktype="c1" value="Marthahalli"/>
                            <label for="Checkbox_7" className="zf-checkChoice">Marthahalli</label> </span>
                            <span className="zf-multiAttType"> 
                            <input className="zf-checkBoxType" type="checkbox" id="Checkbox_8" name="Checkbox" checktype="c1" value="Sarjapur Road"/>
                            <label for="Checkbox_8" className="zf-checkChoice">Sarjapur Road</label> </span>
                            <span className="zf-multiAttType"> 
                            <input className="zf-checkBoxType" type="checkbox" id="Checkbox_9" name="Checkbox" checktype="c1" value="Other"/>
                            <label for="Checkbox_9" className="zf-checkChoice">Other</label> </span>
                            <div className="zf-clearBoth"></div></div><p id="Checkbox_error" className="zf-errorMessage" style={{display:"none"}}>Invalid value</p>
                            </div><div className="zf-clearBoth"></div></li> 
                            <li className="zf-tempFrmWrapper zf-note"><label className="zf-descFld"><div><span className="highlight" style={{backgroundColor: "rgb(255, 255, 255)"}}><span className="colour" style={{color: "rgb(61, 61, 61)"}}><span className="font" style={{fontFamily: "Lato, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif"}}><span className="size" style={{fontSize: "16px"}}>By submitting this form, you have authorised Homigo Realty Pvt. Ltd. to contact you in the future through calls / sms / emails.</span></span></span></span><br /></div></label>
                            <div className="zf-clearBoth"></div></li>
                            </ul></div>
                            <ul><li className="zf-fmFooter"><button className="zf-submitColor" >Submit</button></li></ul></div>
                        </form>
                    </div> 
                </div>
                <WebFooter />
            </div>
        )
    }


}
    
export default Pyr;