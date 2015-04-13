[![Bower version](https://badge.fury.io/bo/angular-schema-form-dynamic-select.svg)](http://badge.fury.io/bo/angular-schema-form-dynamic-select)

Angular Strap Dynamic Select add-on
=================

This dynamic select add-on uses the strap select plugin to provide a dynamic select drop down interface. 

Specifically [angular-strap](https://github.com/mgcrea/angular-strap) is used.

Features:

* Single and multiple select
* Static and dynamic lists
* Sync and Async callbacks
* HTTP GET/POST convenience functions
* Angular schema form options
  * Supported :
    * key, type, title, description, placeholder
    * notitle, onChange, condition
    * htmlClass, labelHtmlClass and fieldHtmlClass
  * Not supported(will be added):  
    *  readonly, copyValueTo, 
  * Not applicable(will not be added due to the nature of drop downs, [disagree?](https://github.com/OptimalBPM/schema-form-dynamic-select/issues)):
    * validationMessage, feedback
    
   
<b>Note:<br />
Since 0.3.3 value/name-pairs for drop down data is deprecated.<br />
The correct way, and how the HTML select element actually works, is value/text.<br />
The the add-on still supports both variants, but value/name will either be removed or<br /> 
replaced by a mapping in a later major version.
<b />

#Installation

The editor is an add-on to the Bootstrap decorator. To use it (in production), just include
`angular-schema-form-dynamic-select.min.js`.

Easiest way is to install is with bower, this will also include dependencies:

```bash
$ bower install angular-schema-form-dynamic-select
```

If you want to use the develop branch:

```bash
$ bower install angular-schema-form-dynamic-select#develop
```

\#develop is not recommended for production, but perhaps you want to use stuff from the next version in development.


You'll need to load a few additional files to use the editor:

**Be sure to load this projects files after you load angular schema form**

Example

```HTML
<script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-sanitize/angular-sanitize.min.js"></script>
<script src='bower_components/angular-strap/dist/angular-strap.min.js'></script>
<script src='bower_components/angular-strap/dist/angular-strap.tpl.min.js'></script>
<script src="bower_components/tv4/tv4.js"></script>
<script src="bower_components/objectpath/lib/ObjectPath.js"></script>
<script src="bower_components/angular-schema-form/dist/schema-form.min.js"></script>
<script src="bower_components/angular-schema-form/dist/bootstrap-decorator.min.js"></script>
<script src="bower_components/angular-schema-form-dynamic-select/angular-schema-form-dynamic-select.js"></script>
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

Built-in select-controls gets the bootstrap look but retain their functionality.


## Form Definition
All settings are made in the form definition. Sehttp://gulpjs.com/e the app.js file for this example in use.

    $scope.form = [


### Single select from static list
The selection is an array of value/text objects 

     {
       "key": 'select',
       "type": 'strapselect',
       "items": [
          {"value": 'value1', "text": 'text1'},
          {"value": 'value2', "text": 'text2'},
          {"value": 'value3', "text": 'text3'}
        ]
     },
     
### Single select from static list
The selection is an array of value/text objects 

     {
       "key": 'multiselect',
       "type": 'strapmultiselect',
        "items": [
          {"value": 'value1', "text": 'text1'},
          {"value": 'value2', "text": 'text2'},
          {"value": 'value3', "text": 'long very very long label3'}
        ]
     },
     
### Single select from dynamically loaded list via synchronous callback function
Callback must return an array of value/text objects (see static list above)

     {
       "key": "selectdynamic",
       "type": 'strapselectdynamic',
       "options": {
            "callback": $scope.callBackSD
       }
     },
     
### Multiple select from dynamically loaded list via synchronous callback function
Callback must return an array of value/text objects.
     
     {
       "key": "multiselectdynamic",
       "type": 'strapmultiselectdynamic',
       "options": {
           "callback": $scope.callBackMSD
       }
     },
     
### Multiple select from dynamically loaded list via http post
Convenience function, makes a JSON post request passing the "parameter" as is, no need for callback.
Expects the server to return a JSON array of value/text objects.
     
     {
       "key": "multiselectdynamic_http_post",
       "type": 'strapmultiselectdynamic',
       "options": {
           "http_post": {
               "url" : "/angular-schema-form-dynamic-select/test/testdata.json",
               "parameter": { "myparam" : "Hello"}
           }
       }
     },
     
### Multiple select from dynamically loaded list via http get
Convenience function, makes a get request, no need for callback.
Expects the server to return a JSON array of value/text objects.
     
     {
       "key": "multiselectdynamic_http_get",
       "type": 'strapmultiselectdynamic',
       "options": {
           "http_get": {
               "url" : "/angular-schema-form-dynamic-select/test/testdata.json"
           }
       }
     },
     
### Multiple select from asynchronous callback
Note that the "call" parameter is the only mandatory parameter, the "url" is for convenience. 
The point is that the "options" structure is passed to all callbacks, making it possible to use fever callback function,
allowing for cleaner(or not) code. 
The callback shall return a http-style promise and the data must be a JSON array of value/text objects. 
     
     {
       "key": "multiselectdynamic_async",
       "type": 'strapmultiselectdynamic',
       "options": {
           "async": {
               "call": $scope.callBackMSDAsync,
               "url" : "/angular-schema-form-dynamic-select/test/testdata.json"
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

See the index.html file, together with the bootstrap-strapselect.js file and the test/testdata.json file it
constitutes a working example.

To run it, simply clone the repository 
    
    git clone https://github.com/OptimalBPM/angular-schema-form-dynamic-select.git
    cd angular-schema-form-dynamic-select
    bower update

..and open index.html in a browser.

# Bugs, omissions, feature requests 

Please [report *all* issues you encounter](https://github.com/OptimalBPM/schema-form-dynamic-select/issues)

If you suspect that there is a bug in angular-schema-form-dynamic-select that isn't reproducible in any of the examples,<br />
please make a small example in plunkr or similar where you recreate the problem, it will make it easier to help you.

If something is difficult to understand, that is also an issue, please ask for clarification if the documentation is insufficient.

Any ideas on new features are always welcome.

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

Remember that the next version is in the develop branch, so if you want to add new features, do that there.<br />
If you want to fix a bug, do that against the master branch.

# Testing

Unit testing is done using [Karma and Jasmine](http://karma-runner.github.io/0.12/intro/installation.html).
The main configuration file for running tests is karma.conf.js, and test/tests.js holds the tests.


# History

1. This component was originally created by [chengz](https://github.com/chengz/). 

2. [stevehu](https://github.com/stevehu) then added functionality to his project to connect to his light(https://github.com/networknt/light) 
framework.

3. This inspired [nicklasb](https://github.com/nicklasb) to merge stevehu:s code and rewrite the plugin in order to:

* harmonize it with the current lookup handling in angular-schema-form
* generalize it for it to be able to connect to any backend. 

The rest is extremely recent history.
