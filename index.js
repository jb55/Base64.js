var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var bind = require('bind')

/**
 * Match a normal browsers error
 */
function InvalidCharacterError(message) {
  this.message = message;
}
InvalidCharacterError.prototype = new Error;
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

/**
 * btoa - encode a binary string to base64
 *
 * @param {String} String with binary data
 * @api public
 */

function btoa(input) {
  var block;
  var charCode;
  var output = "";
  var map = chars;
  var idx = 0;

  for (; input.charAt(idx | 0) || (map = '=', idx % 1);
         output += map.charAt(63 & block >> 8 - idx % 1 * 8)) 
  {
    charCode = input.charCodeAt(idx += 3/4);

    if (charCode > 0xFF) 
      throw new InvalidCharacterError( "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");

    block = block << 8 | charCode;
  }

  return output;
}

/**
 * decode a base64 string to binary
 *
 * @param {String} base64 string
 * @api public
 */

function atob(input) {
  input = input.replace(/=+$/, '');
  if (input.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  var output = "";

  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0;
    // get next character
    buffer = input.charAt(idx++);
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}

var watob = window.atob? bind(null, window.atob) : null;
var wbtoa = window.btoa? bind(null, window.btoa) : null;

var exports = module.exports;
exports.atob = exports.decode = watob || atob;
exports.btoa = exports.encode = wbtoa || btoa;

/**
 * Export polyfills for testing
 */
var poly = exports.poly = {};
poly.atob = poly.decode = atob;
poly.btoa = poly.encode = btoa;
