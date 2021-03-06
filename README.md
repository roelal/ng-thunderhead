# Angular Thunderhead Module

A simple wrapper to pull in the Thunderhead ONE tag with an AngularJS-based application. This module provides only a simple API to download the Thunderhead ONE tag onto the page. All of your captures and interactions should be coded and targeted within the Thunderhead ONE interface. The `loadProject` method (usage described below) returns a promise so you can delay execution until after the snippet has loaded.

This plugin is heavily inpsired on, or actually just copied from, [jacopotarantino/ng-optimizely](https://jack.ofspades.com/angular-optimizely/index.html)

## Install

[Customize your ONE tag](https://eu2.thunderhead.com/one/help/conversations/guidance/how-do-i/one_tag_customize_intro/)
 to expose the ONE CustomerAPI as the global variable `window.ONESDK`:

```javascript
window.ONESDK = window.ONESDK || {};
ONESDK.api = customerApi;
ONESDK.defaults = defaults;
```
 
Install this as bower component or npm module:

```bash
$ bower install --save ng-thunderhead
$ npm install --save ng-thunderhead
```

Add ng-thunderhead.js to your index.html file:

```html
<!-- Angular thunderhead -->
<script src="bower_components/ng-thunderhead/ng-thunderhead.js"></script>
```

Then require ng-thunderhead in your application:

```javascript
var app = angular.module('app', ['ng-thunderhead']);
```

## Config

ng-thunderhead is a `provider`, not a `factory`. This means you'll need to configure it in a `.config()` block instead of within another module.

In your app's run block execute the `setKey` method:

```javascript
angular.module('app')
.config(['thunderheadProvider', function(thunderheadProvider) {
  thunderheadProvider.setKey('ONE-XXXXXXXXXX-0000');
}]);
```

## Run

In your app's run block execute the `loadProject` method:

```javascript
angular.module('app')
.run(['thunderhead', function(thunderhead) {
  thunderhead.loadProject();
}]);
```

The ng-thunderhead module will automatically instigate an _interaction_ for the destination location upon a _succesful state change_. (Unless you choose a different activation event.) The _interactionPath_ will be the entire URL, including the _shebang_ (`#!`).

A better way to load the library and avoid a FOUC is to use a router like [ui-router](https://github.com/angular-ui/ui-router) that allows you to defer pageload until after all of a given route's dependencies have been loaded. The `loadProject` method returns a promise so you can use it with any give plugin or framework but ui-router is a really good choice for most projects.

```javascript
app.config(function($stateProvider) {
  $stateProvider.state('app.dashboard', {
    // ... other stuff ...
    resolve: {
      thunderhead: function(thunderhead) {
        return thunderhead.loadProject();
      }
    }
  });
});
```

You can also customize on which event the thunderhead code should trigger. The default is '$stateChangeSuccess'.

```javascript
angular.module('app')
.config(['thunderheadProvider', function(thunderheadProvider) {
  thunderheadProvider.setKey('ONE-XXXXXXXXXX-0000');
  thunderheadProvider.setActivationEventName('$viewContentLoaded');
}]);
```

## Test

TODO...

## License

The MIT License (MIT)

Copyright (c) 2014 Jacopo Tarantino

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
