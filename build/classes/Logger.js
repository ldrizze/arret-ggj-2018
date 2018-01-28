"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("./Collection");
var Logger = (function () {
    function Logger() {
    }
    Logger.configure = function (on_console, on_socket, on_file, folder) {
        Logger.on_console = on_console;
        Logger.on_socket = on_socket;
        Logger.on_file = on_file;
        Logger.folder = folder;
    };
    Logger.log = function (message) {
        if (Logger.on_socket) {
        }
        if (Logger.on_file) {
        }
        if (Logger.on_console) {
            console.log(message);
        }
    };
    Logger._save_log_file = function () {
    };
    Logger.sockets = new Collection_1.Collection("id");
    return Logger;
}());
exports.Logger = Logger;
var Log = (function () {
    function Log(name) {
        this.name = name;
        this.logtypes = [null, "DBG", "WRN", "ERR", "INF"];
    }
    Log.prototype.log = function (logtype) {
        var message = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            message[_i - 1] = arguments[_i];
        }
        if (this.logtypes[logtype] != undefined) {
            Logger.log("#" + this.logtypes[logtype] + " [" + this.name + "] " + message.join(' | '));
        }
        else {
            Logger.log("#ERR [" + this.name + ".Log] logtype error " + logtype);
        }
    };
    Log.prototype.dbg = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        message.unshift(Log.DBG);
        this.log.apply(this, message);
    };
    Log.prototype.err = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        message.unshift(Log.ERR);
        this.log.apply(this, message);
    };
    Log.prototype.wrn = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        message.unshift(Log.WRN);
        this.log.apply(this, message);
    };
    Log.prototype.inf = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        message.unshift(Log.INF);
        this.log.apply(this, message);
    };
    Log.DBG = 1;
    Log.WRN = 2;
    Log.ERR = 3;
    Log.INF = 4;
    return Log;
}());
exports.Log = Log;
//# sourceMappingURL=Logger.js.map