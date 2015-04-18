angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/strap/strapmultiselect.html","<div ng-init=\"mainScope=this.$parent.$parent;\" class=\"form-group {{form.htmlClass}}\"\n     ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\n    <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div class=\"form-group {{form.fieldHtmlClass}}\" ng-controller=\"StrapSelectController\">\n        <button type=\"button\" class=\"btn btn-default\" sf-changed=\"form\" schema-validate=\"form\" ng-model=\"$$value$$\"\n                data-placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\')}}\" data-html=\"1\" data-multiple=\"1\"\n                bs-options=\"item.value as item.text for item in form.items | selectFilter:form:mainScope:this\"\n                bs-select>\n        </button>\n        <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n    </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/strap/strapmultiselectdynamic.html","<div ng-init=\"mainScope=this.$parent.$parent;model=$$value$$\" class=\"form-group {{form.htmlClass}}\"\n     ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\n    <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div class=\"form-group {{form.fieldHtmlClass}}\" ng-controller=\"StrapSelectController\" ng-init=\"fetchResult(form.options)\">\n        <button type=\"button\" class=\"btn btn-default\" sf-changed=\"form\" schema-validate=\"form\" ng-model=\"model\"\n                data-placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\')}}\" data-html=\"1\" data-multiple=\"1\"\n                bs-options=\"item.value as item.text for item in form.items | selectFilter:form:mainScope:this\"\n                bs-select>\n        </button>\n        <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n    </div>\n</div>\n\n");
$templateCache.put("directives/decorators/bootstrap/strap/strapselect.html","<div ng-init=\"mainScope=this.$parent.$parent;\" class=\"form-group {{form.htmlClass}}\"\n     ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\n    <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div class=\"form-group {{form.fieldHtmlClass}}\" ng-controller=\"StrapSelectController\">\n        <button type=\"button\" class=\"btn btn-default\" ng-model=\"$$value$$\" sf-changed=\"form\" schema-validate=\"form\"\n                data-placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\')}}\" data-html=\"1\"\n                bs-options=\"item.value as item.text for item in form.items | selectFilter:form:mainScope:this\"\n                bs-select>\n        </button>\n        <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n    </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/strap/strapselectdynamic.html","<div ng-init=\"mainScope=this.$parent.$parent;model=$$value$$\" class=\"form-group {{form.htmlClass}}\"\n     ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\n    <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div class=\"form-group {{form.fieldHtmlClass}}\" ng-controller=\"StrapSelectController\" ng-init=\"fetchResult(form.options)\">\n        <button type=\"button\" class=\"btn btn-default\" sf-changed=\"form\" schema-validate=\"form\" ng-model=\"model\"\n                data-placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\')}}\" data-html=\"1\"\n                bs-options=\"item.value as item.text for item in form.items | selectFilter:form:mainScope:this\"\n                bs-select>\n        </button>\n        <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n    </div>\n</div>\n");}]);
angular.module('schemaForm').config(
    ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
        function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

            var select = function (name, schema, options) {
                if (schema.type === 'string') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'strapselect';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(select);

            var multiselect = function (name, schema, options) {
                if (schema.type === 'array') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'strapmultiselect';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.array.unshift(multiselect);

            var selectdynamic = function (name, schema, options) {
                if (schema.type === 'string') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'strapselectdynamic';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(selectdynamic);

            var multiselectdynamic = function (name, schema, options) {
                if (schema.type === 'array') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'strapmultiselectdynamic';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.array.unshift(multiselectdynamic);

            //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapselect',
                'directives/decorators/bootstrap/strap/strapselect.html');
            schemaFormDecoratorsProvider.createDirective('strapselect',
                'directives/decorators/bootstrap/strap/strapselect.html');

            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapmultiselect',
                'directives/decorators/bootstrap/strap/strapmultiselect.html');
            schemaFormDecoratorsProvider.createDirective('strapmultiselect',
                'directives/decorators/bootstrap/strap/strapmultiselect.html');

            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapselectdynamic',
                'directives/decorators/bootstrap/strap/strapselectdynamic.html');
            schemaFormDecoratorsProvider.createDirective('strapselectdynamic',
                'directives/decorators/bootstrap/strap/strapselectdynamic.html');

            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapmultiselectdynamic',
                'directives/decorators/bootstrap/strap/strapmultiselectdynamic.html');
            schemaFormDecoratorsProvider.createDirective('strapmultiselectdynamic',
                'directives/decorators/bootstrap/strap/strapmultiselectdynamic.html');

        }]);

