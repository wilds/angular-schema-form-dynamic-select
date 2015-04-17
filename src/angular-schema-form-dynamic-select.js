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
        if (null == obj || "object" != typeof obj) return obj;
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
                controller.ngModel.$modelValue.splice(controller.ngModel.$modelValue.indexOf(curr_item.value), 1);
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


