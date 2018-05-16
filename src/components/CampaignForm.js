import React, {Component} from 'react';
import WebFooter from './WebFooter';
import WebHeader from './WebHeader';
import Preloader from './Preloader';

class CampaignForm extends React.Component {

    render() {

        let mndFileds=new Array('Last Name','Phone','LEADCF13','LEADCF14');
        let fldLangVal=new Array('Name','Phone','Name','Email');
        let name='';
        let email='';

        function checkMandatory() {
            for(let i=0;i<mndFileds.length;i++) {
                let fieldObj=document.forms['WebToLeads2676338000004001097'][mndFileds[i]];
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
                    }  
                    else if(fieldObj.nodeName=='SELECT') {
                        if(fieldObj.options[fieldObj.selectedIndex].value=='-None-') {
                            alert(fldLangVal[i] +' cannot be none.'); 
                            fieldObj.focus();
                            return false;
                        }
                    } 
                    else if(fieldObj.type =='checkbox'){
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
                    } 
                    catch (e) {}
                }
            }
        }


        const current_user = JSON.parse(localStorage.userData);
        if (current_user) {
            return(
                <div>
                    <WebHeader />
                    <div id='crmWebToEntityForm' style={{width:'600px', margin:'auto'}}>
                        <h2 className="text-center">Referral Offer Form</h2><br/>
                        <form action='https://crm.zoho.com/crm/WebToLeadForm' name='WebToLeads2676338000004001097' method='POST' onSubmit='javascript:document.charset="UTF-8"; return checkMandatory()' accept-charset='UTF-8'>

                            <input type='text' style={{display:'none'}} name='xnQsjsdp' value='11fea4fe484445f5830c20450b79c1d5dadbfdf143cd7a1b4ce093dd46f7c323'/>
                            <input type='hidden' name='zc_gad' id='zc_gad' value=''/>
                            <input type='text' style={{display:'none'}} name='xmIwtLD' value='6f9e448b2d42c1123f7e1997e1c73a3f8221bb87d060237a2a0321701394adbd'/>
                            <input type='text' style={{display:'none'}}  name='actionType' value='TGVhZHM='/>

                            <input type='text' style={{display:'none'}} name='returnURL' value='https&#x3a;&#x2f;&#x2f;homigo.in' /> 
                            <table 
                                style={{
                                    width:'600px',
                                    backgroundColor: 'white',
                                    color: 'black'
                                }}
                            >

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
                                        Referer's Name<span style={{color:'red'}}>*</span>
                                    </td>
                                    <td 
                                        style={{
                                            width:'250px'
                                        }} 
                                    >
                                        <input className="form-control" type='text' style={{width:'250px'}}  maxlength='255' name='LEADCF13' value={current_user ? current_user.name : null} /></td>
                                </tr>

                                <tr>
                                    <td 
                                        style={{
                                            nowrap:'nowrap', 
                                            textAlign:'left', 
                                            fontSize:'12px', 
                                            fontFamily:'Arial', 
                                            width:'200px'
                                        }}>Referer's Email<span style={{color:'red'}}>*</span>
                                    </td>
                                    <td style={{width:'250px'}}><input className="form-control" type='text' style={{width:'250px'}}  maxlength='100' name='LEADCF14' value={current_user ? current_user.email : null} /></td>
                                </tr>

                                <tr>
                                    <td style={{nowrap:'nowrap', textAlign:'left', fontSize:'12px', fontFamily:'Arial', width:'200px'}}>Name<span style={{color:'red'}}>*</span></td>
                                    <td style={{width:'250px'}} ><input className="form-control" type='text' style={{width:'250px'}}  maxlength='80' name='Last Name' /></td>
                                </tr>

                                <tr>
                                    <td  style={{nowrap:'nowrap', textAlign:'left', fontSize:'12px', fontFamily:'Arial', width:'200px'}}>Phone<span style={{color:'red'}}>*</span></td>
                                    <td style={{width:'250px'}} ><input className="form-control" type='text' style={{width:'250px'}}  maxlength='30' name='Phone' /></td>
                                </tr>

                                <tr>
                                    <td  style={{nowrap:'nowrap', textAlign:'left', fontSize:'12px', fontFamily:'Arial', width:'200px'}}>Email</td>
                                    <td style={{width:'250px'}} ><input className="form-control" type='text' style={{width:'250px'}}  maxlength='100' name='Email' /></td>
                                </tr>

                                <tr>
                                    <td colspan='2' style={{textAlign:'center', paddingTop:'15px'}}>
                                        <input className="btn btn-primary" style={{fontSize:'16px', color: '#131307'}}  type='submit' value='Submit' /><br/>
                                        <input className="btn" type='reset' style={{fontSize:'12px', color: '#131307'}} value='Reset' />
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <WebFooter />
                </div>
            )
        }
        else {
            <div>
                <WebHeader />
                <Preloader />
                <WebFooter />
            </div>
        }
    }


}
    
export default CampaignForm;

