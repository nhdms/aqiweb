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

        this.getSafeRange = function(cb) {
            $http.get(this.baseURL + '/data/saferange')
            .then(function (response) {
                cb(response.data);
            })
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
            // console.log(obj)
            var r = Math.random() * 1E3;
            $http.post(this.baseURL + '/data/hour?type=' + type, obj)
                .then(function (response) {
                    // cb(response);
                    // console.log(response)
                    if (response.data.success){
                        var keys = response.data.data.map(function(i){ return i._id})
                        var a = [Array(24).keys()].map(function(i){
                            if (keys.indexOf(i) === -1) response.data.data.push({_id: i, date: new Date(obj.date), min: 0, max:0, avg: 0})
                        })
                        cb(null, response.data.data)                        
                    }
                    else cb(response.data.msg);
                });
        }

        this.getMonthData = function (obj, cb) {
            $http.post(this.baseURL + '/data/daily', obj)
                .then(function (response) {
                    // cb(response);
                    if (response.data.success)
                        cb(null, response.data.data)
                    else cb(response.data.msg);
                });
        }


        this.getTableData = function (obj, cb) {
            $http.post(this.baseURL + '/data', obj)
                .then(function (response) {
                    // cb(response);
                    if (response.data.success)
                        cb(null, response.data.data, response.data.pages);
                    else cb(response.data.msg);
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

        this.getNodesByLocation = function(lid, cb) {
            var url = this.baseURL + '/nodes/nodes'
            $http.get(url)
            .then(function (response) {
                cb(response.data);
            })
        }

        this.getReport = function(start, end, cb) {
            var url = this.baseURL + '/data/report?start=' + start + 'end= ' + end // đcm dùng template đ' compile đc đm eslint
            $http.get(url)
            .then(function(response) {
                cb(response.data)
            })
        }

        return this;
    }

})();