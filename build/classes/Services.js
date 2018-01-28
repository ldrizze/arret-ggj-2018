"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("../classes/Collection");
exports.Services = new Collection_1.Collection("name");
var ServiceDecorators = (function () {
    function ServiceDecorators() {
    }
    ServiceDecorators.service = function (services) {
        if (services === void 0) { services = null; }
        return function (constructor) {
            for (var s in services) {
                var the_service = services[s];
                if (exports.Services.exists(the_service)) {
                    constructor.prototype[the_service] = exports.Services.find(the_service)['obj'];
                }
            }
        };
    };
    return ServiceDecorators;
}());
exports.ServiceDecorators = ServiceDecorators;
//# sourceMappingURL=Services.js.map