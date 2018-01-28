import {SocketIO} from "../drivers/SocketIO"

export let Configuration = {
	"server_version" : "1.0.0",
	"main_driver" : SocketIO,
	"log" : {
		"console" : true,
		"save_on_file" : true,
		"on_socket" : false,
		"separated_files": true,
		"folder" : "logs"
	}
}