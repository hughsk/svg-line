# svg-line [![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=hughskennedy&url=http://github.com/hughsk/svg-line&title=svg-line&description=hughsk/svg-line%20on%20GitHub&language=en_GB&tags=flattr,github,javascript&category=software)[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Generate SVG paths for a line, d3-style.

## Usage ##

[![svg-line](https://nodei.co/npm/svg-line.png?mini=true)](https://nodei.co/npm/svg-line)

### line = svgLine() ###

Creates a new line generator.

### line(points) ###

Given an array of points, return an SVG path string that you can then use
when setting a `<path>`'s `d` attribute.

By default, each point is assumed to be an object with an `x` and a `y`
coordinate, e.g. to create a 1x1 square:

``` javascript
var line = require('svg-line')()
var svg = 'http://www.w3.org/2000/svg'
var d = line([
    { x: 0, y: 0 }
  , { x: 1, y: 0 }
  , { x: 1, y: 1 }
  , { x: 0, y: 1 }
])

var square = document.createElementNS(svg, 'path')

square.setAttribute('d', d)
```

### line.x(getX) ###

Pass in a new function responsible for getting a point's x coordinate from a
single element in the array.

The function is passed `(d, i)`, where `d` is the element and `i` is its index
in the array.

For example:

``` javascript
var svg  = 'http://www.w3.org/2000/svg'
var line = require('svg-line')()
  .x(function(d) { return d[0] })
  .y(function(d) { return d[1] })

var d = line([
    [0, 0]
  , [1, 0]
  , [1, 1]
  , [0, 1]
])

var square = document.createElementNS(svg, 'path')

square.setAttribute('d', d)
```

### line.y(getY) ###

Much like `line.x`, pass in a new function responsible for getting a point's y
corrdinate from a single element in the array.

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/svg-line/blob/master/LICENSE.md) for details.
