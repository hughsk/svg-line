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
