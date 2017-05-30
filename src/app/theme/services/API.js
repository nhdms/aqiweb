/**
 * @author n.poltoratsky
 * created on 27.06.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('API', API);

    /** @ngInject */
    function API() {
        this.baseURL = 'http://localhost:8080';
        this.get = function(url, cb) {
            
        }
        return this;
    }

})();