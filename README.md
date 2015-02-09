angular strap select add-on
=================

This strap select add-on uses as the name implies the strap select plugin to provide a select dropdown interface. [angular-strap](https://github.com/mgcrea/angular-strap) is used.

Installation
------------
The editor is an add-on to the Bootstrap decorator. To use it, just include
`schema-form-strapselect.min.js`.

Easiest way is to install is with bower, this will also include dependencies:
```bash
$ bower install chengz/schema-form-strapselect
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
<script src="schema-form-strapselect.js"></script>
```

When you create your module, be sure to depend on this project's module as well.

```javascript
angular.module('yourModule', ['schemaForm', 'schemaForm-strapselect']);
```

Usage
-----
The add-on adds the following new form types, `strapselect`, `strapmultiselect`,`strapselectdynamic`, `strapmultiselectdynamic` and a new default
mapping.

| Schema             |   Default Form type  |
|:-------------------|:------------:|
| "type": "string" and "format": "strapselect"   |   strapselect   |
| "type": "array" and "format": "strapselect"   |   strapmultiselect   |


## Form Definition
All settings are made in the form definition. See the app.js file for this example in use.

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

    ];
