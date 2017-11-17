'use strict';

/**
 * @author n.poltoratsky
 * created on 27.06.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme').factory('Socket', Socket);

    /** @ngInject */
    function Socket(SocketURL) {
        // console.log('must 1')
        this.socket = null;
        this.connect = function () {
            this.socket = io.connect(SocketURL);
        };

        this.disconnect = function () {
            this.socket.disconnect();
        };
        this.sendMessage = function (event, msg) {
            this.socket.emit(event, msg);
        };
        return this;
    }
})();