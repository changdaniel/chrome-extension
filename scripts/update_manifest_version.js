const fs = require('fs');
const path = require("path");

let rawdata = fs.readFileSync(path.resolve(__dirname,'../public/manifest.json'));
let manifest = JSON.parse(rawdata);

let maj_min_bug = manifest.version.split(".")
let maj_min = maj_min_bug.slice(0,-1)
maj_min.push(Number(maj_min_bug[2]) + 1)

let version = maj_min.join(".")
manifest.version = version

console.log(manifest)
fs.writeFileSync(path.resolve(__dirname,"../public/manifest.json"),JSON.stringify(manifest))
