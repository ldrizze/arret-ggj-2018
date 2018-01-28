import {Logger, Log} from "../classes/Logger"
import {Configuration} from "../main/Configuration"

Logger.configure(Configuration.log.console, Configuration.log.on_socket, Configuration.log.save_on_file, Configuration.log.folder);
let log = new Log("Logtest");

log.dbg("DEBUG test")
log.err("ERROR test")
log.wrn("WARN test")
log.inf("INFO test")