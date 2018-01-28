import {Collection} from "../classes/Collection"

let col = new Collection<Object>("id");
col.add({"id" : '1'});
col.add({"id" : '2'});

console.log(col.find('1'));
console.log(col.find('2'));
console.log(col.getAll());
console.log(col);