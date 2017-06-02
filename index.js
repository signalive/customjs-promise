var OriginalCustom = require('./customjs/custom');
var utils = require('./utils');

var Custom = {
    Configuration: {},
    Signage: {},
    VideoSync: {}
};
var instance = new OriginalCustom();

Custom.Configuration.changePassword = utils.promisify(instance.Configuration, 'changePassword');
Custom.Configuration.getKAM = utils.promisify(instance.Configuration, 'getKAM');
Custom.Configuration.getNativePortraitMode = utils.promisify(instance.Configuration, 'getNativePortraitMode');
Custom.Configuration.getPowerOnOffHistory = utils.promisify(instance.Configuration, 'getPowerOnOffHistory');
Custom.Configuration.getPowerOnStatus = utils.promisify(instance.Configuration, 'getPowerOnStatus');
Custom.Configuration.getWoWLAN = utils.promisify(instance.Configuration, 'getWoWLAN');
Custom.Configuration.setKAM = utils.promisify(instance.Configuration, 'setKAM');
Custom.Configuration.setNativePortraitMode = utils.promisify(instance.Configuration, 'setNativePortraitMode');
Custom.Configuration.setPowerOnStatus = utils.promisify(instance.Configuration, 'setPowerOnStatus');
Custom.Configuration.setWoWLAN = utils.promisify(instance.Configuration, 'setWoWLAN');

Custom.Signage.disableApplication = utils.promisify(instance.Signage, 'disableApplication');
Custom.Signage.getApplicationInfo = utils.promisify(instance.Signage, 'getApplicationInfo');
Custom.Signage.getwebOSVersion = utils.promisify(instance.Signage, 'getwebOSVersion');
Custom.Signage.switchApplication = utils.promisify(instance.Signage, 'switchApplication');

Custom.VideoSync.setMaster = utils.promisify(instance.VideoSync, 'setMaster');
Custom.VideoSync.setSlave = utils.promisify(instance.VideoSync, 'setSlave');


module.exports = Custom;