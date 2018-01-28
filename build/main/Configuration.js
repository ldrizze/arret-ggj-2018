"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketIO_1 = require("../drivers/SocketIO");
exports.Configuration = {
    "server_version": "1.0.0",
    "main_driver": SocketIO_1.SocketIO,
    "log": {
        "console": true,
        "save_on_file": true,
        "on_socket": false,
        "separated_files": true,
        "folder": "logs"
    }
};
//# sourceMappingURL=Configuration.js.map