/**
 * @author n.poltoratsky
 * created on 27.06.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('API', API);

    /** @ngInject */
    function API($http, APIURL) {
        this.baseURL = APIURL;
        this.types = ['locations', 'nodes', 'roots', 'sensors'];
        this.doLogin = function (user, cb) {
            $http.post(this.baseURL + '/users/login', user)
                .then(function (response) {
                    cb(response);
                });
        }

        this.setDefaultToken = function (token) {
            $http.defaults.headers.common.Authorization = token;
            localStorage.setItem('aqi_token', token);
        }

        this.doRegister = function (user, cb) {
            $http.post(this.baseURL + '/users/register', user)
                .then(function (response) {
                    cb(response);
                });
        }

        this.getInfo = function (type, id, cb) {
            if (this.types.indexOf(type) != -1) {
                var url = this.baseURL + '/' + type + '/info' + ((null == id) ? '' : '?id=' + id);
                $http.get(url)
                    .then(function (response) {
                        cb(response.data);
                    })
            }
        }

        this.getChildInfo = function (type, parent, value, cb) {
            if (this.types.indexOf(type) != -1) {
                var url = this.baseURL + '/' + type + '/info' + ((null == value) ? '' : '?' + parent + 'Id=' + value);
                $http.get(url)
                    .then(function (response) {
                        cb(response.data);
                    })
            }
        }

        this.findAllInItems = function (id, items, type) {
            try {
                return items.filter(function (item) {
                    return item[type] == id;
                })
            } catch (e) {
                return [];
            }
        }

        this.getAllNodesByLocations = function (id, roots, nodes) {
            var r = roots.filter(function (i) {
                return i.locationId == id;
            });

            return nodes.filter(function (i) {
                try {
                    return (r.filter(function (j) {
                        return j._id == i.rootId;
                    })).length > 0;
                } catch (e) {
                    return false;
                }

            })
        }

        this.getData = function (obj, type, cb) {
            // var send = Object.assign(obj, {t)
            // console.log(send, type)
            var r = Math.random() * 1E3;
            $http.post(this.baseURL + '/data/hour?type=' + type, obj)
                .then(function (response) {
                    // cb(response);
                    if (response.data.success)
                        cb(response.data.data)
                    else alert(response.data.msg);
                });
        }

        this.getMonthData = function (obj, cb) {
            $http.post(this.baseURL + '/data/daily', obj)
                .then(function (response) {
                    // cb(response);
                    if (response.data.success)
                        cb(response.data.data)
                    else alert(response.data.msg);
                });
        }


        this.getTableData = function (obj, cb) {
            $http.post(this.baseURL + '/data', obj)
                .then(function (response) {
                    // cb(response);
                    if (response.data.success)
                        cb(response.data.data, response.data.pages);
                    else alert(response.data.msg);
                });
        }

        this.update = function (type, obj, cb) {
            var url = this.baseURL + '/' + type + '/';
            $http.put(url, obj).then(function (res) {
                return cb(res);
            });
        }

        this.remove = function (type, id, cb) {
            var url = this.baseURL + '/' + type + '?id=' + id;
            $http.delete(url).then(function (err, res) {
                return cb(err, res);
            });
        }

        this.save = function (type, obj, cb) {
            var url = this.baseURL + '/' + type;
            $http.post(url, obj).then(function (response) {
                cb(response)
            });
        }
        return this;
    }

})();