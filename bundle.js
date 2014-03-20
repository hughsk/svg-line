(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var svgLine = require('./')
var ns      = 'http://www.w3.org/2000/svg'
var tau     = Math.PI * 2
var svg     = document.createElementNS(ns, 'svg')
var line    = document.createElementNS(ns, 'path')
var points  = []
var path    = svgLine()
  .x(function(d) { return d.x })
  .y(function(d) { return d.y })

var sides = 10
var t = 0
for (var i = 0; i < sides; i++) {
  points.push({ x: 0, y: 0 })
}

tick()
function tick() {
  t += 1

  var angle  = t * 0.05
  var inner  = 60 + Math.sin(t * 0.0925) * 45
  var outer  = 60
  var origin = 200

  for (var i = 0; i < sides; i++) {
    var radius  = i % 2 ? inner : outer
    points[i].x = origin + Math.cos(angle + i / sides * tau) * radius
    points[i].y = origin + Math.sin(angle + i / sides * tau) * radius
  }

  line.setAttribute('d', path(points))
  setTimeout(tick, 1000 / 60)
}

line.setAttribute('fill', '#FBBF60')
svg.appendChild(line)
document.body.appendChild(svg)
document.body.style.backgroundColor = '#654881'

},{"./":2}],2:[function(require,module,exports){
var pluck = require('plucker')

module.exports = createLine

function createLine() {
  var x = pluck('x')
  var y = pluck('y')

  line.x = updateX
  line.y = updateY

  return line

  function line(data) {
    var d = []

    d.push('M'
      , x(data[0], 0)
      , ','
      , y(data[0], 0)
    )

    for (var i = 1; i < data.length; i++) {
      d.push('L'
        , x(data[i], i)
        , ','
        , y(data[i], i)
      )
    }

    return d.join('')
  }


  function updateX(_x) {
    if (!arguments.length) return x
    x = functor(_x)
    return line
  }

  function updateY(_y) {
    if (!arguments.length) return y
    y = functor(_y)
    return line
  }
}

function functor(value) {
  return typeof value !== 'function'
    ? function() { return value }
    : value
}

},{"plucker":3}],3:[function(require,module,exports){
module.exports = plucker

function plucker(path, object) {
  return arguments.length >= 2
    ? pluck(path)(object)
    : pluck(path)
}

function pluck(path) {
  path = typeof path === 'string'
    ? String(path).trim().split('.')
    : path

  if (path.length < 2) {
    path = path[0]
    return pluckSingle
  } else {
    var l = path.length
    return pluckPath
  }

  function pluckSingle(object) {
    return object[path]
  }

  function pluckPath(object) {
    for (var i = 0; i < l; i++) {
      if (typeof object === 'undefined') break

      object = object[path[i]]
    }

    return object
  }
}

},{}]},{},[1])