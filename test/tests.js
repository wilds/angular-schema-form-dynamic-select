/* jshint expr: true */
chai.should();

describe('Schema form', function () {

    describe('directive', function () {
        beforeEach(module('templates'));
        beforeEach(module('schemaForm'));
        beforeEach(module('mgcrea.ngStrap'));
        beforeEach(
            //We don't need no sanitation. We don't need no thought control.
            module(function ($sceProvider) {
                $sceProvider.enabled(false);
            })
        );


        var assignToScope = function (scope, http) {

            scope.callBackSD = function (options) {
                return [
                    {value: 'value1', name: 'name1'},
                    {value: 'value2', name: 'name2'},
                    {value: 'value3', name: 'Select dynamic!'}
                ]
            };

            scope.callBackMSD = function (options) {
                return [
                    {value: 'value1', name: 'name1'},
                    {value: 'value2', name: 'name2'},
                    {value: 'value3', name: 'Multiple select dynamic!'}
                ]
            };


            scope.callBackMSDAsync = function (options) {
                // Node that we got the url from the options. Not necessary, but then the same callback function can be used
                // by different selects with different parameters.
                return http.get(options.async.url);
            };


            scope.schema = {
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
                        description: 'Multi single items are allowed(select third for error)'
                    },
                    selectdynamic: {
                        title: 'Single Select Dynamic',
                        type: 'string',
                        description: 'This data is loaded from the $scope.callBackSD function.'
                    },
                    multiselectdynamic: {
                        title: 'Multi Select Dynamic',
                        type: 'array',
                        description: 'This data is loaded from the $scope.callBackMSD function.'
                    },
                    multiselectdynamic_http_post: {
                        title: 'Multi Select Dynamic HTTP Post',
                        type: 'array',
                        description: 'This data is asynchrously loaded using a HTTP post(specify options.url and options.parameter)'
                    },
                    multiselectdynamic_http_get: {
                        title: 'Multi Select Dynamic HTTP Get',
                        type: 'array',
                        description: 'This data is asynchrously loaded using a HTTP get(specify options.url)'
                    },
                    multiselectdynamic_async: {
                        title: 'Multi Select Dynamic Async',
                        type: 'array',
                        description: 'This data is asynchrously loaded using a async call(specify options.async.call)'
                    }
                },
                required: ['select', 'multiselect']
            };

            scope.test_response = [
                          {value: "json-value1", name: "json-name1"},
                          {value: "json-value2", name: "json-name2"},
                          {value: "json-value3", name: "json-name3"}
                ];

            scope.form = [
                {
                    "key": 'select',
                    "type": 'strapselect',
                    "items": [
                        {"value": 'value1', "name": 'name1'},
                        {"value": 'value2', "name": 'name2'},
                        {"value": 'value3', "name": 'name3'}
                    ]
                },
                {
                    "key": 'multiselect',
                    "type": 'strapmultiselect',
                    "items": [
                        {"value": 'value1', "name": 'name1'},
                        {"value": 'value2', "name": 'name2'},
                        {"value": 'value3', "name": 'long very very long name3'}
                    ]
                },
                {
                    "key": "selectdynamic",
                    "type": 'strapselectdynamic',
                    "options": {
                        "callback": scope.callBackSD
                    }
                },
                {
                    "key": "multiselectdynamic",
                    "type": 'strapmultiselectdynamic',
                    "options": {
                        "callback": scope.callBackMSD
                    }
                },
                {
                    "key": "multiselectdynamic_http_post",
                    "type": 'strapmultiselectdynamic',
                    "options": {
                        "http_post": {
                            "url": "test/testdata.json",
                            "parameter": {"myparam": "Hello"}
                        }
                    }
                },
                {
                    "key": "multiselectdynamic_http_get",
                    "type": 'strapmultiselectdynamic',
                    "options": {
                        "http_get": {
                            "url": "test/testdata.json"
                        }
                    }
                },
                {
                    "key": "multiselectdynamic_async",
                    "type": 'strapmultiselectdynamic',
                    "options": {
                        "async": {
                            "call": scope.callBackMSDAsync,
                            "url": "test/testdata.json"
                        }
                    }
                }
            ];

            scope.model = {};
        };

        it('should load the correct items into each type of select', function () {
            inject(function ($compile, $rootScope, schemaForm, $http, $httpBackend, $timeout, $document) {
                var scope = $rootScope.$new();

                assignToScope(scope, $http);
                var tmpl = angular.element('<form sf-schema="schema" sf-form="form" sf-model="model"></form>');
                $httpBackend.whenGET("test/testdata.json").respond(200, scope.test_response);
                $httpBackend.whenPOST("test/testdata.json", {"myparam": "Hello"}).respond(200, scope.test_response);
                $compile(tmpl)(scope);
                $rootScope.$apply();
                tmpl.children().eq(6).children().eq(0).children().eq(1).click();
                $timeout(function() {
                        // Single Select Dynamic
                        expect(angular.element(tmpl.children().eq(2).children().eq(0).children().eq(1)).scope().items).to.deep.equal(scope.callBackSD());
                        // Multi Select Dynamic
                        expect(angular.element(tmpl.children().eq(3).children().eq(0).children().eq(1)).scope().items).to.deep.equal(scope.callBackMSD());
                        // Multi Select Dynamic HTTP Post
                        expect(angular.element(tmpl.children().eq(4).children().eq(0).children().eq(1)).scope().items).to.deep.equal(scope.test_response);
                        // Multi Select Dynamic HTTP Get
                        expect(angular.element(tmpl.children().eq(5).children().eq(0).children().eq(1)).scope().items).to.deep.equal(scope.test_response);
                        // Multi Select Dynamic Async
                        expect(angular.element(tmpl.children().eq(6).children().eq(0).children().eq(1)).scope().items).to.deep.equal(scope.test_response);

                    }
                );
                $httpBackend.flush()
                $timeout.flush()

            });
        });




    });
});
