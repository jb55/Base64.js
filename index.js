var bind = require('bind');
exports = module.exports;
exports.atob = exports.decode = bind(null, window.atob);
exports.btoa = exports.encode = bind(null, window.btoa);
