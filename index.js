var OriginalCustom = require('./customjs/custom');
var utils = require('./utils');

var Custom = {
    Configuration: {},
    Signage: {},
    VideoSync: {}
};
var instance = new OriginalCustom();

Custom.Configuration.changePassword = utils.promisify(instance, 'changePassword');
Custom.Configuration.getKAM = utils.promisify(instance, 'getKAM');
Custom.Configuration.getNativePortraitMode = utils.promisify(instance, 'getNativePortraitMode');
Custom.Configuration.getPowerOnOffHistory = utils.promisify(instance, 'getPowerOnOffHistory');
Custom.Configuration.getPowerOnStatus = utils.promisify(instance, 'getPowerOnStatus');
Custom.Configuration.getWoWLAN = utils.promisify(instance, 'getWoWLAN');
Custom.Configuration.setKAM = utils.promisify(instance, 'setKAM');
Custom.Configuration.setNativePortraitMode = utils.promisify(instance, 'setNativePortraitMode');
Custom.Configuration.setPowerOnStatus = utils.promisify(instance, 'setPowerOnStatus');
Custom.Configuration.setWoWLAN = utils.promisify(instance, 'setWoWLAN');

Custom.Signage.disableApplication = utils.promisify(instance, 'disableApplication');
Custom.Signage.getApplicationInfo = utils.promisify(instance, 'getApplicationInfo');
Custom.Signage.getwebOSVersion = utils.promisify(instance, 'getwebOSVersion');
Custom.Signage.switchApplication = utils.promisify(instance, 'switchApplication');

Custom.VideoSync.setMaster = utils.promisify(instance, 'setMaster');
Custom.VideoSync.setSlave = utils.promisify(instance, 'setSlave');


module.exports = Custom;