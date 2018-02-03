"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Driver_1 = require("../classes/Driver");
var Payload_1 = require("../classes/Payload");
var Collection_1 = require("../classes/Collection");
var Logger_1 = require("../classes/Logger");
var socketIO = require("socket.io");
var SocketIO = (function (_super) {
    __extends(SocketIO, _super);
    function SocketIO() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.log = new Logger_1.Log('Driver.SocketIO');
        return _this;
    }
    SocketIO.prototype.initialize = function () {
        this.app = require('http').createServer(this.handleHTTPService.bind(this));
        this.io = socketIO(this.app);
        this.io.on("connection", this.onConnect.bind(this));
        this.sockets = new Collection_1.Collection('id');
        __io_instance = this;
    };
    SocketIO.prototype.listen = function (port) {
        this.port = port;
        this.app.listen(port);
    };
    SocketIO.prototype.send = function (p) {
        if (p instanceof Payload_1.Payload) {
            var payload = p;
            if (payload.is_received)
                this.log.wrn("Returning a received payload");
            var _d = {
                action: payload.data.action,
                payload: Object.assign({}, payload.data)
            };
            delete _d.payload.action;
            this.log.dbg("Sending payload to", payload.user.client_id, JSON.stringify(_d));
            var _sock = this.sockets.find(payload.user.client_id);
            if (_sock) {
                _sock.s.emit('action', _d);
            }
            else {
                this.log.err("Socket not found for client_id", payload.user.client_id);
            }
        }
        else if (p instanceof Array) {
            for (var i in p) {
                this.send(p[i]);
            }
        }
    };
    SocketIO.prototype.close = function (socket) {
    };
    SocketIO.prototype.onConnect = function (socket) {
        this.log.inf("Client connected", socket.id);
        this.sockets.add({ 'id': socket.id, s: socket });
        socket.on('action', this.onReceive);
        socket.on('disconnect', this.onClose);
        this.onConnectFn(socket.id);
    };
    SocketIO.prototype.onReceive = function (data) {
        __io_instance.doReceive(this, data);
    };
    SocketIO.prototype.doReceive = function (socket, data) {
        this.log.dbg("Data received from", socket.id, JSON.stringify(data));
        this.onReceiveFn(socket.id, data);
    };
    SocketIO.prototype.onClose = function () {
        __io_instance.doClose(this);
    };
    SocketIO.prototype.doClose = function (socket) {
        this.log.inf("Connection closed from", socket.id);
        this.onCloseFn(socket.id);
    };
    SocketIO.prototype.handleHTTPService = function (req, res) {
        res.writeHead(200);
        res.end(this.port.toString());
    };
    return SocketIO;
}(Driver_1.Driver));
exports.SocketIO = SocketIO;
var __io_instance = null;
//# sourceMappingURL=SocketIO.js.map