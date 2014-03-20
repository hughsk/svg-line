var test = require('tape')
var line = require('./')

test('svg-line', function(t) {
  t.plan(1)
  t.equal(line()([
      { x: 0, y: 0 }
    , { x: 1, y: 0 }
    , { x: 1, y: 1 }
    , { x: 0, y: 1 }
  ]), 'M0,0L1,0L1,1L0,1')
})

test('custom accessors', function(t) {
  t.plan(1)
  t.equal(line()
    .x(function(d) { return d[0] })
    .y(function(d) { return d[1] })([
      [0, 0]
    , [1, 0]
    , [1, 1]
    , [0, 1]
  ]), 'M0,0L1,0L1,1L0,1')
})
