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


var contextStack = [];

function top () {
    let len = contextStack.length;
    let index = len - 1;
    if (index < 0) { throw "support context stack empty";  }
    return contextStack[index];
}

exports.pushNewContext = () => {
    contextStack.push ({id:'',attributes:[]});
    return '';
}

function popContext () {
    contextStack.pop ();
}

exports.popContext = () => {
    popContext ();
    return '';
}

exports.setID = (s) => {
    var name = namify (s);
    top (contextStack).id = name;
    return '';
}

exports.getID = (s) => {
    return top (contextStack).id;
}

exports.appendAttribute = (name,v) => {
    top (contextStack).attributes.push ({name:name, value:v});
    return '';
}

exports.appendIDAttribute = (name,s) => {
    top (contextStack).attributes.push ({name:name, value:namify (s)});
    return '';
}

exports.generateAttributesPop = () => {
    let context = top (contextStack);
    popContext ();
    let s = '';
    let id = context.id;
    context.attributes.forEach (a => {
	let name = a.name;
	let v = a.value;
	s = s + `\nrelation(${name}, ${id}, ${v}).`;
    });
    return s;
}

exports.expandStyle = (s) => {
    var sx = s
	.replace(/"/g,'')
	.replace(/ellipse;/g,'kind=ellipse;')
	.replace(/text;/g,'kind=text;')
	.replace (/([^=]+)=([^;]+);/g, '$1="$2" ');
    return sx;
}


