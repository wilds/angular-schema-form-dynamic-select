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

angular.module('schemaForm').controller('StrapSelectController', ['$scope', '$http', function ($scope, $http) {


    $scope.items = [];

    $scope.remap = function (_options, _data) {
        if (_options && "map" in _options && _options.map) {
            var _current_row = null;
            var _result = [];
            _data.forEach(function (_current_row) {
                _result.push({
                    value: _current_row[_options.map.valueProperty],
                    text: _current_row[_options.map.textProperty]
                });
            });
            return _result

        }
        else {
            return _data
        }
    };

    $scope.clone = function (obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = $scope.clone(obj[attr]);
        }
        return copy;
    }


    $scope.getCallback = function (callback, name) {
        if (typeof(callback) == "string") {
            var _result = $scope.$parent.evalExpr(callback);
            if (typeof(_result) == "function") {
                return _result;
            }
            else
            {
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
    $scope.getOptions = function(options) {
        // If defined, let the a callback function manipulate the options
        if (options.http_post && options.http_post.optionsCallback) {
            new_option_instance = $scope.clone(options);
            return $scope.getCallback(options.http_post.optionsCallback)(new_option_instance);
        }
        if (options.http_get && options.http_get.optionsCallback) {
            new_option_instance = $scope.clone(options);
            return $scope.getCallback(options.http_get.optionsCallback)(new_option_instance);
        }
        else
        {
            return options
        }
    };

    $scope.fetchResult = function (options) {
        if (!options) {
            console.log("StrapSelectController.fetchResult : No options set");
        }
        else if (options.callback) {

            $scope.items = $scope.getCallback(options.callback)(options);
            console.log('items', $scope.items);
        }
        else if (options.asyncCallback) {
            return $scope.getCallback(options.asyncCallback)(options).then(
                function (_data) {
                    $scope.items = $scope.remap(options, _data.data);
                    console.log('items', $scope.items);
                },
                function (data, status) {
                    alert("Loading select items failed(Options: '" + String(options) +
                    "\nError: " + status);
                });
        }
        else if (options.http_post) {
            var final_options = $scope.getOptions(options);

            return $http.post(final_options.http_post.url, final_options.http_post.parameter).then(
                function (_data) {

                    $scope.items = $scope.remap(final_options, _data.data);
                    console.log('items', $scope.items);
                },
                function (data, status) {
                    alert("Loading select items failed (URL: '" + String(final_options.http_post.url) +
                    "' Parameter: " + String(final_options.http_post.parameter) + "\nError: " + status);
                });
        }
        else if (options.http_get) {
            var final_options = $scope.getOptions(options);
            return $http.get(final_options.http_get.url, final_options.http_get.parameter).then(
                function (_data) {
                    $scope.items = $scope.remap(final_options, _data.data);
                    console.log('items', $scope.items);
                },
                function (data, status) {
                    alert("Loading select items failed (URL: '" + String(final_options.http_get.url) +
                    "\nError: " + status);
                });
        }
    };

}]);


