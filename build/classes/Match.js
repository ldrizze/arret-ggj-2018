"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("./Collection");
var Match = (function () {
    function Match(id, name, password, maxPlayers) {
        if (maxPlayers === void 0) { maxPlayers = 3; }
        this.id = id;
        this.name = name;
        this.password = password;
        this.maxPlayers = maxPlayers;
        this.players = new Collection_1.Collection('name');
    }
    return Match;
}());
exports.Match = Match;
//# sourceMappingURL=Match.js.map