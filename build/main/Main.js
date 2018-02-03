"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configuration_1 = require("./Configuration");
var Collection_1 = require("../classes/Collection");
var User_1 = require("../classes/User");
var Payload_1 = require("../classes/Payload");
var Services_1 = require("../classes/Services");
var Logger_1 = require("../classes/Logger");
Logger_1.Logger.configure(Configuration_1.Configuration.log.console, Configuration_1.Configuration.log.on_socket, Configuration_1.Configuration.log.save_on_file, Configuration_1.Configuration.log.folder);
var log = new Logger_1.Log("Main");
var main_driver = new Configuration_1.Configuration.main_driver(onConnect.bind(Configuration_1.Configuration.main_driver), onReceive.bind(Configuration_1.Configuration.main_driver), onClose.bind(Configuration_1.Configuration.main_driver));
log.inf("Creating collections");
var Users = new Collection_1.Collection("id");
var Players = new Collection_1.Collection("id");
var Gamerooms = new Collection_1.Collection("id");
log.inf("Collections successfully created");
log.inf("Registering Services");
Services_1.Services.add({ name: "Users", obj: Users });
log.inf("User service registered");
Services_1.Services.add({ name: "Players", obj: Players });
log.inf("Player service registered");
Services_1.Services.add({ name: "Gamerooms", obj: Gamerooms });
log.inf("Gameroom service registered");
Services_1.Services.add({ name: "MainDriver", obj: main_driver });
log.inf("MainDriver service registered");
log.inf("Importing functionality");
var Events_1 = require("./Events");
var Observers_1 = require("./Observers");
log.inf("Registering Observers in events");
Observers_1.Observers.foreach(function (obj, index) {
    if (Events_1.Events.exists(obj.event)) {
        var event_1 = Events_1.Events.find(obj.event);
        for (var ob in obj.observers) {
            var ob_instance = new obj.observers[ob]();
            log.inf(ob_instance.constructor.name, " registered in event ", obj.event);
            event_1.register(ob_instance);
        }
    }
});
var Actions_1 = require("./Actions");
var _users_id = 0;
log.inf("Initializing drivers");
var port_to_listen = parseInt(process.env.PORT) || 8000;
function onConnect(client_id) {
    log.inf("Registering new connection: ", client_id);
    var _user = new User_1.User((++_users_id).toString(), client_id);
    Users.add(_user);
    return _user.id;
}
function onReceive(client_id, data) {
    log.inf("Routing received data from: ", client_id);
    if (!data.action || !(data instanceof Object) || !Actions_1.Actions.exists(data.action)) {
        log.wrn("Action not found", data.action);
        return false;
    }
    var _user = Users.findBy('client_id', client_id);
    if (_user) {
        log.inf("Making Payload: ", client_id);
        var _payload = new Payload_1.Payload(_user, data.action, data, true);
        log.inf("Routing to action: ", data.action);
        var reply = Actions_1.Actions.find(data.action).run(_payload);
        if (reply) {
            main_driver.send(reply);
        }
        return true;
    }
    else {
        log.wrn("User nout found");
    }
    return false;
}
function onClose(client_id) {
    log.inf("User had been disconnected");
    var _user = Users.findBy('client_id', client_id);
    Events_1.Events.find('userDisconnected').attach("user", _user).notify();
    log.dbg("User", _user.id, "been removed?", Users.remove(_user.id));
    log.dbg("Users connected on the server", Users.length);
}
log.inf("Main driver instancied successfully");
main_driver.initialize();
log.inf("Main driver initialized");
log.inf("Trying to listen on port", port_to_listen);
main_driver.listen(port_to_listen);
log.inf("Successfully listened on port", port_to_listen);
log.inf("Server has been started, have fun and enjoy ;)");
//# sourceMappingURL=Main.js.map