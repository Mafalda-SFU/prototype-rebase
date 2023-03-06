#!/usr/bin/env node

import assert from 'node:assert'
import test from 'node:test'

import prototypeRebase from './index.js'


function Layer1() {}
Layer1.prototype.foo = function() {
  console.log("foo!");
};

function Layer2() {
  Layer1.call(this);
}
Layer2.prototype = Object.create(Layer1.prototype);
Layer2.prototype.constructor = Layer2;

Layer2.prototype.bar = function() {
  console.log("bar!");
};

function Layer0() {}
Layer0.prototype.blat = function() {
  console.log("blat!");
};


test('prototypes', function(t)
{
  var t = prototypeRebase(Layer2.prototype, Layer0.prototype);
  var o = Object.create(t);

  o.blat();
})


class A{}
class B extends A{}

class C extends B{}
class D extends C{}

class E extends B{}
class F extends E{}

test('classes', function(t)
{
  assert(!(F instanceof D))

  const F1 = prototypeRebase(F, D)
  console.log(typeof F1, F1)
  const f1 = new F1()
  console.log(F1, f1)
  console.log(F1.prototype)
  console.log(F1.prototype.__proto__)

  assert(F1 instanceof D)
})
