import React, {Component} from 'react';
import {connect} from 'react-redux';
import WebFooter from './WebFooter';
import WebHeader from './WebHeader';
import jQuery from 'jquery';

require ('../stylesheets/care.css');

class Care extends React.Component {

    render() {
        if(this.props.building) {
            console.log(this.props.building.name)
        }

        function trimBoth(str) {
            return jQuery.trim(str);
        }

        function setAllDependancyFieldsMapping() {
            var mapDependancyLabels = getMapDependenySelectValues(jQuery("[id='property(module)']").val(), "JSON_MAP_DEP_LABELS");
            if (mapDependancyLabels) {
                for (var i = 0; i < mapDependancyLabels.length; i++) {
                    var label = mapDependancyLabels[i];
                    var obj = document.forms['zsWebToCase_206947000000140527'][label];
                    if (obj) {
                        setDependent(obj, true);
                    }
                }
            }
        }

        function getMapDependenySelectValues(module, key) {
            var dependencyObj = jQuery.parseJSON(jQuery("[id='dependent_field_values_" + module + "']").val());
            if (dependencyObj == undefined) {
                return dependencyObj;
            }
            return dependencyObj[key];
        }

        function setDependent(event) {
            if(event.target) {
                var isload = false;
                var obj = event.target;
                var name = event.target.name;
                var module = jQuery("[id='property(module)']").val();
                var val = "";
                var myObject = getMapDependenySelectValues(module, "JSON_VALUES");
                if (myObject != undefined) {
                    val = myObject[name];
                }
                var mySelObject = getMapDependenySelectValues(module, "JSON_SELECT_VALUES");
                if (val != null && val != "" && val != "null" && mySelObject) {
                    var fields = val;
                    for (var i in fields) {
                        if (fields.hasOwnProperty(i)) {
                            var isDependent = false;
                            var label = i;
                            var values = fields[i];
                            if (label.indexOf(")") > -1) {
                                label = label.replace(/\)/g, '_____');
                            }
                            if (label.indexOf("(") > -1) {
                                label = label.replace(/\(/g, '____');
                            }
                            if (label.indexOf(".") > -1) {
                                label = label.replace(/\./g, '___');
                            }
                            var depObj = document.forms['zsWebToCase_206947000000140527'][label];
                            if (depObj && depObj.options) {
                                var mapValues = "";
                                var selected_val = depObj.value;
                                var depLen = depObj.options.length - 1;
                                for (var n = depLen; n >= 0; n--) {
                                    if (depObj.options[n].selected) {
                                        if (mapValues == "") {
                                            mapValues = depObj.options[n].value;
                                        } else {
                                            mapValues = mapValues + ";;;" + depObj.options[n].value;
                                        }
                                    }
                                }
                                depObj.value = "";
                                var selectValues = mySelObject[label];
                                for (var k in values) {
                                    var rat = k;
                                    if (rat == "-None-") {
                                        rat = "";
                                    }
                                    var parentValues = mySelObject[name];
                                    if (rat == trimBoth(obj.value)) {
                                        isDependent = true;
                                        depObj.length = 0;
                                        var depvalues = values[k];
                                        var depLen = depvalues.length - 1;
                                        for (var j = 0; j <= depLen; j++) {
                                            var optionElement = document.createElement("OPTION");
                                            var displayValue = depvalues[j];
                                            var actualValue = displayValue;
                                            if (actualValue == "-None-") {
                                                optionElement.value = "";
                                                displayValue = "-None-";
                                            } else {
                                                optionElement.value = actualValue;
                                            }
                                            optionElement.text = displayValue;
                                            if (mapValues != undefined) {
                                                var mapValue = mapValues.split(";;;");
                                                var len = mapValue.length;
                                                for (var p = 0; p < len; p++) {
                                                    if (actualValue == mapValue[p]) {
                                                        optionElement.selected = true;
                                                    }
                                                }
                                            }
                                            depObj.options.add(optionElement);
                                        }
                                    }
                                }
                                if (!isDependent) {
                                    depObj.length = 0;
                                    var len = selectValues.length;
                                    for (var j = 0; j < len; j++) {
                                        var actualValue = selectValues[j];
                                        var optionElement = document.createElement("OPTION");
                                        if (actualValue == "-None-") {
                                            optionElement.value = "";
                                        } else {
                                            optionElement.value = selectValues[j];
                                        }
                                        optionElement.text = selectValues[j];
                                        depObj.options.add(optionElement);
                                    }
                                    depObj.value = selected_val;
                                }
                                if (!isload) {
                                    setDependent(depObj, false);
                                }
                                var jdepObj = jQuery(depObj);
                                if (jdepObj.hasClass('select2-offscreen')) {
                                    jdepObj.select2("val", jdepObj.val());
                                }
                            }
                        }
                    }
                }
            }
        }
        var zctt = function() {
            var tt, mw = 400,
                top = 10,
                left = 0,
                doctt = document;
            var ieb = doctt.all ? true : false;
            var h, w;
            return {
                showtt: function(cont, wid) {
                    if (tt == null) {
                        tt = doctt.createElement('div');
                        tt.setAttribute('id', 'tooltip-zc');
                        doctt.body.appendChild(tt);
                        doctt.onmousemove = this.setpos;
                        doctt.onclick = this.hidett;
                    }
                    tt.style.display = 'block';
                    tt.innerHTML = cont;
                    tt.style.width = wid ? wid + 'px' : 'auto';
                    if (!wid && ieb) {
                        tt.style.width = tt.offsetWidth;
                    }
                    if (tt.offsetWidth > mw) {
                        tt.style.width = mw + 'px'
                    }
                    h = parseInt(tt.offsetHeight) + top;
                    w = parseInt(tt.offsetWidth) + left;
                },
                hidett: function() {
                    tt.style.display = 'none';
                },
                setpos: function(e) {
                    var u = ieb ? e.clientY + doctt.body.scrollTop : e.pageY;
                    var l = ieb ? e.clientX + doctt.body.scrollLeft : e.pageX;
                    var cw = doctt.body.clientWidth;
                    var ch = doctt.body.clientHeight;
                    if (l < 0) {
                        tt.style.left = left + 'px';
                        tt.style.right = '';
                    } else if ((l + w + left) > cw) {
                        tt.style.left = '';
                        tt.style.right = ((cw - l) + left) + 'px';
                    } else {
                        tt.style.right = '';
                        tt.style.left = (l + left) + 'px';
                    }
                    if (u < 0) {
                        tt.style.top = top + 'px';
                        tt.style.bottom = '';
                    } else if ((u + h + left) > ch) {
                        tt.style.top = '';
                        tt.style.bottom = ((ch - u) + top) + 'px';
                    } else {
                        tt.style.bottom = '';
                        tt.style.top = (u + top) + 'px';
                    }
                }
            };
        }();
        var zsWebFormMandatoryFields = new Array('Contact Name', 'Email', 'Phone', 'Category', 'Sub Category', 'Subject', 'Description');
        var zsFieldsDisplayLabelArray = new Array('Name', 'Email', 'Mobile', 'Category', 'Sub Category', 'Subject', 'Description');

        function zsValidateMandatoryFields() {
            var name = '';
            var email = '';
            var isError = 0;
            for (var index = 0; index < zsWebFormMandatoryFields.length; index++) {
                isError = 0;
                var fieldObject = document.forms['zsWebToCase_206947000000140527'][zsWebFormMandatoryFields[index]];
                if (fieldObject) {
                    if (((fieldObject.value).replace(/^\s+|\s+$/g, '')).length == 0) {
                        alert(zsFieldsDisplayLabelArray[index] + ' cannot be empty ');
                        fieldObject.focus();
                        isError = 1;
                        return false;
                    } else {
                        if (fieldObject.name == 'Email') {
                            if (!fieldObject.value.match(/[A-Za-z0-9._%\-+]+@[A-Za-z0-9.\-]+\.[a-zA-Z]{2,22}/)) {
                                isError = 1;
                                alert('Enter a valid email-Id');
                                fieldObject.focus();
                                return false;
                            }
                        }
                    }
                    if (fieldObject.nodeName == 'SELECT') {
                        if (fieldObject.options[fieldObject.selectedIndex].value == '-None-') {
                            alert(zsFieldsDisplayLabelArray[index] + ' cannot be none');
                            fieldObject.focus();
                            isError = 1;
                            return false;
                        }
                    }
                    if (fieldObject.type == 'checkbox') {
                        if (fieldObject.checked == false) {
                            alert('Please accept ' + zsFieldsDisplayLabelArray[index]);
                            fieldObject.focus();
                            isError = 1;
                            return false;
                        }
                    }
                }
            }
            if (isError == 0) {
                document.getElementById('zsSubmitButton_206947000000140527').setAttribute('disabled', 'disabled');
            }
        }
        document.onreadystatechange = function() {
            if (window.zsRegenerateCaptcha) {
                //zsRegenerateCaptcha();
            }
            setAllDependancyFieldsMapping();
            document.getElementById('zsSubmitButton_206947000000140527').removeAttribute('disabled');
        };

        function zsResetWebForm(webFormId) {
            document.forms['zsWebToCase_' + webFormId].reset();
            document.getElementById('zsSubmitButton_206947000000140527').removeAttribute('disabled');
            setAllDependancyFieldsMapping();
        }

        document.onreadystatechange = () => {
            setAllDependancyFieldsMapping();
            document.getElementById('zsSubmitButton_206947000000140527').removeAttribute('disabled');
        };

        var zsWebFormMandatoryFields = new Array('Contact Name', 'Email', 'Phone', 'Issue', 'Sub Issue', 'Issue In', 'Subject', 'Description');
        var zsFieldsDisplayLabelArray = new Array('Name', 'Email', 'Mobile', 'Issue', 'Sub Issue', 'Issue In', 'Subject', 'Description');

        let userData = JSON.parse(sessionStorage.userData);
        if(this.props.activeBooking.id) {
            return(
                <div>
                    <div id='zohoSupportWebToCase' align='center'>
                        <form name='zsWebToCase_206947000000140527' id='zsWebToCase_206947000000140527' action='https://desk.zoho.com/support/WebToCase' method='POST' onSubmit={() => zsValidateMandatoryFields()} encType='multipart/form-data'>
                            <input type='hidden' name='xnQsjsdp' value='4dYFKMs4Z8zwZmTHHfGK-w$$' />
                            <input type='hidden' name='xmIwtLD' value='AOlL0LUsfKYtgDody1Ye40*AvLr7sm-S' />
                            <input type='hidden' name='xJdfEaS' value='' />
                            <input type='hidden' name='actionType' value='Q2FzZXM=' />
                            <input type="hidden" id="property(module)" value="Cases" />
                            <input type="hidden" id="dependent_field_values_Cases" value="&#x7b;&quot;JSON_VALUES&quot;&#x3a;&#x7b;&quot;Category&quot;&#x3a;&#x7b;&quot;Sub&#x20;Category&quot;&#x3a;&#x7b;&quot;Queries&quot;&#x3a;&#x5b;&quot;Move&#x20;In&quot;,&quot;Move&#x20;Out&quot;,&quot;Financial&quot;,&quot;Other&quot;,&quot;Dashboard&quot;&#x5d;,&quot;Repairs&quot;&#x3a;&#x5b;&quot;Plumbing&quot;,&quot;Furniture&quot;,&quot;Electrical&quot;,&quot;Appliances&quot;&#x5d;,&quot;Request&quot;&#x3a;&#x5b;&quot;Cleaning&quot;,&quot;Gas&quot;,&quot;Agreement&quot;,&quot;Relocation&quot;,&quot;Pest&#x20;Control&quot;,&quot;Change&#x20;of&#x20;Furniture&quot;,&quot;Other&quot;&#x5d;,&quot;Issue&#x20;With&quot;&#x3a;&#x5b;&quot;Cleaning&quot;,&quot;House&#x20;Keys&quot;,&quot;Gas&quot;,&quot;Wifi&quot;,&quot;Electricity&quot;,&quot;DTH&quot;,&quot;Water&quot;,&quot;Building&quot;,&quot;Dashboard&quot;&#x5d;,&quot;Emergency&quot;&#x3a;&#x5b;&quot;Gas&#x20;Leakage&quot;,&quot;Key&#x20;Lost&quot;,&quot;Other&quot;&#x5d;,&quot;Report&#x20;Abuse&quot;&#x3a;&#x5b;&quot;From&#x20;Flatmate&quot;,&quot;From&#x20;Guest&quot;,&quot;From&#x20;Society&quot;,&quot;Other&quot;&#x5d;&#x7d;&#x7d;&#x7d;,&quot;JSON_SELECT_VALUES&quot;&#x3a;&#x7b;&quot;Status&quot;&#x3a;&#x5b;&quot;Assigned&quot;,&quot;Closed&quot;,&quot;Customer&#x20;Clarification&#x20;Required&quot;,&quot;Escalated&quot;,&quot;On&#x20;Hold&quot;,&quot;Open&quot;&#x5d;,&quot;CASECF10&quot;&#x3a;&#x5b;&quot;-None-&quot;,&quot;Homigo&#x20;Anton&quot;,&quot;Homigo&#x20;Arya&quot;,&quot;Homigo&#x20;Cinzel&quot;,&quot;SJR&#x20;Watermark&quot;,&quot;Sobha&#x20;Marvella&quot;,&quot;Vaswani&#x20;Reserve&quot;,&quot;Paramila&#x20;SunRidge&quot;,&quot;Homigo&#x20;Marion&quot;,&quot;Homigo&#x20;Menlo&quot;,&quot;Homigo&#x20;Oswald&quot;,&quot;Homigo&#x20;Revalia&quot;,&quot;Esteem&#x20;Enclave&quot;,&quot;Homigo&#x20;Cairo&quot;,&quot;Homigo&#x20;Lexia&quot;,&quot;Homigo&#x20;Rockwell&quot;,&quot;Homigo&#x20;Aster&quot;,&quot;Homigo&#x20;Carla&quot;,&quot;Homigo&#x20;Kreon&quot;,&quot;Homigo&#x20;Marko&quot;,&quot;Homigo&#x20;Pacific&quot;,&quot;Homigo&#x20;Velma&quot;,&quot;Homigo&#x20;Averia&quot;,&quot;Homigo&#x20;Arimo&quot;,&quot;Homigo&#x20;Calisto&quot;,&quot;Homigo&#x20;Fedra&quot;,&quot;Homigo&#x20;Madison&quot;,&quot;Homigo&#x20;Maven&quot;,&quot;Homigo&#x20;Optima&quot;,&quot;Homigo&#x20;Palatino&quot;,&quot;Homigo&#x20;Verona&quot;,&quot;Individual&#x20;Houses&quot;,&quot;Aum&#x20;Rudrani&quot;,&quot;Homigo&#x20;Avenir&quot;,&quot;Homigo&#x20;Marvel&quot;,&quot;Usha&#x20;Paradise&quot;&#x5d;,&quot;Category&quot;&#x3a;&#x5b;&quot;Emergency&quot;,&quot;Issue&#x20;With&quot;,&quot;Queries&quot;,&quot;Repairs&quot;,&quot;Report&#x20;Abuse&quot;,&quot;Request&quot;&#x5d;,&quot;Priority&quot;&#x3a;&#x5b;&quot;-None-&quot;,&quot;Emergency&quot;,&quot;High&quot;,&quot;Low&quot;,&quot;Medium&quot;&#x5d;,&quot;Mode&quot;&#x3a;&#x5b;&quot;Twitter&quot;,&quot;Phone&quot;,&quot;Facebook&quot;,&quot;Email&quot;,&quot;Web&quot;,&quot;Chat&quot;,&quot;Forums&quot;,&quot;Feedback&#x20;Widget&quot;&#x5d;,&quot;Classification&quot;&#x3a;&#x5b;&quot;None&quot;,&quot;Others&quot;,&quot;Feature&quot;,&quot;Problem&quot;,&quot;Question&quot;,&quot;-None-&quot;&#x5d;,&quot;Sub&#x20;Category&quot;&#x3a;&#x5b;&quot;Cleaning&quot;,&quot;House&#x20;Keys&quot;,&quot;Gas&quot;,&quot;Wifi&quot;,&quot;Electricity&quot;,&quot;DTH&quot;,&quot;Water&quot;,&quot;Plumbing&quot;,&quot;Furniture&quot;,&quot;Electrical&quot;,&quot;Appliances&quot;,&quot;Move&#x20;In&quot;,&quot;Move&#x20;Out&quot;,&quot;Financial&quot;,&quot;Agreement&quot;,&quot;Relocation&quot;,&quot;Pest&#x20;Control&quot;,&quot;Change&#x20;of&#x20;Furniture&quot;,&quot;Gas&#x20;Leakage&quot;,&quot;Key&#x20;Lost&quot;,&quot;From&#x20;Flatmate&quot;,&quot;From&#x20;Guest&quot;,&quot;From&#x20;Society&quot;,&quot;Other&quot;,&quot;Building&quot;,&quot;Dashboard&quot;&#x5d;&#x7d;,&quot;JSON_MAP_DEP_LABELS&quot;&#x3a;&#x5b;&quot;Category&quot;&#x5d;&#x7d;" />
                            <input type='hidden' name='returnURL' value='*' />
                            <table border='0' cellSpacing='0' cellPadding='5' className='zsFormClass'>
                                <tbody>
                                    <tr>
                                        <td  className='zsFontClass ' width='25%' align='left'>Name&nbsp;&nbsp;</td>
                                        <td align='left' width='75%'>
                                            <input type='text' maxLength='120' name='Contact Name' value={userData.name} readOnly className='form-control' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td  className='zsFontClass ' width='25%' align='left'>Email&nbsp;&nbsp;</td>
                                        <td align='left' width='75%'>
                                            <input type='text' maxLength='120' name='Email' value={userData.email} readOnly className='form-control' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td  className='zsFontClass ' width='25%' align='left'>Mobile&nbsp;&nbsp;</td>
                                        <td align='left' width='75%'>
                                            <input type='text' maxLength='120' name='Phone' value={userData.number} readOnly className='form-control' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="zsFontClass" width="25%" align="left">Hive Name&nbsp;&nbsp;</td>
                                        <td align="left" width="75%">
                                            <input type="text" maxLength="120" name="Hive Name" value={this.props.building.name} radOnly className="form-control" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td  className='zsFontClass ' width='25%' align='left'>House Id&nbsp;&nbsp;</td>
                                        <td align='left' width='75%'>
                                            <input type='text' maxLength='120' value={this.props.activeBooking.property.id} readOnly name='House Id' className="form-control"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td  className='zsFontClass ' width='25%' align='left'>Category &nbsp;&nbsp;</td>
                                        <td align='left' width='75%'>
                                            <select name='Category' className='form-control' onChange={setDependent} id='Category'>
                                                <option value='Emergency'>Emergency</option>
                                                <option value='Issue With'>Issue With</option>
                                                <option value='Queries'>Queries</option>
                                                <option value='Repairs'>Repairs</option>
                                                <option value='Report Abuse'>Report Abuse</option>
                                                <option value='Request'>Request</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td  className='zsFontClass ' width='25%' align='left'>Sub Category &nbsp;&nbsp;</td>
                                        <td align='left' width='75%'>
                                            <select name='Sub Category' className='form-control' onChange={setDependent} id='Sub Category'>
                                                <option value='Cleaning'>Cleaning</option>
                                                <option value='House Keys'>House Keys</option>
                                                <option value='Gas'>Gas</option>
                                                <option value='Wifi'>Wifi</option>
                                                <option value='Electricity'>Electricity</option>
                                                <option value='DTH'>DTH</option>
                                                <option value='Water'>Water</option>
                                                <option value='Plumbing'>Plumbing</option>
                                                <option value='Furniture'>Furniture</option>
                                                <option value='Electrical'>Electrical</option>
                                                <option value='Appliances'>Appliances</option>
                                                <option value='Move In'>Move In</option>
                                                <option value='Move Out'>Move Out</option>
                                                <option value='Financial'>Financial</option>
                                                <option value='Agreement'>Agreement</option>
                                                <option value='Relocation'>Relocation</option>
                                                <option value='Pest Control'>Pest Control</option>
                                                <option value='Change of Furniture'>Change of Furniture</option>
                                                <option value='Gas Leakage'>Gas Leakage</option>
                                                <option value='Key Lost'>Key Lost</option>
                                                <option value='From Flatmate'>From Flatmate</option>
                                                <option value='From Guest'>From Guest</option>
                                                <option value='From Society'>From Society</option>
                                                <option value='Other'>Other</option>
                                                <option value='Building'>Building</option>
                                                <option value='Dashboard'>Dashboard</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td  className='zsFontClass ' width='25%' align='left'>Subject&nbsp;&nbsp;</td>
                                        <td align='left' width='75%'>
                                            <input type='text' maxLength='255' name='Subject' className='form-control' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td  className='zsFontClass ' width='25%' align='left'>Description &nbsp;&nbsp;</td>
                                        <td align='left' width='75%'>
                                            <textarea name='Description' maxLength='3000' width='250' height='250' className='form-control'></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan='2' align='center' width='25%'>
                                            <input type='submit' id="zsSubmitButton_206947000000140527" className='zsFontClass btn btn-primary' value='Submit' /> &nbsp; &nbsp;
                                            <input type='button' className='zsFontClass btn btn-primay' value='Reset' onClick={() => zsResetWebForm('206947000000140527')} /> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="wrapper clearfix">
                  <section className="clearfix bookings-section">
                        <div className="text-center">
                            <h4>No active bookings found!</h4>
                            <a className="btn btn-primary" href="/houses">Explore houses</a>
                        </div>
                  </section>
                </div>
            )
        }
    }


}
    
export default Care;