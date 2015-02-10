Angular Strap Select add-on
=================

This strap select add-on uses, as the name implies, the strap select plugin to provide a select dropdown interface. 

Specifically [angular-strap](https://github.com/mgcrea/angular-strap) is used.

Features:

* Single and multiple select
* Static and dynamic lists
* Sync and Async callbacks
* HTTP GET/POST convenience functions


#Installation

The editor is an add-on to the Bootstrap decorator. To use it (in production), just include
`angular-schema-form-strapselect.min.js`.

Easiest way is to install is with bower, this will also include dependencies:
```bash
$ bower install optimalbpm/angular-schema-form-strapselect
```

You'll need to load a few additional files to use the editor:

**Be sure to load this projects files after you load angular schema form**

Example

```HTML
<script type="text/javascript" src="/bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-sanitize/angular-sanitize.min.js"></script>
<script src="bower_components/angular-translate/angular-translate.min.js"></script>
<script src='bower_components/angular-strap/dist/angular-strap.min.js'></script>
<script src='bower_components/angular-strap/dist/angular-strap.tpl.min.js'></script>
<script src="bower_components/tv4/tv4.js"></script>
<script src="bower_components/objectpath/lib/ObjectPath.js"></script>
<script src="bower_components/angular-schema-form/dist/schema-form.min.js"></script>
<script src="bower_components/angular-schema-form/dist/bootstrap-decorator.min.js"></script>
<script src="angular-schema-form-strapselect.js"></script>
```

When you create your module, be sure to depend on this project's module as well.

```javascript
angular.module('yourModule', ['schemaForm', 'mgcrea.ngStrap']);
```

#Usage

Usage is straight forward, simply include and reference.

## Form types

The add-on contributes the following new form types, `strapselect`, `strapmultiselect`,`strapselectdynamic`, `strapmultiselectdynamic`.


| Form type             |   Control  |
|:-------------------|:------------:|
| strapselect   |strap select static content|
| strapmultiselect   |strap multi select static content|
| strapselectdynamic   |strap select dynamically loaded content|
| strapmultiselectdynamic   |strap multi select dynamically loaded content|

Built-in select-controls gets the bootstrap look but retains their functionality.


## Form Definition
All settings are made in the form definition. Sehttp://gulpjs.com/e the app.js file for this example in use.

    $scope.form = [


### Single select from static list
The selection is an array of value/name objects 

     {
       "key": 'select',
       "type": 'strapselect',
       "items": [
          {"value": 'value1', "name": 'label1'},
          {"value": 'value2', "name": 'label2'},
          {"value": 'value3', "name": 'label3'}
        ]
     },
     
### Single select from static list
The selection is an array of value/name objects 

     {
       "key": 'multiselect',
       "type": 'strapmultiselect',
        "items": [
          {"value": 'value1', "name": 'label1'},
          {"value": 'value2', "name": 'label2'},
          {"value": 'value3', "name": 'long very very long label3'}
        ]
     },
     
### Single select from dynamically loaded list via synchronous callback function
Callback must return an array of value/name objects (see static list above)

     {
       "key": "selectdynamic",
       "type": 'strapselectdynamic',
       "options": {
            "callback": $scope.callBackSD
       }
     },
     
### Multiple select from dynamically loaded list via synchronous callback function
Callback must return an array of value/name objects.
     
     {
       "key": "multiselectdynamic",
       "type": 'strapmultiselectdynamic',
       "options": {
           "callback": $scope.callBackMSD
       }
     },
     
### Multiple select from dynamically loaded list via http post
Convenience function, makes a JSON post request passing the "parameter" as is, no need for callback.
Expects the server to return a JSON array of value/name objects.
     
     {
       "key": "multiselectdynamic_http_post",
       "type": 'strapmultiselectdynamic',
       "options": {
           "http_post": {
               "url" : "/angular-schema-form-strapselect/test/testdata.json",
               "parameter": { "myparam" : "Hello"}
           }
       }
     },
     
### Multiple select from dynamically loaded list via http get
Convenience function, makes a get request, no need for callback.
Expects the server to return a JSON array of value/name objects.
     
     {
       "key": "multiselectdynamic_http_get",
       "type": 'strapmultiselectdynamic',
       "options": {
           "http_get": {
               "url" : "/angular-schema-form-strapselect/test/testdata.json"
           }
       }
     },
     
### Multiple select from asynchronous callback
Note that the "call" parameter is the only mandatory parameter, the "url" is for convenience. 
The point is that the "options" structure is passed to all callbacks, making it possible to use fever callback function,
allowing for cleaner(or not) code. 
The callback shall return a http-style promise and the data must be a JSON array of value/name objects. 
     
     {
       "key": "multiselectdynamic_async",
       "type": 'strapmultiselectdynamic',
       "options": {
           "async": {
               "call": $scope.callBackMSDAsync,
               "url" : "/angular-schema-form-strapselect/test/testdata.json"
           }
       }
     },
     
### And then a submit button. 
Not needed, of course, but is commonly used.

     {
       type: "submit",
       style: "btn-info",
       title: "OK"
     }
     
And ending the form element array:

    ];

# Example

See the index.html file.<br />
That together with the bootstrap-strapselect.js file and the test/testdata.json file is a working example.


# Issues

Please [report *all* issues you encounter](https://github.com/OptimalBPM/schema-form-strapselect/issues)

# Building

Building and minifying is done using [gulp](http://gulpjs.com/) 

### Installing gulp
To install gulp, you need npm

    npm install gulp -g

### Running the build

In the project root folder, run:

    gulp default


# Contributing

Pull requests are always very welcome. Try to make one for each thing you add, don't do [like this author(me) did](https://github.com/chengz/schema-form-strapselect/pull/2).


# Testing

Unit testing is done using [Karma and Jasmine](http://karma-runner.github.io/0.12/intro/installation.html).
The main configuration file for running tests is karma.conf.js, and test/tests.js holds the tests.


# History

1. This component was originally created by [chengz](https://github.com/chengz/). 

2. [stevehu](https://github.com/stevehu) then added functionality to connect to his light(https://github.com/networknt/light) 
framework.

3. This inspired [nicklasb](https://github.com/nicklasb) to rewrite the component, this in order to harmonize it <br/>
with the current lookup handling in angular-schema-form and generalize it for it to be able to connect to any backend. 

The rest is extremely recent history.
