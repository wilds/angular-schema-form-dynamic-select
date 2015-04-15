/*global angular */
'use strict';

/**
 * The main app module
 * @name testApp
 * @type {angular.Module}
 */

var testApp = angular.module('testApp', ['mgcrea.ngStrap', 'mgcrea.ngStrap.modal', 'schemaForm']);

testApp.controller('SelectController', ['$scope', '$http', function ($scope, $http) {

    $scope.callBackSD = function (options) {
        return [
            {value: 'value1', text: 'text1'},
            {value: 'value2', text: 'text2'},
            {value: 'value3', text: 'Select dynamic!'}
        ];
        // Note: Options is a reference to the original instance, if you change a value,
        // that change will persist when you use this form instance again.
    };

    $scope.callBackMSD = function (options) {
        return [
            {value: 'value1', text: 'text1'},
            {value: 'value2', text: 'text2'},
            {value: 'value3', text: 'Multiple select dynamic!'}
        ];
        // Note: Options is a reference to the original instance, if you change a value,
        // that change will persist when you use this form instance again.
    };

    $scope.callBackMSDAsync = function (options) {
        // Node that we got the url from the options. Not necessary, but then the same callback function can be used
        // by different selects with different parameters.
        return $http.get(options.urlOrWhateverOptionIWant);
    };

    $scope.stringOptionsCallback = function (options) {
        // Here you can manipulate the form options used in a http_post or http_get
        // For example, you can use variables to build the URL or set the parameters, here we just set the url.
        options.httpPost.url = "test/testdata.json";
        // Note: This is a copy of the form options, edits here will not persist but are only used in this request.
        return options;
    };

    $scope.schema = {
        type: 'object',
        title: 'Select',
        properties: {
            select: {
                title: 'Single Select Static',
                type: 'string',
                description: 'Only single item is allowed'
            },
            multiselect: {
                title: 'Multi Select Static',
                type: 'array',
                maxItems: 2,
                description: 'Multi single items are allowed. (select three for maxItems error)'
            },
            selectDynamic: {
                title: 'Single Select Dynamic',
                type: 'string',
                description: 'This data is loaded from the $scope.callBackSD function. (and laid out using css-options)'
            },
            multiselectDynamic: {
                title: 'Multi Select Dynamic',
                type: 'array',
                description: 'This data is loaded from the $scope.callBackMSD function. (referenced by name)'
            },
            multiselectDynamicHttpPost: {
                title: 'Multi Select Dynamic HTTP Post',
                type: 'array',
                description: 'This data is asynchronously loaded using a HTTP post. ' +
                '(specifies parameter in form, options.url in a named callback)'
            },
            multiselectDynamicHttpGet: {
                title: 'Multi Select Dynamic HTTP Get',
                type: 'array',
                description: 'This data is asynchronously loaded using a HTTP get. ' +
                '(Set the URL at options.url)'
            },
            multiselectDynamicHttpGetMapped: {
                title: 'Multi Select Dynamic HTTP Get Mapped data',
                type: 'array',
                description: 'This data is as above, but remapped from a nodeId/nodeName array of objects. ' +
                '(See app.js: "map" : {valueProperty: "nodeId", textProperty: "nodeName"})'
            },
            multiselectDynamicAsync: {
                title: 'Multi Select Dynamic Async',
                type: 'array',
                description: 'This data is asynchrously loaded using a async call. ' +
                '(specify options.async.call)'
            }

        },
        required: ['select', 'multiselect']
    };

    $scope.form = [
        {
            "key": 'select',
            "type": 'strapselect',
            "items": [
                {"value": 'value1', "text": 'text1'},
                {"value": 'value2', "text": 'text2'},
                {"value": 'value3', "text": 'text3'}
            ]
        },
        {
            "key": 'multiselect',
            "type": 'strapmultiselect',
            "items": [
                {"value": 'value1', "text": 'text1'},
                {"value": 'value2', "text": 'text2'},
                {"value": 'value3', "text": 'long very very long label3'}
            ]
        },
        {
            "key": "selectDynamic",
            "type": 'strapselectdynamic',
            "htmlClass": "col-lg-3 col-md-3",
            "labelHtmlClass": "bigger",
            "fieldHtmlClass": "tilted",
            "options": {
                "callback": $scope.callBackSD
            }
        },
        {
            "key": "multiselectDynamic",
            "type": 'strapmultiselectdynamic',
            placeholder: "not set yet(this text is defined using the placeholder option)",
            "options": {
                "callback": "callBackMSD"
            }
        },
        {
            "key": "multiselectDynamicHttpPost",
            "type": 'strapmultiselectdynamic',
            "title":'Multi Select Dynamic HTTP Post (title is from form.options, overriding the schema.title)',
            "options": {
                "httpPost": {
                    "optionsCallback": "stringOptionsCallback",
                    "parameter": {"myparam": "Hello"}
                }
            }
        },
        {
            "key": "multiselectDynamicHttpGet",
            "type": 'strapmultiselectdynamic',
            "options": {
                "httpGet": {
                    "url": "test/testdata.json"
                }
            }
        },
        {
            "key": "multiselectDynamicHttpGetMapped",
            "type": 'strapmultiselectdynamic',
            "options": {
                "httpGet": {
                    "url": "test/testdata_mapped.json"
                },
                "map" : {valueProperty: "nodeId", textProperty: "nodeName"}
            }
        },
        {
            "key": "multiselectDynamicAsync",
            "type": 'strapmultiselectdynamic',
            "onChange": function () {
                alert("You changed this value! (this was the onChange event in action)");
            },
            "options": {
                "asyncCallback": $scope.callBackMSDAsync,
                "urlOrWhateverOptionIWant": "test/testdata.json"
            }
        },
        {
            type: "submit",
            style: "btn-info",
            title: "OK"
        }

    ];
    $scope.model = {};
    $scope.model.select = 'value3';
    $scope.model.multiselect = ['value2', 'value1'];



    $scope.submitted = function (form) {
        $scope.$broadcast('schemaFormValidate');
        console.log($scope.model);
    };
}])
;


