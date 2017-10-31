/**
 * AngularJS Provider to integrate the Thunderhead ONE tag.
 */
angular.module('ng-thunderhead', ['ng']).provider('thunderhead', function () {

    var key;
    /**
     * @param {String} val Your ONE tag key
     */
    this.setKey = function (val) {
        key = val;
    };

    var oneSdkGlobalVarName = 'ONESDK';
    /**
     * @param {String} val The name of the global variable which holds the ONE SDK
     */
    this.setOneSdkGlobalVarName = function (val) {
        oneSdkGlobalVarName = val;
    };

    var activationEventName = '$stateChangeSuccess';
    /**
     * @param {String} val The name of the AngularJS event to hook into
     */
    this.setActivationEventName = function (val) {
        activationEventName = val;
    };

    /**
     * @callback activationEventArgsToInteractionArgsCallback
     * @this OneSdk
     * @param {...*} Depends on the AngularJS event that is used.
     * @return {{interactionPath: String, properties: object }} Arguments for {@see OneSdk.sendInteraction}
     */

    /**
     * @type {activationEventArgsToInteractionArgsCallback}
     */
    var customActivationEventArgsToInteractionArgs = undefined;
    /**
     * @param {activationEventArgsToInteractionArgsCallback} f
     */
    this.setActivationEventArgsToInteractionArgs = function (f) {
        customActivationEventArgsToInteractionArgs = f;
    };

    this.$get = ['$rootScope', '$window', '$timeout', '$q', provider];
    function provider($rootScope, $window, $timeout, $q) {
        // Attach 'loadProject' as a method to the ONE SDK
        var oneSdk = $window[oneSdkGlobalVarName] = $window[oneSdkGlobalVarName] || {};
        oneSdk.loadProject = function () {
            var deferredOneSdk = $q.defer();

            if (document.getElementById('thunderhead-js')) {
                deferredOneSdk.reject(new Error({message: 'Thunderhead already activated'}));
                return deferredOneSdk.promise;
            } else if (key == void 0) {
                deferredOneSdk.reject(new Error({message: 'Key not provided'}));
                return deferredOneSdk.promise;
            }

            // Dynamically load the ONE tag script
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = 'thxTag';
            // script.async = true; // default true
            script.src = 'https://eu2.thunderhead.com/one/rt/js/one-tag.js?siteKey=' + key;
            script.onload = script.onreadystatechange = function () {
                var oneSdk = $window[oneSdkGlobalVarName];
                if (!oneSdk) {
                    deferredOneSdk.reject(new Error({message: 'ONE SDK not found in window.' + oneSdkGlobalVarName}));
                } else if (!angular.isObject(oneSdk.api) || !angular.isObject(oneSdk.defaults)) {
                    deferredOneSdk.reject(new Error({message: 'Invalid ONE SDK structure. Expected {api: ..., defaults: ...}'}));
                } else {
                    deferredOneSdk.resolve(oneSdk);
                }
            };
            script.onerror = script.onreadystatechange = function (error) {
                deferredOneSdk.reject(error);
            };
            var first = document.getElementsByTagName('script')[0];
            first.parentNode.insertBefore(script, first);

            // Listen to the configured Angular event to instigate a ONE 'interaction'
            deferredOneSdk.promise.then(function (oneSdk) {
                $rootScope.$on(activationEventName, function () {
                    $timeout(function () {
                        var interactionArgs = activationEventArgsToInteractionArgs.apply(oneSdk, arguments);
                        oneSdk.api.sendInteraction(interactionArgs.interactionPath, interactionArgs.properties).then(function (response) {
                            // Use a maximum timeout. Default timeout is 1050 and would be long overdue when dynamically updating the DOM.
                            // TODO explicitTimeout = now() - oneSdk.domReadyTime + oneSdk.settings.timeout
                            var timeout = Math.pow(2, 52);
                            oneSdk.api.processResponse(response, undefined, timeout);
                        });
                    });
                });
            });

            return deferredOneSdk.promise;
        };

        return oneSdk;
    }

    /**
     * Determines the current path. E.g. to use as interactionPath.
     *
     * E.g.
     * https://host.com/baz/#!/foo/bar  -->  /#!/foo/bar
     * https://host.com/baz             -->  /baz
     * https://host.com/baz/#!/         -->  /#!/
     *
     * @return {String}
     */
    function getCurrentPath() {
        var ngRouteHashIdx;
        if (ngRouteHashIdx = window.location.href.indexOf('/#!')) {
            return window.location.href.substring(ngRouteHashIdx);
        }
        if (window.location.pathname) {
            return window.location.pathname;
        }
        return '/';
    }

    /**
     * @return {{interactionPath: String, properties: object}} Arguments for {@see OneSdk.sendInteraction}
     */
    function activationEventArgsToInteractionArgs() {
        var oneSdk = this;

        // If a custom activationEventArgsToInteractionArgs function is set, use it
        if ("function" === typeof customActivationEventArgsToInteractionArgs) {
            return customActivationEventArgsToInteractionArgs.apply(oneSdk, arguments);
        }

        // The fallback is to use the current browser location and OneSdk defaults
        return {
            interactionPath: getCurrentPath(),
            properties: oneSdk.defaults.properties,
        };
    }
});