angular.module('schemaForm').controller('StrapSelectController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {


    $scope.triggerItems = function () {
        console.log("listener triggered");
        $scope.$$watchers.forEach(function (watcher) {
            if (watcher.exp == "form.items") {
                watcher.fn($scope.form.items, $scope.form.items)
            }
        });

    };

    $scope.initListeners = function () {
        if ($scope.form.options.filterTriggers) {
            $scope.form.options.filterTriggers.forEach(function (trigger) {
                $scope.$parent.$parent.$watch(trigger, $scope.triggerItems)

            });
        }
        $scope.listenerInitialized = true;
    };

    $scope.remap = function (options, data) {
        if (options && "map" in options && options.map) {
            var current_row = null;
            var result = [];
            data.forEach(function (current_row) {
                current_row["value"] = current_row[options.map.valueProperty];
                current_row["text"] = current_row[options.map.textProperty];
                result.push(current_row);
            });
            return result;

        }
        else {
            return data;
        }
    };

    $scope.clone = function (obj) {
        if (null == obj || "object" != typeof(obj)) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = $scope.clone(obj[attr]);
        }
        return copy;
    };


    $scope.getCallback = function (callback, name) {
        if (typeof(callback) == "string") {
            var _result = $scope.$parent.evalExpr(callback);
            if (typeof(_result) == "function") {
                return _result;
            }
            else {
                throw("A callback string must match name of a function in the parent scope")
            }

        }
        else if (typeof(callback) == "function") {
            return callback;
        }
        else {
            throw("A callback must either be a string matching the name of a function in the parent scope or a " +
            "direct function reference")

        }
    };
    $scope.getOptions = function (options) {
        // If defined, let the a callback function manipulate the options
        if (options.httpPost && options.httpPost.optionsCallback) {
            newOptionInstance = $scope.clone(options);
            return $scope.getCallback(options.httpPost.optionsCallback)(newOptionInstance);
        }
        if (options.httpGet && options.httpGet.optionsCallback) {
            newOptionInstance = $scope.clone(options);
            return $scope.getCallback(options.httpGet.optionsCallback)(newOptionInstance);
        }
        else {
            return options;
        }
    };
    $scope.fetchResult = function (options) {
        if (!options) {
            console.log("StrapSelectController.fetchResult : No options set");
        }
        else if (options.callback) {

            $scope.form.items = $scope.getCallback(options.callback)(options);
            console.log('callback  items', $scope.form.items);
        }
        else if (options.asyncCallback) {
            return $scope.getCallback(options.asyncCallback)(options).then(
                function (_data) {
                    $scope.form.items = $scope.remap(options, _data.data);
                    console.log('asyncCallback items', $scope.form.items);
                },
                function (data, status) {
                    alert("Loading select items failed(Options: '" + String(options) +
                    "\nError: " + status);
                });
        }
        else if (options.httpPost) {
            var finalOptions = $scope.getOptions(options);

            return $http.post(finalOptions.httpPost.url, finalOptions.httpPost.parameter).then(
                function (_data) {

                    $scope.form.items = $scope.remap(finalOptions, _data.data);
                    console.log('httpPost items', $scope.form.items);
                },
                function (data, status) {
                    alert("Loading select items failed (URL: '" + String(finalOptions.httpPost.url) +
                    "' Parameter: " + String(finalOptions.httpPost.parameter) + "\nError: " + status);
                });
        }
        else if (options.httpGet) {
            var finalOptions = $scope.getOptions(options);
            return $http.get(finalOptions.httpGet.url, finalOptions.httpGet.parameter).then(
                function (data) {
                    $scope.form.items = $scope.remap(finalOptions, data.data);
                    console.log('httpGet items', $scope.form.items);
                },
                function (data, status) {
                    alert("Loading select items failed (URL: '" + String(finalOptions.httpGet.url) +
                    "\nError: " + status);
                });
        }
    };

    if (!$scope.model) {
        $scope.model = [];
    }

}]);

angular.module('schemaForm').filter('selectFilter', [function ($filter) {
    return function (inputArray, form, scope, controller) {
        if (!angular.isDefined(inputArray) || !angular.isDefined(form.options) || !angular.isDefined(form.options.filter) || form.options.filter == '') {
            return inputArray;
        }
        var data = [];
        angular.forEach(inputArray, function (curr_item) {
            if (scope.$eval(form.options.filter, {item: curr_item})) {
                data.push(curr_item);
            }
            else if (controller.ngModel.$modelValue) {
                // If not in list, also remove the set value
                if (typeof(controller.ngModel.$modelValue) == "array") {
                    controller.ngModel.$modelValue.splice(controller.ngModel.$modelValue.indexOf(curr_item.value), 1);
                }
                else if (controller.ngModel.$modelValue == curr_item.value) {
                    controller.ngModel.$modelValue = null;
                }

            }
        });
        console.log("Filter for " + form.title + " filter:" + form.options.filter +
        " input: " + JSON.stringify(inputArray) +
        " output: " + JSON.stringify(data));
        if (!controller.listenerInitialized) {
            controller.initListeners(scope);
        }

        return data;
    };
}]);


