/**
 * Custom.js
 */
declare module 'customjs-promise' {

    namespace Custom {

        namespace VideoSync {
            /**
             * Sets a device as a master device for the video synchronization.
             * The master signage device manages the video synchronization for the
             * master and all slave signage devices.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 2.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/videosync/
             */
            function setMaster(
                options: {
                    ip: string,
                    port: number
                }
            ): Promise<{basetime: string}>;


            /**
             * Sets a signage device as a slave device that connects to the master device for the video
             * synchronization.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 2.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/videosync/
             */
            function setSlave(
                options: {
                    ip: string,
                    port: number,
                    basetime: string
                }
            ): Promise<null>;
        }

        namespace Signage {
            /**
             * Disables an app launching after rebooting the signage device.
             * This method sets application launch mode to None. If you set the
             * reset property to true, all values of server settings are set to
             * the default values.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 1.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/signage/?wos_flag=disableApplication#disableApplication
             */
            function disableApplication(
                options: {
                    reset: boolean
                }
            ): Promise<null>;

            /**
             * Returns the IPK type app information from appinfo.json.
             * If the current app is not IPK type, failureCallback is called.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 2.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/signage/?wos_flag=getApplicationInfo#getApplicationInfo
             */
            function getApplicationInfo(): Promise<{appinfo: any}>;

            /**
             * Gets webOS Signage version information.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 1.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/signage/?wos_flag=getwebOSVersion#getwebOSVersion
             */
            function getwebOSVersion(): Promise<{webOSVersion: string}>;

            /**
             * Closes the currently running app and launches the target app.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 2.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/signage/?wos_flag=switchApplication#switchApplication
             */
            function switchApplication(
                options: {
                    application: string
                }
            ): Promise<null>;

        }

        namespace Configuration {
            /**
             * Changes the password of the Installation menu.
             * If the password of the Installation menu changes, the internal
             * system also changes the password of the Server Settinns menu.
             * The changed password of the Server Settings menu will be returned
             *  as a result.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 1.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/configuration/?wos_flag=changePassword#changePassword
             */
            function changePassword(
                options: {
                    currentPassword: string,
                    newPassword: string
                }
            ): Promise<{serverUIPassword: Function}>;

            /**
             * Returns the current status of the Keep Alive mode, whether
             * it is enabled or disabled. The Keep Alive mode allows your app
             * to restart, even if your app is forcibly terminated due to memory
             * leak or any other reason.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 2.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/configuration/?wos_flag=getKAM#getKAM
             */
            function getKAM(): Promise<{keepAliveMode: boolean}>;

            /**
             * Gets the current setting value for the native portrait mode.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 3.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/configuration/?wos_flag=getNativePortraitMode#getNativePortraitMode
             */
            function getNativePortraitMode(): Promise<{nativePortrait: string}>;

            /**
             * Gets webOS Signage startup and shutdown history.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 1.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/configuration/?wos_flag=getPowerOnOffHistory#getPowerOnOffHistory
             */
            function getPowerOnOffHistory(): Promise<{powerOnOffHistory: [string]}>;

            /**
             * Gets power state.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 1.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/configuration/?wos_flag=getPowerOnStatus#getPowerOnStatus
             */
            function getPowerOnStatus(): Promise<{powerOnStatus: string}>;

            /**
             * Gets the current status whether WowLAN (Wake on Wireless LAN) is enabled or disabled.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 3.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/configuration/?wos_flag=getWoWLAN#getWoWLAN
             */
            function getWoWLAN(): Promise<{enableWoWLAN: boolean}>;

            /**
             * Enable or disable the Keep Alive mode. The Keep Alive mode allows
             * your app to restart, even if your app is forcibly terminated due
             * to memory leak or any other reason.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 3.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/configuration/?wos_flag=setKAM#setKAM
             */
            function setKAM(
                options: {
                    keepAliveMode: boolean
                }
            ): Promise<null>;

            /**
             * Sets the native portrait mode.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 3.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/configuration/?wos_flag=setNativePortraitMode#setNativePortraitMode
             */
            function setNativePortraitMode(
                options: {
                    nativePortrait: string
                }
            ): Promise<null>;

            /**
             * Sets power state.
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 1.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/configuration/?wos_flag=setPowerOnStatus#setPowerOnStatus
             */
            function setPowerOnStatus(
                options: {
                    mode: string
                }
            ): Promise<null>;

            /**
             * Enables or disables the WowLAN (Wake on Wireless LAN).
             * Since: Custom v1.0
             * Platform Compatibility: webOS Signage 3.0 and later versions
             * http://webossignage.developer.lge.com/api/custom-api/custom-api-v10/configuration/?wos_flag=setPowerOnStatus#setPowerOnStatus
             */
            function setWoWLAN(
                options: {
                    enableWoWLAN: boolean
                }
            ): Promise<null>;

        }
    }

    export = Custom;
}
