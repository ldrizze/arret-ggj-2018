"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = require("../classes/Logger");
var Configuration_1 = require("../main/Configuration");
Logger_1.Logger.configure(Configuration_1.Configuration.log.console, Configuration_1.Configuration.log.on_socket, Configuration_1.Configuration.log.save_on_file, Configuration_1.Configuration.log.folder);
var log = new Logger_1.Log("Logtest");
log.dbg("DEBUG test");
log.err("ERROR test");
log.wrn("WARN test");
log.inf("INFO test");
//# sourceMappingURL=log.js.map