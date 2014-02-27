
var bind = require('bind');
var expect = require('expect');
var base64 = require('base64');
var atob = base64.atob;
var btoa = base64.btoa;

describe('b64', function() {
  it('can encode ASCII input', function() {
    expect(btoa('')).to.eql('');
    expect(btoa('f')).to.eql('Zg==');
    expect(btoa('fo')).to.eql('Zm8=');
    expect(btoa('foo')).to.eql('Zm9v');
    expect(btoa('quux')).to.eql('cXV1eA==');
    expect(btoa('!"#$%')).to.eql('ISIjJCU=');
    expect(btoa(',-./012')).to.eql('LC0uLzAxMg==');
    expect(btoa('3456789:')).to.eql('MzQ1Njc4OTo=');
    expect(btoa(';<=>?@ABC')).to.eql('Ozw9Pj9AQUJD');
    expect(btoa('DEFGHIJKLM')).to.eql('REVGR0hJSktMTQ==');
    expect(btoa('NOPQRSTUVWX')).to.eql('Tk9QUVJTVFVWV1g=');
    expect(btoa('YZ[\\]^_`abc')).to.eql('WVpbXF1eX2BhYmM=');
    expect(btoa('defghijklmnop')).to.eql('ZGVmZ2hpamtsbW5vcA==');
    expect(btoa('qrstuvwxyz{|}~')).to.eql('cXJzdHV2d3h5ent8fX4=');
  });

  it('cannot encode non-ascii input', function() {
    expect(bind(null, btoa, '✈')).to.throwException();
  });

  it('can decode base64-encoded input', function() {
    expect(atob('')).to.eql('');
    expect(atob('Zg==')).to.eql('f');
    expect(atob('Zm8=')).to.eql('fo');
    expect(atob('Zm9v')).to.eql('foo');
    expect(atob('cXV1eA==')).to.eql('quux');
    expect(atob('ISIjJCU=')).to.eql('!"#$%');
    expect(atob('JicoKSor')).to.eql("&'()*+");
    expect(atob('LC0uLzAxMg==')).to.eql(',-./012');
    expect(atob('MzQ1Njc4OTo=')).to.eql('3456789:');
    expect(atob('Ozw9Pj9AQUJD')).to.eql(';<=>?@ABC');
    expect(atob('REVGR0hJSktMTQ==')).to.eql('DEFGHIJKLM');
    expect(atob('Tk9QUVJTVFVWV1g=')).to.eql('NOPQRSTUVWX');
    expect(atob('WVpbXF1eX2BhYmM=')).to.eql('YZ[\\]^_`abc');
    expect(atob('ZGVmZ2hpamtsbW5vcA==')).to.eql('defghijklmnop');
    expect(atob('cXJzdHV2d3h5ent8fX4=')).to.eql('qrstuvwxyz{|}~');
  });

  it('cannot decode invalid input', function() {
    expect(bind(null, atob, 'a')).to.throwException();
  });

});
