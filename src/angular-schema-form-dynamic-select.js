angular.module('schemaForm').config(
    ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
        function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

            var select = function (name, schema, options) {
                if ((schema.type === 'string') && ("enum" in schema)) {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
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



            var multiselectdynamic = function (name, schema, options) {
                if (schema.type === 'array') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'strapmultiselectdynamic';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

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

angular.module('schemaForm').controller('strapSelectController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {


    $scope.triggerItems = function () {
        console.log("listener triggered");
        $scope.$$watchers.forEach(function (watcher) {
            if (watcher.exp == "form.titleMap") {
                watcher.fn($scope.form.titleMap, $scope.form.titleMap)
            }
        });

    };

    $scope.initFiltering = function (localModel) {
        if ($scope.form.options.filterTriggers) {
            $scope.form.options.filterTriggers.forEach(function (trigger) {
                $scope.$watch(trigger, $scope.triggerItems)

            });
        }
        // This is set here, as the model value may become unitialized and typeless if validation fails.
        $scope.localModelType =  Object.prototype.toString.call(localModel);
        $scope.filteringInitialized = true;
    };


    $scope.remap = function (options, data) {
        if (options && "map" in options && options.map) {
            var current_row = null;
            var result = [];
            data.forEach(function (current_row) {
                current_row["value"] = current_row[options.map.valueProperty];
                current_row["name"] = current_row[options.map.nameProperty];
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

            console.log("StrapSelectController.fetchResult : No options set, needed for dynamic selects");
        }
        else if (options.callback) {

            $scope.form.titleMap = $scope.getCallback(options.callback)(options);
            console.log('callback items', $scope.form.titleMap);
        }
        else if (options.asyncCallback) {
            return $scope.getCallback(options.asyncCallback)(options).then(
                function (_data) {
                    $scope.form.titleMap = $scope.remap(options, _data.data);
                    console.log('asyncCallback items', $scope.form.titleMap);
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

                    $scope.form.titleMap = $scope.remap(finalOptions, _data.data);
                    console.log('httpPost items', $scope.form.titleMap);
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
                    $scope.form.titleMap = $scope.remap(finalOptions, data.data);
                    console.log('httpGet items', $scope.form.titleMap);
                },
                function (data, status) {
                    alert("Loading select items failed (URL: '" + String(finalOptions.httpGet.url) +
                    "\nError: " + status);
                });
        }
    };
    $scope.findTitles = function (_form)
    {
        result = [];
        if ("enum" in _form.schema) {

            _form.schema.enum.forEach(function (item) {
                    result.push({"value": item, "name": item})
                }
            );
            return result;

        } else
        if ("titleMap" in _form) {
            _form.titleMap.forEach(function (item) {
                    if ("text" in item) {
                        item.name = item.text
                    }
                    result.push(item)
                }
            );
            console.log(result);
            return result;
        }

    }

}]);

angular.module('schemaForm').filter('selectFilter', [function ($filter) {
    return function (inputArray, controller, localModel, strLocalModel) {
        // As the controllers' .model is the global and its form is the local, we need to get the local model as well.
        // We also need tp be able to set it if is undefined after a validation failure,so for that we need
        // its string representation as well as we do not know its name. A typical value if strLocalModel is model['groups']
        // This is very ugly, though. TODO: Find out why the model is set to undefined after validation failure.

        if (!angular.isDefined(inputArray) || !angular.isDefined(controller.form.options) ||
            !angular.isDefined(controller.form.options.filter) || controller.form.options.filter == '') {
            return inputArray;
        }

        console.log("----- In filtering for " + controller.form.key + "(" + controller.form.title +"), model value: " + JSON.stringify( localModel) + "----");
        console.log("Filter:" + controller.form.options.filter);
        if (!controller.filteringInitialized) {
            console.log("Initialize filter");
            controller.initFiltering(localModel);
        }
        var data = [];


        angular.forEach(inputArray, function (curr_item) {
            console.log("Compare: curr_item: " + JSON.stringify(curr_item) +
            "with : " + JSON.stringify( controller.$eval(controller.form.options.filterTriggers[0])));
            if (controller.$eval(controller.form.options.filter, {item: curr_item})) {
                data.push(curr_item);
            }
            else if (localModel) {
                // If not in list, also remove the set value

                if (controller.localModelType == "[object Array]") {
                    localModel.splice(localModel.indexOf(curr_item.value), 1);
                }
                else if (localModel == curr_item.value) {
                    console.log("Setting model of type " + controller.localModelType  + "to null.");
                    localModel = null;
                }
            }
        });

        if (controller.localModelType == "[object Array]" && !localModel) {
            // An undefined local model seems to mess up bootstrap select's indicators
            console.log("Resetting model of type " + controller.localModelType  + " to [].");

            controller.$eval(strLocalModel + "=[]");
        }


        console.log("Input: " + JSON.stringify(inputArray));
        console.log("Output: " + JSON.stringify(data));
        console.log("Model value out : " + JSON.stringify(localModel));
        console.log("----- Exiting filter for " + controller.form.title + "-----");


        return data;
    };
}]);





