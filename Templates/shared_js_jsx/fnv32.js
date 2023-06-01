//
// Derived from:

// fnv32
//
// Version: 0.0.1
// Author: Mark W. B. Ashcroft (mark [at] fluidecho [dot] com)
// License: MIT or Apache 2.0.
//
// Copyright (c) 2017 Mark W. B. Ashcroft.
// Copyright (c) 2017 FluidEcho.
//

//
// This code is shared between CEP/JavaScript and ExtendScript
//
// Don't use 'var' - some engines call this within a non-global scope
// if using var we end up defining this in the wrong scope
if ("undefined" == typeof $$SHORTCODE$$) {
    $$SHORTCODE$$ = {};
}

(function(){

var FNV = function () {
  this.offset_basis = 2166136261;    // The prime, 32 bit offset_basis = 2,166,136,261 = 0x811C9DC5.    
};

$$SHORTCODE$$.FNV = FNV;

FNV.prototype.fnv_1 = function ( data ) {
    
   var hashint = this.offset_basis;

  for ( var i = 0; i < data.length; i++ ) {
    hashint += (hashint << 1) + (hashint << 4) + (hashint << 7) + (hashint << 8) + (hashint << 24);
    hashint = hashint ^ data.charCodeAt(i);
  }

  return hashint >>> 0;    // unsigned 32 bit integer.

};


FNV.prototype.fnv_1a = function ( data ) {

  var hashint = this.offset_basis;

  for ( var i = 0; i < data.length; i++ ) {
    hashint = hashint ^ data.charCodeAt(i);
    hashint += (hashint << 1) + (hashint << 4) + (hashint << 7) + (hashint << 8) + (hashint << 24);
  }

  return hashint >>> 0;    // unsigned 32 bit integer.

}

})();
