"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("../classes/Collection");
var col = new Collection_1.Collection("id");
col.add({ "id": '1' });
col.add({ "id": '2' });
console.log(col.find('1'));
console.log(col.find('2'));
console.log(col.getAll());
console.log(col);
//# sourceMappingURL=collection.js.map