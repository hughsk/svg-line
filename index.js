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
