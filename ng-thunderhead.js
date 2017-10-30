angular.module('ng-thunderhead', ['ng']).provider('thunderhead', function () {
    var key;
    var activationEventName = '$viewContentLoaded';
    var oneSdkGlobalVarName = 'ONESDK';
    this.setKey = function (val) {
        key = val;
    };
    this.setActivationEventName = function (val) {
        activationEventName = val;
    };
    this.setOneSdkGlobalVarName = function (val) {
        oneSdkGlobalVarName = val;
    };
    this.$get = ['$rootScope', '$window', '$timeout', '$q'
        , function ($rootScope, $window, $timeout, $q) {
            var service = $window[oneSdkGlobalVarName] = $window[oneSdkGlobalVarName] || {};

            service.loadProject = function () {
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
                        if (!activationEventName) {
                            oneSdk.api.sendInteraction(oneSdk.defaults.interaction, oneSdk.defaults.properties).then(function (response) {
                                oneSdk.api.processResponse(response, undefined, Math.pow(2, 52));
                            });
                        } else {
                            $rootScope.$on(activationEventName, function () {
                                $timeout(function () {
                                    oneSdk.api.sendInteraction(oneSdk.defaults.interaction, oneSdk.defaults.properties).then(function (response) {
                                        oneSdk.api.processResponse(response, undefined, Math.pow(2, 52));
                                    });
                                });
                            });
                        }
                    });
                }

                return deferred.promise;
            };

            return service;
        }]
});
