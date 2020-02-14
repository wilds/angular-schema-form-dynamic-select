(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['angular-schema-form'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('angular-schema-form'));
  } else {
    root.angularSchemaFormDynamicSelect = factory(root.schemaForm);
  }
}(this, function(schemaForm) {
angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/strap/strapmultiselect.html","<div ng-controller=\"dynamicSelectController\" class=\"form-group {{form.htmlClass}}\"\n     ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\n    <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div class=\"form-group {{form.fieldHtmlClass}}\" ng-init=\"populateTitleMap(form)\">\n        <button type=\"button\" class=\"btn btn-default\" sf-changed=\"form\" schema-validate=\"form\" ng-model=\"$$value$$\"\n                data-placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\')}}\"\n                data-html=\"1\"\n                data-multiple=\"1\"\n				data-placement=\"{{form.options.placement || \'bottom-left\'}}\"\n				data-max-length=\"{{form.options.inlineMaxLength}}\"\n                data-max-length-html=\"{{form.options.inlineMaxLengthHtml}}\"\n                bs-options=\"item.value as item.name for item in form.titleMap | selectFilter:this:$$value$$:&quot;$$value$$&quot;\"\n                bs-select>\n        </button>\n        <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n    </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/strap/strapselect.html","<div ng-controller=\"dynamicSelectController\" class=\"form-group {{form.htmlClass}}\"\n     ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess()}\">\n    <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div class=\"form-group {{form.fieldHtmlClass}}\" ng-init=\"populateTitleMap(form)\">\n        <button ng-if=\"(form.options.multiple == \'true\') || (form.options.multiple == true)\"\n                type=\"button\" class=\"btn btn-default\" sf-changed=\"form\" schema-validate=\"form\" ng-model=\"$$value$$\"\n                data-placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\')}}\"\n                data-html=\"1\" data-multiple=\"1\" data-max-length=\"{{form.options.inlineMaxLength}}\"\n				data-placement=\"{{form.options.placement || \'bottom-left\'}}\"\n                data-max-length-html=\"{{form.options.inlineMaxLengthHtml}}\"\n                bs-options=\"item.value as item.name for item in form.titleMap | selectFilter:this:$$value$$:&quot;$$value$$&quot;\"\n                bs-select>\n        </button>\n        <button ng-if=\"!((form.options.multiple == \'true\') || (form.options.multiple == true))\"\n                type=\"button\" class=\"btn btn-default\" sf-changed=\"form\" schema-validate=\"form\" ng-model=\"$$value$$\"\n                data-placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\')}}\"\n                data-html=\"1\"\n				data-placement=\"{{form.options.placement || \'bottom-left\'}}\"\n                bs-options=\"item.value as item.name for item in form.titleMap | selectFilter:this:$$value$$:&quot;$$value$$&quot;\"\n                bs-select>\n        </button>\n        <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}} </span>\n    </div>\n</div>\n\n");}]);
angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/uiselect/uiselect.html","<div ng-controller=\"dynamicSelectController\" class=\"form-group\"\n     ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false}\"\n         ng-init=\"insideModel=$$value$$;\">\n    <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div class=\"form-group\">\n        <ui-select ng-model=\"select_model.selected\"\n                   ng-if=\"!(form.options.tagging||false)\" theme=\"bootstrap\" ng-disabled=\"form.disabled\"\n                   on-select=\"$$value$$=$item.value\" class=\"{{form.options.uiClass}}\">\n            <ui-select-match\n                    placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\' | translate)}}\">\n                {{select_model.selected.name}}\n            </ui-select-match>\n            <ui-select-choices refresh=\"populateTitleMap(form, $select.search)\"\n                               refresh-delay=\"form.options.refreshDelay\" group-by=\"form.options.groupBy\"\n                               repeat=\"item in form.titleMap | propsFilter: {name: $select.search, description: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\') }\">\n                <div ng-bind-html=\"item.name | highlight: $select.search\"></div>\n                <div ng-if=\"item.description\">\n                    <span ng-bind-html=\"\'<small>\' + (\'\'+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\'))+ \'</small>\'\"></span>\n                </div>\n            </ui-select-choices>\n        </ui-select>\n        <ui-select ng-controller=\"dynamicSelectController\" ng-model=\"select_model.selected\"\n                   ng-if=\"(form.options.tagging||false) && !(form.options.groupBy || false)\"\n                   tagging=\"form.options.tagging||false\" tagging-label=\"form.options.taggingLabel\"\n                   tagging-tokens=\"form.options.taggingTokens\"\n                   theme=\"bootstrap\" ng-disabled=\"form.disabled\" on-select=\"$$value$$=$item.value\"\n                   class=\"{{form.options.uiClass}}\">\n            <ui-select-match\n                    placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\' | translate)}}\">\n                {{select_model.selected.name}}&nbsp;\n                <small>{{(select_model.selected.isTag===true ? form.options.taggingLabel : \'\')}}</small>\n            </ui-select-match>\n            <!--repeat code because tagging does not display properly under group by but is still useful -->\n            <ui-select-choices refresh=\"populateTitleMap(form, $select.search)\"\n                               refresh-delay=\"form.options.refreshDelay\"\n                               repeat=\"item in form.titleMap | propsFilter: {name: $select.search, description: (form.options.searchDescription===true ? $select.search : \'NOTSEARCHINGFORTHIS\') }\">\n                <div ng-if=\"item.isTag\"\n                     ng-bind-html=\"\'<div>\' + (item.name   | highlight: $select.search) + \' \' + form.options.taggingLabel + \'</div><div class=&quot;divider&quot;></div>\'\"></div>\n                <div ng-if=\"!item.isTag\" ng-bind-html=\"item.name + item.isTag| highlight: $select.search\"></div>\n                <div ng-if=\"item.description\">\n                    <span ng-bind-html=\"\'<small>\' + (\'\'+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\')) + \'</small>\'\"></span>\n                </div>\n            </ui-select-choices>\n        </ui-select>\n\n        <!--repeat code because tagging does not display properly under group by but is still useful -->\n\n        <ui-select ng-controller=\"dynamicSelectController\" ng-model=\"select_model.selected\"\n                   ng-if=\"(form.options.tagging||false) && (form.options.groupBy || false)\"\n                   tagging=\"form.options.tagging||false\" tagging-label=\"form.options.taggingLabel\"\n                   tagging-tokens=\"form.options.taggingTokens\"\n                   theme=\"bootstrap\" ng-disabled=\"form.disabled\" on-select=\"$$value$$=$item.value\"\n                   class=\"{{form.options.uiClass}}\">\n            <ui-select-match\n                    placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\' | translate)}}\">\n                {{select_model.selected.name}}&nbsp;\n                <small>{{(select_model.selected.isTag===true ? form.options.taggingLabel : \'\')}}</small>\n            </ui-select-match>\n            <ui-select-choices group-by=\"form.options.groupBy\"\n                               refresh=\"populateTitleMap(form, $select.search)\"\n                               refresh-delay=\"form.options.refreshDelay\"\n                               repeat=\"item in form.titleMap | propsFilter: {name: $select.search, description: (form.options.searchDescription===true ? $select.search : \'NOTSEARCHINGFORTHIS\') }\">\n                <div ng-if=\"item.isTag\"\n                     ng-bind-html=\"\'<div>\' + (item.name  | highlight: $select.search) + \' \' + form.options.taggingLabel + \'</div><div class=&quot;divider&quot;></div>\'\"></div>\n                <div ng-if=\"!item.isTag\" ng-bind-html=\"item.name + item.isTag| highlight: $select.search\"></div>\n                <div ng-if=\"item.description\">\n                    <span ng-bind-html=\"\'<small>\' + (\'\'+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\')) + \'</small>\'\"></span>\n                </div>\n            </ui-select-choices>\n        </ui-select>\n\n        <input\n            type=\"hidden\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            toggle-single-model\n            sf-changed=\"form\"\n            ng-model=\"insideModel\"\n            schema-validate=\"form\"/>\n\n        <span ng-if=\"form.feedback !== false\"\n          class=\"form-control-feedback\"\n          id=\"{{form.key.slice(-1)[0] + \'Status\'}}\"\n          ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"></span>\n\n        <div class=\"help-block\" sf-message=\"form.description\"></div>\n\n    </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/uiselect/uiselectmultiple.html","\n<div class=\"form-group\" ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false}\"\n        ng-controller=\"dynamicSelectController\" ng-init=\"$$value$$=$$value$$||[];uiMultiSelectInitInternalModel($$value$$)\">\n  <label class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <div class=\"form-group\">\n    <ui-select multiple sortable-options=\"{{form.sortableOptions}}\" ng-model=\"internalModel\" theme=\"bootstrap\"\n               on-select=\"$$value$$.push($item.value)\" on-remove=\"$$value$$.splice($$value$$.indexOf($item.value), 1)\"\n               class=\"{{form.options.uiClass}}\">\n      <ui-select-match placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\' | translate)}}\">{{$item.name}}</ui-select-match>\n      <ui-select-choices repeat=\"item in form.titleMap | propsFilter: {name: $select.search}\"\n         refresh=\"populateTitleMap(form, $select.search)\"\n         refresh-delay=\"form.options.refreshDelay\"\n         group-by=\"form.options.groupBy\">\n        <div ng-bind-html=\"item.name | highlight: $select.search\"></div>\n      </ui-select-choices>\n    </ui-select>\n    <span ng-if=\"form.feedback !== false\"\n      class=\"form-control-feedback\"\n      ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"></span>\n    <div class=\"help-block\"\n      ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\"\n      ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\"></div>\n  </div>\n</div>\n");}]);
angular.module('schemaForm').config(
    ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
        function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

            //Creates an default titleMap list from an enum, i.e. a list of strings.
            var enumToTitleMap = function(enm) {
                var titleMap = []; //canonical titleMap format is a list.
                enm.forEach(function(name) {
                    titleMap.push({name: name, value: name});
                });
                return titleMap;
            };

            var select = function (name, schema, options) {
                if ((schema.type === 'string') && ("enum" in schema)) {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'select';
                    if (!f.titleMap) {
                        f.titleMap = enumToTitleMap(schema['enum']);
                    }
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(select);

            //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapselect',
                'directives/decorators/bootstrap/strap/strapselect.html');

            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapmultiselect',
                'directives/decorators/bootstrap/strap/strapmultiselect.html');

            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapselectdynamic',
                'directives/decorators/bootstrap/strap/strapselect.html');

            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'strapmultiselectdynamic',
                'directives/decorators/bootstrap/strap/strapmultiselect.html');


            // UI SELECT
            //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'uiselect',
                'directives/decorators/bootstrap/uiselect/uiselect.html');


            schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'uiselectmultiple',
                'directives/decorators/bootstrap/uiselect/uiselectmultiple.html');


        }])
  .directive("toggleSingleModel", function() {
    // some how we get this to work ...
    return {
      require: 'ngModel',
      restrict: "A",
      scope: {},
      replace: true,
      controller: ['$scope', function($scope)  {
        $scope.$parent.$watch('select_model.selected',function(){
          if($scope.$parent.select_model.selected != undefined) {
            $scope.$parent.insideModel = $scope.$parent.select_model.selected.value;
            $scope.$parent.ngModel.$setViewValue($scope.$parent.select_model.selected.value);
          }
        });
      }]
    };
  })

  .directive('multipleOn', function() {
    return {
    link: function($scope, $element, $attrs) {
        $scope.$watch(
            function () { return $element.attr('multiple-on'); },
            function (newVal) {

                if(newVal == "true") {
                    var select_scope = angular.element($element).scope().$$childTail;
                    select_scope.$isMultiple = true;
                    select_scope.options.multiple = true;
                    select_scope.$select.$element.addClass('select-multiple');
                }
                else {
                    angular.element($element).scope().$$childTail.$isMultiple = false;
                }
            }
        );
      }
    };
  })
  .filter('whereMulti', function() {
    return function(items, key, values) {
      var out = [];

      if (angular.isArray(values) && items !== undefined) {
          values.forEach(function (value) {
              for (var i = 0; i < items.length; i++) {
                  if (value == items[i][key]) {
                      out.push(items[i]);
                      break;
                  }
              }
          });
      } else {
        // Let the output be the input untouched
        out = items;
      }

      return out;
    };
  })
  .filter('propsFilter', function() {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;
                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item && !item.hasOwnProperty(prop)) {
                            itemMatches = true;
                            break;
                        }
                        if (item && item.hasOwnProperty(prop)) {
                            //only match if this property is actually in the item to avoid

                            //search for either a space before the text or the textg at the start of the string so that the middle of words are not matched
                            if (item[prop].toString().toLowerCase().indexOf(text) === 0 || ( item[prop].toString()).toLowerCase().indexOf(' ' + text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });

angular.module('schemaForm').controller('dynamicSelectController', ['$scope', '$http', '$timeout', '$log', function ($scope, $http, $timeout, $log) {

    if (!$scope.form.options) {
        $scope.form.options = {};
    }

    $scope.select_model = {};

    $log.debug("Setting options." + $scope.form.options.toString());
    $scope.form.options.scope = $scope;

    $scope.triggerTitleMap = function () {
        $log.debug("listener triggered");
        // Ugly workaround to trigger titleMap expression re-evaluation so that the selectFilter it reapplied.
        $scope.form.titleMap.push({"value": "345890u340598u3405u9", "name": "34095u3p4ouij"})
        $timeout(function () { $scope.form.titleMap.pop() })

    };

    $scope.initFiltering = function (localModel) {
        if ($scope.form.options.filterTriggers) {
            $scope.form.options.filterTriggers.forEach(function (trigger) {
                $scope.$parent.$watch(trigger, $scope.triggerTitleMap)

            });
        }
        // This is set here, as the model value may become unitialized and typeless if validation fails.
        $scope.localModelType =  Object.prototype.toString.call(localModel);
        $scope.filteringInitialized = true;
    };


    $scope.finalizeTitleMap = function (form, data, newOptions) {
        // Remap the data

        form.titleMap = [];
        if (newOptions && "map" in newOptions && newOptions.map) {
            var final = newOptions.map.nameProperty.length - 1;
            var separator = newOptions.map.separatorValue ? newOptions.map.separatorValue : ' - ';
            if (angular.isArray(form.schema.type) && form.schema.type.includes('null') || form.schema.type == 'null') {
                let nullValue = {};
                //nullValue[newOptions.map.valueProperty] = null;
                //nullValue[newOptions.map.nameProperty] = '';
                form.titleMap.push(nullValue);
            }
            data.forEach(function (current_row) {
                current_row["value"] = current_row[newOptions.map.valueProperty];
                //check if the value passed is a string or not
                if(typeof newOptions.map.nameProperty != 'string'){
                    //loop through the object/array
                    var newName = "";
                    for (var i in newOptions.map.nameProperty) {
                        newName += current_row[newOptions.map.nameProperty[i]];
                        if(i != final){newName += separator}
                    }
                    current_row["name"] = newName; //init the 'name' property
                }
                else{
                    //if it is a string
                    current_row["name"] = current_row[newOptions.map.nameProperty];
                }
                form.titleMap.push(current_row);
            });

        }
        else {
            data.forEach(function (item) {
                    if ("text" in item) {
                        item.name = item.text
                    }
                }
            );
            form.titleMap = data;
        }

        if ($scope.insideModel && $scope.select_model.selected === undefined) {
            $scope.select_model.selected = $scope.find_in_titleMap($scope.insideModel).item;
        }

        // The ui-selects needs to be reinitialized (UI select sets the internalModel and externalModel.
        if ($scope.internalModel) {
            $log.debug("Call uiMultiSelectInitInternalModel");
            $scope.uiMultiSelectInitInternalModel($scope.externalModel);
        }
    };

    $scope.clone = function (obj) {
        // Clone an object (except references to this scope)
        if (null == obj || "object" != typeof(obj)) return obj;

        var copy = obj.constructor();
        for (var attr in obj) {
            // Do not clone if it is this scope
            if (obj[attr] != $scope) {
                if (obj.hasOwnProperty(attr)) copy[attr] = $scope.clone(obj[attr]);
            }
        }
        return copy;
    };


    $scope.getCallback = function (callback) {
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

    $scope.getOptions = function (options, search) {
        // If defined, let the a callback function manipulate the options
        if (options.httpPost && options.httpPost.optionsCallback) {
            let newOptionInstance = $scope.clone(options);
            return $scope.getCallback(options.httpPost.optionsCallback)(newOptionInstance, search);
        }
        if (options.httpGet && options.httpGet.optionsCallback) {
            let newOptionInstance = $scope.clone(options);
            return $scope.getCallback(options.httpGet.optionsCallback)(newOptionInstance, search);
        }
        else {
            return options;
        }
    };

    $scope.test = function (form) {
        form.titleMap.pop();
    };


    $scope.populateTitleMap = function (form, search) {

        if (form.schema && "enum" in form.schema) {
            form.titleMap = [];
            form.schema.enum.forEach(function (item) {
                    form.titleMap.push({"value": item, "name": item})
                }
            );
            $scope.finalizeTitleMap(form,form.titleMap, form.options);

        }
        else if (!form.options) {
            $log.error("dynamicSelectController.populateTitleMap(key:" + form.key + ") : No options set, needed for dynamic selects");
        }
        else if (form.options.callback) {
            form.titleMap = $scope.getCallback(form.options.callback)(form.options, search);
            $scope.finalizeTitleMap(form,form.titleMap, form.options);
            $log.debug("callback items: ", form.titleMap);
        }
        else if (form.options.asyncCallback) {
            return $scope.getCallback(form.options.asyncCallback)(form.options, search).then(
                function (_data) {
                    // In order to work with both $http and generic promises
                    _data = _data.data || _data;
                    $scope.finalizeTitleMap(form, _data, form.options);
                    $log.debug('asyncCallback items', form.titleMap);
                },
                function (data, status) {
                    if (form.options.onPopulationError) {
                        $scope.getCallback(form.options.onPopulationError)(form, data, status);
                    } else {
                        $log.error("Loading select items failed(Options: '" + String(form.options) + "\nError: " + status);
                    }
                });
        }
        else if (form.options.httpPost) {
            let finalOptions = $scope.getOptions(form.options, search);

            return $http.post(finalOptions.httpPost.url, finalOptions.httpPost.parameter).then(
                function (_data) {

                    $scope.finalizeTitleMap(form, _data.data, finalOptions);
                    $log.debug('httpPost items', form.titleMap);
                },
                function (data, status) {
                    if (form.options.onPopulationError) {
                        $scope.getCallback(form.options.onPopulationError)(form, data, status);
                    } else {
                        $log.error("Loading select items failed (URL: '" + String(finalOptions.httpPost.url) +
                        "' Parameter: " + String(finalOptions.httpPost.parameter) + "\nError: " + status);
                    }
                });
        }
        else if (form.options.httpGet) {
            let finalOptions = $scope.getOptions(form.options, search);
            return $http.get(finalOptions.httpGet.url, finalOptions.httpGet.parameter).then(
                function (data) {
                    $scope.finalizeTitleMap(form, data.data, finalOptions);
                    $log.debug('httpGet items', form.titleMap);
                },
                function (data, status) {
                    if (form.options.onPopulationError) {
                        $scope.getCallback(form.options.onPopulationError)(form, data, status);
                    } else {
                        $log.error("Loading select items failed (URL: '" + String(finalOptions.httpGet.url) +
                        "\nError: " + status);
                    }
                });
        }
    };


    $scope.find_in_titleMap = function (value) {
        for (let i = 0; i < $scope.form.titleMap.length; i++) {
            if ($scope.form.titleMap[i].value == value) {
                return {
                    "item": $scope.form.titleMap[i],
                    "index": i
                };
            }
        }
    };

    $scope.uiMultiSelectInitInternalModel = function(supplied_model)
    {
        $log.debug("$scope.externalModel: Key: " +$scope.form.key.toString() + " Model: " + supplied_model.toString());
        $scope.externalModel = supplied_model;
        $scope.internalModel = [];
        if ($scope.form.titleMap) {
            if (supplied_model !== undefined && angular.isArray(supplied_model)){
                supplied_model.forEach(function (value) {
                        let titleMap_item = $scope.find_in_titleMap(value);
                        $scope.internalModel.push(titleMap_item.item);
                        $scope.form.titleMap.splice(titleMap_item.index, 1);
                    }
                )
            }
        }
    };

}]);

angular.module('schemaForm').filter('selectFilter', [function ($filter, $log) {
    return function (inputArray, controller, localModel, strLocalModel) {
        // As the controllers' .model is the global and its form is the local, we need to get the local model as well.
        // We also need tp be able to set it if is undefined after a validation failure,so for that we need
        // its string representation as well as we do not know its name. A typical value if strLocalModel is model['groups']
        // This is very ugly, though. TODO: Find out why the model is set to undefined after validation failure.

        if (!angular.isDefined(inputArray) || !angular.isDefined(controller.form.options) ||
            !angular.isDefined(controller.form.options.filter) || controller.form.options.filter == '') {
            return inputArray;
        }



        $log.debug("----- In filtering for " + controller.form.key + "(" + controller.form.title +"), model value: " + JSON.stringify( localModel) + "----");
        $log.debug("Filter:" + controller.form.options.filter);
        if (!controller.filteringInitialized) {
            $log.debug("Initialize filter");
            controller.initFiltering(localModel);
        }


        var data = [];


        angular.forEach(inputArray, function (curr_item) {
            //$log.debug("Compare: curr_item: " + JSON.stringify(curr_item) +
            //"with : " + JSON.stringify( controller.$eval(controller.form.options.filterTriggers[0])));
            if (controller.$eval(controller.form.options.filter, {item: curr_item})) {
                data.push(curr_item);
            }
            else if (localModel) {
                // If not in list, also remove the set value

                if (controller.localModelType == "[object Array]" && localModel.indexOf(curr_item.value) > -1) {
                    localModel.splice(localModel.indexOf(curr_item.value), 1);
                }
                else if (localModel == curr_item.value) {
                    $log.debug("Setting model of type " + controller.localModelType  + "to null.");
                    localModel = null;
                }
            }
        });

        if (controller.localModelType == "[object Array]" && !localModel) {
            // An undefined local model seems to mess up bootstrap select's indicators
            $log.debug("Resetting model of type " + controller.localModelType  + " to [].");

            controller.$eval(strLocalModel + "=[]");
        }

        //$log.debug("Input: " + JSON.stringify(inputArray));
        //$log.debug("Output: " + JSON.stringify(data));
        //$log.debug("Model value out : " + JSON.stringify(localModel));
        $log.debug("----- Exiting filter for " + controller.form.title + "-----");

        return data;
    };
}]);

}));
