/*
 * ============================================================================
 *   ID ENGINEERING R&D TEAM, LG ELECTRONICS INC., PYEONGTAEK, KOREA
 *   Copyright(c) 2016 by LG Electronics Inc.
 *
 *   Created Date    : 2016-11-18
 *   Modified Date   : 2017-04-20
 *   Release Version : 1.0170420
 *
 *   See ./doc.index.html for more detail
 * ============================================================================
 */

(function(){cordova.define("cordova/plugin/custom",function(require,exports,module){function DEBUG_LOG(msg){}
var webOS;if(window.PalmSystem){DEBUG_LOG("Window.PalmSystem Available");webOS=require("cordova/plugin/webos/service")}else{webOS={Request:function(lunaURL,parameters){DEBUG_LOG(lunaURL+" invoked. But I am a dummy because PalmSystem is not available");if(typeof parameters.onFailure==="function"){parameters.onFailure({returnValue:!1,errorCode:'NOT_WEBOS',errorText:"PalmSystem Not Available. Cordova is not installed?"})}}}}
var Custom=function(){};var MINIMUM_PLATFORM_SUPPORTED_API={"1.0":['getPowerOnOffHistory','changePassword','getwebOSVersion','disableApplication','setPowerOnStatus','getPowerOnStatus',],"2.0":['getKAM','setKAM','getApplicationInfo','switchApplication','setMaster','setSlave'],"3.0":['getWoWLAN','setWoWLAN','getNativePortraitMode','setNativePortraitMode','getDoorState','resetDoorState','checkScreenState','getDowntimeIncident','getSDMInfo','startMonitoringSDMInfo','stopMonitoringSDMInfo','setBluPwm','getBluPwm','getIlluminanceValue','startMonitoringIlluminanceValue','stopMonitoringIlluminanceValue','getLEDDriverBLUStatus','startMonitoringLEDDriverBLUStatus','stopMonitoringLEDDriverBLUStatus'],"3.2":[]}
var PLATFORM_INFO={webOSVersion:-2};var DEBUG_ENABLED='/var/luna/preferences/devmode_enabled';var CATEGORY={COMMERCIAL:'commercial',HOTELMODE:'hotelMode',NETWORK:'network',OPTION:'option'}
var KEYS={KEEP_ALIVE_MODE:'enableKAM',PASSWORD:'password',NATIVE_PORTRAIT:'siAppOrientation',SCREEN_ROTATION:'screenRotation',WOWLAN:'wolwowlOnOff',POWER_ON_STATUS:'powerOnStatus',POWER_ON_OFF_HISTORY:'powerOnOffHistory'}
var SUBSCRIPTION={getDoorState:'',getCheckScreenColor:'',getDowntimeIncident:'',getSDMInfo:'',getEyeQLux:'',getPanelErrorOut:''}
Custom.ERROR_CODE={COMMON:{OLD_WEBOS_VERSION:'OLD_WEBOS_VERSION',UNSUPPORTED_API:'UNSUPPORTED_API',BAD_PARAMETERS:'BAD_PARAMETERS',INTERNAL_ERROR:'INTERNAL_ERROR',NOT_MONITORING:'NOT_MONITORING',MEDIA_ERROR:'MEDIA_ERROR'},CONFIGURATION:{INVALID_PASSWORD_FORMAT:'BAD_PARAMETERS',ACCESS_DENIED:'ACCESS_DENIED'},APPLICATION:{SETTINGS_ERROR:'SETTINGS_ERROR',NOT_INSTALLED:'NOT_INSTALLED'},SPECIFICMODEL:{ENCLOSURE:{}}}
Custom.POWERONSTATUS={POWERON:'power_on',STANDBY:'stand_by',LASTSTATUS:'lst',}
Custom.APPLICATION={ZIP_TYPE:'commercial.signage.signageapplauncher',IPK_TYPE:'com.lg.app.signage',EXTERNAL_HDMI:'com.webos.app.hdmi1',EXTERNAL_HDMI1:'com.webos.app.hdmi1',EXTERNAL_HDMI2:'com.webos.app.hdmi2',EXTERNAL_HDMI3:'com.webos.app.hdmi3',EXTERNAL_HDMI4:'com.webos.app.hdmi4',EXTERNAL_RGB:'com.webos.app.externalinput.rgb',EXTERNAL_DVI:'com.webos.app.hdmi2',EXTERNAL_DP:'com.webos.app.hdmi3',EXTERNAL_OPS:'com.webos.app.hdmi4',};Custom.NATIVEPORTRAIT={OFF:'off',DEGREE_90:'90',DEGREE_180:'180',DEGREE_270:'270'}
Custom.SPECIFICMODEL={ENCLOSURE:{DOOR_STATUS:{OPEN:'open',CLOSED:'closed'},MUTE_OPTIONS:{NEVER:'never',WHEN_OPEN:'whenOpen',UNTIL_RESET:'untilReset'},FAN_OPTIONS:{AUTO:'autoControl',FORCED:'forcedStop'},PWD:{MINIMUM:'min',MAXIMUM:'max',VALUE:{MIN_LOW:5,MIN_MIDDLE:10,MIN_HIGH:15,MAX_LOW:80,MAX_MIDDLE:90,MAX_HIGH:100,}}}}
var PRIVATE={Common:{isPropertyExists:function(value){if((typeof value!=='undefined')&&(value!==undefined)&&(value!==null))
return!0;else return!1}},PlatformChecker:{checkPlatformSupportedThisAPI:function checkPlatformSupportedThisAPI(APIName){for(var webOSVersion in MINIMUM_PLATFORM_SUPPORTED_API){for(var idx in MINIMUM_PLATFORM_SUPPORTED_API[webOSVersion]){var functionName=MINIMUM_PLATFORM_SUPPORTED_API[webOSVersion][idx];if(functionName===APIName){if(parseFloat(webOSVersion)<=PLATFORM_INFO.webOSVersion)
return!0;else{return parseFloat(webOSVersion)}}}}
return!1}},SubscriptionChecker:{checkCurrentStatusSubscribed:function checkCurrentStatusSubscribed(subscriptionObject){if((typeof subscriptionObject==='object')&&(typeof subscriptionObject.uri==='string')&&(typeof subscriptionObject.params==='object')){return!0}
else{return!1}}},ParameterChecker:{checkParametersValidation:function checkParametersValidation(targetDataArray,parametersObject,propertyNameForSearch){if((typeof targetDataArray!=='object')||(typeof parametersObject!=='object')||(typeof propertyNameForSearch!=='string')){return null}
for(var i in targetDataArray){if(parametersObject[propertyNameForSearch]===targetDataArray[i])
return!0}
return!1},checkMissingParameters:function checkMissingParameters(parametersObject,propertyNameArray){if(typeof parametersObject!=='object'||parametersObject===null||parametersObject===undefined){return!1}
for(var i=0;i<propertyNameArray.length;i++){if((parametersObject.hasOwnProperty(propertyNameArray[i])===!1)||(parametersObject[propertyNameArray[i]]===undefined)||(parametersObject[propertyNameArray[i]]===null)){return!1}}
return!0}},CallbackHandler:{callSuccessCallback:function callSuccessCallback(successCallback,successObject){if(typeof successCallback==='function'){if(typeof successObject==='object'){if(successObject.returnValue){delete successObject.returnValue}
successCallback(successObject)}
else{successCallback()}}},callFailureCallback:function callFailureCallback(failureCallback,failureObject,_errorCode,_errorText){if(typeof failureCallback==='function'){if(failureObject.returnValue){delete failureObject.returnValue}
if(failureObject.errorCode===-1){if(failureObject.errorText.indexOf('Unknown method')>-1){failureObject.errorCode=Custom.ERROR_CODE.COMMON.UNSUPPORTED_API}
else if(failureObject.errorText.indexOf('Service does not exist')>-1){failureObject.errorCode=Custom.ERROR_CODE.COMMON.UNSUPPORTED_API}}
else{if(failureObject.errorCode===undefined||failureObject.errorCode===null){failureObject.errorCode=_errorCode}
if(failureObject.errorText===undefined||failureObject.errorText===null){failureObject.errorText=_errorText}}
failureCallback(failureObject)}}},DBHandler:{setValue:function setValue(category,valuesObject,successCallback,failureCallback){webOS.Request("luna://com.webos.service.commercial.signage.storageservice/settings/",{method:"set",parameters:{category:category,settings:valuesObject},onSuccess:function(successObject){if(typeof successCallback==="function"){delete successObject.returnValue;successCallback(successObject)}},onFailure:function(errorObject){if(typeof failureCallback==="function"){delete errorObject.returnValue;failureCallback(errorObject)}}})},getValue:function getValue(category,keysArray,successCallback,failureCallback){webOS.Request("luna://com.webos.service.commercial.signage.storageservice/settings/",{method:"get",parameters:{category:category,keys:keysArray},onSuccess:function(successObject){if(typeof successCallback==="function"){delete successObject.returnValue;successCallback(successObject.settings)}},onFailure:function(errorObject){if(typeof failureCallback==="function"){delete errorObject.returnValue;failureCallback(errorObject)}}})}}}
function getCurrentDevicewebOSVersion(callback){if(PLATFORM_INFO.webOSVersion!==-2){callback();return}
webOS.Request("luna://com.webos.service.systemservice/osInfo/",{method:"query",parameters:{parameters:["webos_release_codename"]},onSuccess:function(responseObject){delete responseObject.returnValue;PLATFORM_INFO=responseObject;if((PLATFORM_INFO.webos_release_codename.indexOf('deua')!==-1)||(PLATFORM_INFO.webos_release_codename.indexOf('denali')!==-1)||(PLATFORM_INFO.webos_release_codename.indexOf('dreadlocks')!==-1)){var request=webOS.Request("luna://com.webos.service.commercial.signage.storageservice",{method:"setOsdPortraitMode",parameters:{osdPortraitMode:"_____"},onComplete:function(osdResponse){if(osdResponse.errorText.indexOf('screenRotation')!==-1){PLATFORM_INFO.webOSVersion=3.2;callback()}
else{PLATFORM_INFO.webOSVersion=3;callback()}}})}
else{PLATFORM_INFO.webOSVersion=-1;callback()}},onFailure:function(err){if(navigator.userAgent==="Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.41 (KHTML, like Gecko) Large Screen WebAppManager Safari/537.41"){PLATFORM_INFO.webOSVersion=1;callback()}
else if(navigator.userAgent==="Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/538.2 (KHTML, like Gecko) Large Screen WebAppManager Safari/538.2"){PLATFORM_INFO.webOSVersion=2;callback()}
else{PLATFORM_INFO.webOSVersion=-1;callback()}}})}
function isThisAPISupported(APIName,failureCallback,afterCheckedCallback){getCurrentDevicewebOSVersion(function(){var neededwebOSVersion=PRIVATE.PlatformChecker.checkPlatformSupportedThisAPI(APIName);if(PLATFORM_INFO.webOSVersion===-1){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,"Unknown webOS Signage version.");return}
if(neededwebOSVersion===!1){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,"Cannot found called API in CustomJS.");return}
else if((neededwebOSVersion!==!0)&&(typeof neededwebOSVersion==='number')){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.OLD_WEBOS_VERSION,"webOS Signage "+PLATFORM_INFO.webOSVersion.toFixed(1)+" doesn't support "+APIName+" API. "+"webOS Signage version should be later than "+neededwebOSVersion.toFixed(1)+'.');return}
afterCheckedCallback(!0)})}
function getApplicationID(){if(window.PalmSystem){return PalmSystem.identifier.split(" ")[0]}
else{var src=location.href;if(src.indexOf(Custom.APPLICATION.IPK_TYPE)!==-1){return Custom.APPLICATION.IPK_TYPE}
else if(src.indexOf(Custom.APPLICATION.ZIP_TYPE+'.debug')!==-1){return Custom.APPLICATION.ZIP_TYPE+'.debug'}
else if(src.indexOf(Custom.APPLICATION.ZIP_TYPE)!==-1){return Custom.APPLICATION.ZIP_TYPE}
else{return '__UNKNOWN__'}}}
function getMediaID(successCallback,failureCallback){webOS.Request("luna://com.webos.service.commercial.signage.storageservice/video/",{method:'getMediaID',onSuccess:function(ret){successCallback(ret.id)},onFailure:function(errorObject){failureCallback(errorObject)}})}
function getDebugMode(successCallback,failureCallback){webOS.Request("palm://com.palm.service.devmode",{method:'getDevMode',parameters:{},onSuccess:function(ret){successCallback(ret.enabled)},onFailure:function(errorObject){failureCallback(errorObject)}})}
function getZIPTypeLaunchURI(successCallback,failureCallback){PRIVATE.DBHandler.getValue(CATEGORY.COMMERCIAL,["serverIpPort","siServerIp","secureConnection","appLaunchMode","fqdnAddr","fqdnMode"],function(returnObject){var applicationURI='';if(returnObject.appLaunchMode==='none'){failureCallback({errorCode:Custom.ERROR_CODE.APPLICATION.SETTINGS_ERROR,errorText:'Application launch mode is NONE. Set SI Server settings first.'})}
else if(returnObject.appLaunchMode==='local'){applicationURI='file:////mnt/lg/appstore/scap/procentric/scap/application/app/index.html'}
else if(returnObject.appLaunchMode==='usb'){applicationURI='file:////tmp/usb/sda/sda/index.html'}
else if(returnObject.appLaunchMode==='remote'){if(returnObject.fqdnMode==='on'){applicationURI=returnObject.fqdnAddr}
else if(returnObject.fqdnMode==='off'){if(returnObject.secureConnection==='on'){applicationURI+='http://'+returnObject.siServerIp+':'+returnObject.serverIpPort+'/procentric/scap/application/index.html'}
else if(returnObject.secureConnection==='on'){applicationURI+='https://'+returnObject.siServerIp+':'+returnObject.serverIpPort+'/procentric/scap/application/index.html'}
else{failureCallback({errorCode:Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,errorText:'Failed to get application installation settings.'})}}
else{failureCallback({errorCode:Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,errorText:'Failed to get application installation settings.'})}}
else{failureCallback({errorCode:Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,errorText:'Failed to get application installation settings.'})}
successCallback(applicationURI)},function(errorObject){failureCallback(errorObject)})};function parseSDMInfo(dataObject){function getFullName(str){if(str==='B'){return 'Bottom'}
if(str==='T'){return 'Top'}
if(str==='M'){return 'Main'}
else{return str}}
var returnObject={};if(typeof dataObject==='object'){returnObject.returnValue=!0;if(typeof dataObject.FanName==='string'){returnObject.fan={};var fanOrder=dataObject.FanName.replace(/ /gi,"").split(',');var eachFanStartIndex;for(var i=0;i<fanOrder.length;i++){if(returnObject.fan[fanOrder[i].substr(0,2)]===undefined){eachFanStartIndex=0;returnObject.fan[fanOrder[i].substr(0,2)]=[]}
returnObject.fan[fanOrder[i].substr(0,2)][eachFanStartIndex]={rpm:dataObject.FanRPM[i],status:dataObject.FanStatus[fanOrder[i].substr(0,2)][eachFanStartIndex]}
eachFanStartIndex++}}
if(typeof dataObject.TemperatureName==='string'){returnObject.temperature={};var temperatureOrder=dataObject.TemperatureName.replace(/ /gi,"").split(',');var eachTemperatureStartIndex;for(var i=0;i<temperatureOrder.length;i++){returnObject.temperature[getFullName(temperatureOrder[i])]=dataObject.Temperature[i]}}
if(dataObject.PSUStatus){returnObject.PSUStatus=dataObject.PSUStatus}}
else{returnObject={returnValue:!1,errorCode:Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,errorText:'Failed to get monitoring information.'}}
return returnObject}
Custom.prototype.Configuration={getPowerOnOffHistory:function getPowerOnOffHistory(successCallback,failureCallback){isThisAPISupported('getPowerOnOffHistory',failureCallback,function(){PRIVATE.DBHandler.getValue(CATEGORY.COMMERCIAL,[KEYS.POWER_ON_OFF_HISTORY],function successCb(returnObject){var result=JSON.parse(returnObject.powerOnOffHistory);while(!0){var emptyElementIndex=result.indexOf(' ')
if(emptyElementIndex===-1)
break;else{result.splice(emptyElementIndex,1)}}
PRIVATE.CallbackHandler.callSuccessCallback(successCallback,{powerOnOffHistory:result})},function failureCb(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to get Power On Status settings.')})})},setPowerOnStatus:function setPowerOnStatus(successCallback,failureCallback,parameters){isThisAPISupported('getwebOSVersion',failureCallback,function(){if(PRIVATE.ParameterChecker.checkMissingParameters(parameters,['mode'])===!1){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Missing required parameters.');return}
if(PRIVATE.ParameterChecker.checkParametersValidation(Custom.POWERONSTATUS,parameters,'mode')===!1){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid parameters.');return}
PRIVATE.DBHandler.setValue(CATEGORY.HOTELMODE,{powerOnStatus:parameters.mode},function(successObject){PRIVATE.CallbackHandler.callSuccessCallback(successCallback)},function(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to set Power On Status settings.')})})},getPowerOnStatus:function getPowerOnStatus(successCallback,failureCallback){isThisAPISupported('getPowerOnStatus',failureCallback,function(){PRIVATE.DBHandler.getValue(CATEGORY.HOTELMODE,[KEYS.POWER_ON_STATUS],function successCb(returnObject){PRIVATE.CallbackHandler.callSuccessCallback(successCallback,{powerOnStatus:returnObject.powerOnStatus})},function failureCb(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to get Power On Status settings.')})})},setKAM:function setKAM(successCallback,failureCallback,parameters){isThisAPISupported('setKAM',failureCallback,function(){var KAM_value;if(PRIVATE.ParameterChecker.checkMissingParameters(parameters,['keepAliveMode'])===!1){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Missing required parameters.');return}
if(parameters.keepAliveMode===!0){KAM_value='enable'}
else if(parameters.keepAliveMode===!1){KAM_value='disable'}
else{PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid parameter. parameters.enable should be true or false.');return}
PRIVATE.DBHandler.setValue(CATEGORY.COMMERCIAL,{enableKAM:KAM_value},function(successObject){PRIVATE.CallbackHandler.callSuccessCallback(successCallback)},function(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to set Keep Alive Mode settings.')})})},getKAM:function getKAM(successCallback,failureCallback){isThisAPISupported('getKAM',failureCallback,function(){PRIVATE.DBHandler.getValue(CATEGORY.COMMERCIAL,[KEYS.KEEP_ALIVE_MODE],function successCb(returnObject){var enabled=returnObject[KEYS.KEEP_ALIVE_MODE];var ret=(enabled==='enable')?!0:!1
PRIVATE.CallbackHandler.callSuccessCallback(successCallback,{keepAliveMode:ret})},function failureCb(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to get Keep Alive Mode settings.')})})},changePassword:function changePassword(successCallback,failureCallback,parameters){isThisAPISupported('changePassword',failureCallback,function(){var currentPW,newPW;if(PRIVATE.ParameterChecker.checkMissingParameters(parameters,['currentPassword','newPassword'])===!1){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Missing required parameters.');return}
currentPW=parameters.currentPassword,newPW=parameters.newPassword;if((typeof currentPW!=='string')||(typeof newPW!=='string')){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid parameter type.')}
if((currentPW.length!==4)||(newPW.length!==4)||(parseInt(newPW)<0)||(parseInt(newPW)>9999)){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid password format.');return}
if(currentPW===newPW){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Current and new password are same.');return}
PRIVATE.DBHandler.getValue(CATEGORY.HOTELMODE,[KEYS.PASSWORD],function(ret){if(ret[KEYS.PASSWORD]!==currentPW){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Incorrect password. Access denied.')}
else{PRIVATE.DBHandler.setValue(CATEGORY.HOTELMODE,{password:newPW},function(){var serverSIMenuPassword='';if(newPW==='0000'){serverSIMenuPassword='8080'}
else{var newPWInt=parseInt(newPW);serverSIMenuPassword=('0000'+(parseInt((newPWInt/10).toString()))+(((newPWInt+1)%10).toString())).substr(-4)}
PRIVATE.CallbackHandler.callSuccessCallback(successCallback,{serverUIPassword:serverSIMenuPassword})},function(err){if(typeof failureCallback==="function"){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,"Failed to get current password from platform.")}})}},function(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,"Failed to get current password from platform.")})})},getNativePortraitMode:function getNativePortraitMode(successCallback,failureCallback){isThisAPISupported('getNativePortraitMode',failureCallback,function(){if(PLATFORM_INFO.webOSVersion===3){PRIVATE.DBHandler.getValue(CATEGORY.COMMERCIAL,[KEYS.NATIVE_PORTRAIT],function(returnObject){PRIVATE.CallbackHandler.callSuccessCallback(successCallback,{nativePortrait:returnObject[KEYS.NATIVE_PORTRAIT]})},function(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,"Failed to get Native Portrait Mode settings.")})}
else if(PLATFORM_INFO.webOSVersion>=3.2){PRIVATE.DBHandler.getValue(CATEGORY.OPTION,[KEYS.SCREEN_ROTATION],function(returnObject){PRIVATE.CallbackHandler.callSuccessCallback(successCallback,{nativePortrait:returnObject[KEYS.SCREEN_ROTATION]})},function(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,"Failed to get Native Portrait Mode settings.")})}
else{PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,"Cannot get platform information yet. Try again later.")}})},setNativePortraitMode:function setNativePortraitMode(successCallback,failureCallback,parameters){isThisAPISupported('setNativePortraitMode',failureCallback,function(){if(PRIVATE.ParameterChecker.checkMissingParameters(parameters,['nativePortrait'])===!1){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Missing required parameters.');return}
if(PRIVATE.ParameterChecker.checkParametersValidation(Custom.NATIVEPORTRAIT,parameters,'nativePortrait')===!1){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid parameters.');return}
if(PLATFORM_INFO.webOSVersion===3){PRIVATE.DBHandler.setValue(CATEGORY.COMMERCIAL,{siAppOrientation:parameters.nativePortrait},function(successObject){PRIVATE.CallbackHandler.callSuccessCallback(successCallback)},function(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,"Failed to set Native Portrait Mode settings.")})}
else if(PLATFORM_INFO.webOSVersion>=3.2){PRIVATE.DBHandler.setValue(CATEGORY.OPTION,{screenRotation:parameters.nativePortrait},function(successObject){PRIVATE.CallbackHandler.callSuccessCallback(successCallback)},function(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,"Failed to set Native Portrait Mode settings.")})}
else{PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,"Cannot get platform information yet. Try again later.")}})},getWoWLAN:function getWoWLAN(successCallback,failureCallback){isThisAPISupported('getWoWLAN',failureCallback,function(){PRIVATE.DBHandler.getValue(CATEGORY.NETWORK,[KEYS.WOWLAN],function(returnObject){var returnValue;if(returnObject[KEYS.WOWLAN]==='true'){returnValue=!0}
else{returnValue=!1}
PRIVATE.CallbackHandler.callSuccessCallback(successCallback,{enableWoWLAN:returnValue})},function(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to get WoWLAN settings.')})})},setWoWLAN:function setWoWLAN(successCallback,failureCallback,parameters){isThisAPISupported('setWoWLAN',failureCallback,function(){if(PRIVATE.ParameterChecker.checkMissingParameters(parameters,['enableWoWLAN'])===!1){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Missing required parameters.');return}
if(typeof parameters.enableWoWLAN!=='boolean'){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'enableWoWLAN property value must be true or false boolean value.');return}
PRIVATE.DBHandler.setValue(CATEGORY.NETWORK,{wolwowlOnOff:parameters.enableWoWLAN.toString()},function(){PRIVATE.CallbackHandler.callSuccessCallback(successCallback)},function(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to set WoWLAN settings.')})})}}
Custom.prototype.Signage={getwebOSVersion:function getwebOSVersion(successCallback,failureCallback){isThisAPISupported('getwebOSVersion',failureCallback,function(){if(PLATFORM_INFO.webOSVersion===-2){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Cannot get platform information yet. Please try later.')}
else if(PLATFORM_INFO.webOSVersion===-1){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Cannot get platform information.')}
else if(typeof PLATFORM_INFO.webOSVersion==='number'){PRIVATE.CallbackHandler.callSuccessCallback(successCallback,{webOSVersion:PLATFORM_INFO.webOSVersion.toFixed(1)})}
else{PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Cannot get platform information.')}})},getApplicationInfo:function getApplicationInfo(successCallback,failureCallback){isThisAPISupported('getApplicationInfo',failureCallback,function(){if(getApplicationID()!==Custom.APPLICATION.IPK_TYPE){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'This application is not IPK type.');return}
var xhttp=new XMLHttpRequest();xhttp.onreadystatechange=function(){if(this.readyState==4){try{var retObject=JSON.parse(this.responseText);PRIVATE.CallbackHandler.callSuccessCallback(successCallback,retObject)}
catch(e){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to get application information.')}}};xhttp.onerror=function(err){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to get application information.')}
xhttp.open("GET","appinfo.json",!0);xhttp.send()})},switchApplication:function switchApplication(successCallback,failureCallback,parameters){isThisAPISupported('switchApplication',failureCallback,function(){if(PRIVATE.ParameterChecker.checkMissingParameters(parameters,['application'])===!1){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Missing required parameters.');return}
if((typeof parameters.application!=='string')||(PRIVATE.ParameterChecker.checkParametersValidation(Custom.APPLICATION,parameters,'application')===!1)){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid application.');return}
getZIPTypeLaunchURI(function successGetURI(zipURI){getDebugMode(function(isDebug){if(isDebug===!0){Custom.APPLICATION.ZIP_TYPE+='.debug'}
webOS.Request('luna://com.webos.applicationManager',{method:'launch',parameters:{id:parameters.application,params:{path:zipURI}},onSuccess:function(){PRIVATE.CallbackHandler.callSuccessCallback(successCallback)},onFailure:function(errorObject){if(errorObject.errorCode===-101){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.APPLICATION.NOT_INSTALLED,'Application is not installed.')}
else{PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to launch target application.')}}})},function(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to get application information.')})},function failureGetURI(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to get application launch settings.');return})})},disableApplication:function disableApplication(successCallback,failureCallback,parameters){isThisAPISupported('disableApplication',failureCallback,function(){var settings={appLaunchMode:"none"};if(PRIVATE.ParameterChecker.checkMissingParameters(parameters,['reset'])===!0){if(typeof parameters.reset!=='boolean'){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'reset property value must be true or false boolean value, if use this property.');return}
else if(parameters.reset===!0){settings.siServerIp='0.0.0.0';settings.serverIpPort='0';settings.secureConnection='off';settings.appType='zip';settings.fqdnMode='off';settings.fqdnAddr='http://'}}
else{PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Application will be disabled after reboot only if reset property is true.')}
PRIVATE.DBHandler.setValue(CATEGORY.COMMERCIAL,settings,function(){PRIVATE.CallbackHandler.callSuccessCallback(successCallback)},function(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to disable application.')})})}}
Custom.prototype.VideoSync={setMaster:function setMaster(successCallback,failureCallback,parameters){isThisAPISupported('setMaster',failureCallback,function(){if(PRIVATE.ParameterChecker.checkMissingParameters(parameters,['ip','port'])===!1){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Missing required parameters.');return}
if((typeof parameters!=='object')||(typeof parameters.ip!=='string')||(typeof parameters.port!=='number')||isNaN(parameters.port)){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid parameters.');return}
var checkIPArray=parameters.ip.split('.');if(checkIPArray.length!==4){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid IP format.');return}
for(var i=0;i<4;i++){var ipClass=parseInt(checkIPArray[i]);if((ipClass<0)||(ipClass>255)){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid IP format.');return}}
if(parameters.port<0||parameters.port>65535){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid port value.');return}
getMediaID(function successCb_getMediaID(id){webOS.Request('luna://com.webos.media',{method:'setMaster',parameters:{mediaId:id,ip:parameters.ip,port:parameters.port},onSuccess:function(successObject){PRIVATE.CallbackHandler.callSuccessCallback(successCallback,{basetime:successObject.basetime})},onFailure:function(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to set master.')}})},function failure_getMediaID(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.MEDIA_ERROR,'Failed to get loaded media information.')})})},setSlave:function setSlave(successCallback,failureCallback,parameters){isThisAPISupported('setSlave',failureCallback,function(){if(PRIVATE.ParameterChecker.checkMissingParameters(parameters,['ip','port','basetime'])===!1){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Missing required parameters.');return}
if((typeof parameters!=='object')||(typeof parameters.ip!=='string')||(typeof parameters.port!=='number')||isNaN(parameters.port)){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid parameters.');return}
var checkIPArray=parameters.ip.split('.');if(checkIPArray.length!==4){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid IP format.');return}
for(var i=0;i<4;i++){var ipClass=parseInt(checkIPArray[i]);if((ipClass<0)||(ipClass>255)){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid IP format.');return}}
if(parameters.port<0||parameters.port>65535){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid port value.');return}
if(parseInt(parameters.basetime<0)){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,{},Custom.ERROR_CODE.COMMON.BAD_PARAMETERS,'Invalid basetime value.');return}
getMediaID(function successCb_getMediaID(id){webOS.Request('luna://com.webos.media',{method:'setSlave',parameters:{mediaId:id,ip:parameters.ip,port:parameters.port,basetime:parameters.basetime},onSuccess:function(){PRIVATE.CallbackHandler.callSuccessCallback(successCallback)},onFailure:function(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.INTERNAL_ERROR,'Failed to set slave.')}})},function failure_getMediaID(errorObject){PRIVATE.CallbackHandler.callFailureCallback(failureCallback,errorObject,Custom.ERROR_CODE.COMMON.MEDIA_ERROR,'Failed to get loaded media information.')})})}}
module.exports=Custom});})()

module.exports = cordova.require("cordova/plugin/custom");
