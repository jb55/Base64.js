var bind = require('bind');
var exports = module.exports;
exports.atob = exports.decode = bind(null, window.atob);
exports.btoa = exports.encode = bind(null, window.btoa);
