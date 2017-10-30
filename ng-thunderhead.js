angular.module('ng-thunderhead', ['ng']).provider('thunderhead', function () {

    var key;
    this.setKey = function (val) {
        key = val;
    };

    var oneSdkGlobalVarName = 'ONESDK';
    this.setOneSdkGlobalVarName = function (val) {
        oneSdkGlobalVarName = val;
    };

    var activationEventName = '$stateChangeSuccess';
    this.setActivationEventName = function (val) {
        activationEventName = val;
    };

    /**
     * @callback activationEventArgsToInteractionArgsCallback
     * @this OneSdk
     * @param {...*} Depends on the AngularJS event that is used.
     * @returns {{interactionPath: String, properties: object }} Arguments for {@see OneSdk.sendInteraction}
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
        var oneSdk = $window[oneSdkGlobalVarName] = $window[oneSdkGlobalVarName] || {};

        oneSdk.loadProject = function () {
            var deferred = $q.defer();

            if (document.getElementById('thunderhead-js')) {
                deferred.reject(new Error({message: 'Thunderhead already activated'}));

            } else if (key == void 0) {
                deferred.reject(new Error({message: 'Key not provided'}));

            } else {
                // Dynamically load the ONE tag
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.id = 'thxTag';
                // script.async = true; // default true
                script.src = 'https://eu2.thunderhead.com/one/rt/js/one-tag.js?siteKey=' + key;
                script.onload = script.onreadystatechange = function () {
                    var oneSdk = $window[oneSdkGlobalVarName];
                    if (!oneSdk) {
                        deferred.reject(new Error({message: 'ONE SDK not found in window.' + oneSdkGlobalVarName}));
                    } else if (!angular.isObject(oneSdk.api) || !angular.isObject(oneSdk.defaults)) {
                        deferred.reject(new Error({message: 'Invalid ONE SDK structure. Expected {api: ..., defaults: ...}'}));
                    } else {
                        deferred.resolve(oneSdk);
                    }
                };
                script.onerror = script.onreadystatechange = function (error) {
                    deferred.reject(error);
                };
                var first = document.getElementsByTagName('script')[0];
                first.parentNode.insertBefore(script, first);

                // Bind the instigation of a ONE 'interaction' to the configured Angular event
                deferred.promise.then(function (oneSdk) {
                    $rootScope.$on(activationEventName, function () {
                        var interactionArgs = activationEventArgsToInteractionArgs.apply(oneSdk, arguments);
                        $timeout(function () {
                            oneSdk.api.sendInteraction(interactionArgs.interactionPath, interactionArgs.properties).then(function (response) {
                                oneSdk.api.processResponse(response, undefined, Math.pow(2, 52));
                            });
                        });
                    });
                });
            }

            return deferred.promise;
        };

        return oneSdk;
    }

    function activationEventArgsToInteractionArgs() {
        var oneSdk = this;

        // If a custom activationEventArgsToInteractionArgs function is set, use it
        if ("function" === typeof customActivationEventArgsToInteractionArgs) {
            return customActivationEventArgsToInteractionArgs.apply(oneSdk, arguments);
        }

        // If the set activationEvent is '$stateChangeSuccess', use stateChangeSuccessEventArgsToInteractionArgs
        if (activationEventName === '$stateChangeSuccess') {
            return stateChangeSuccessEventArgsToInteractionArgs.apply(oneSdk, arguments);
        }

        // The fallback is to use the current browser location and OneSdk defaults
        return {
            interactionPath: $window.location.pathname || '/',
            properties: oneSdk.defaults.properties,
        };
    }

    function stateChangeSuccessEventArgsToInteractionArgs (event, toState, toParams, fromState, fromParams) {
        var oneSdk = this;
        return {
            interactionPath: toState.url,
            properties: oneSdk.defaults,
        }
    }
});
