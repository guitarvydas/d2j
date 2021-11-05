// 'var xxx;' belongs to the 'global' scope in browsers, but to the module local scope in node.js
// see https://nodejs.org/api/globals.html#globals_global

var atob = require ('atob'); // npm install atob
var pako = require ('pako'); // npm install pako
var fs   = require ('fs');

exports.decodeMxDiagram = (encoded) => {
    //reqDecodeMxDiagram ();
    return inline_decodeMxDiagram (encoded);
}    

function inline_decodeMxDiagram (encoded) {
    fs.writeFileSync ('_raw2.raw', encoded, null);
    var data = atob (encoded);
    //fs.writeFileSync ('_raw2.raw', data, 'UTF-8');
    var inf = pako.inflateRaw (
	Uint8Array.from (data, c=>c.charCodeAt (0)), {to: 'string'})
    var str = decodeURIComponent (inf);
    return str;
}

exports.expandStyle = (s) => {
    var sx = s
	.replace(/"/g,'')
	.replace(/ellipse;/g,'kind=ellipse;')
	.replace(/text;/g,'kind=text;')
	.replace (/([^=]+)=([^;]+);/g, '$1="$2" ');
    return sx;
}


function namify (s) {
    let id = stripQuotes (s)
	.trim ()
	.replace (/ /g,'__')
	.replace (/-/g, '__');
    if (id.match(/^[A-Z]/g)) {
	id = "id_" + id;
    };
    if (id.match(/^[0-9]/g)) {
	id = "id_" + id;
    };
    return id;
}

function stripQuotes (s) {
    let len = s.length;
    if (s[0] === '"' && s[len-1] === '"') {
	return s.substring (1,len-1);
    } else {
	return s;
    }
}

exports.stripQuotes = (s) => {
    return stripQuotes (s);
}

exports.mangleNewlines = (s) => {
    return s.replace (/(\r\n|\r|\n)/g,'@~@');
}

exports.swiplEsc = (s) => {
    return s.replace (/[\\]/g,'&#92;');
}



var nameIndexTable = [];
var counter = 1;

exports.resetNames = () => {
    nameIndexTable = [];
    counter = 1;
}


