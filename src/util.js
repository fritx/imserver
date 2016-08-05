const { isError } = require('util')

module.exports = {
  toObj,
}

function toObj (v) {
  if (isError(v)) {
    const obj = {}
    ;['name', 'message', 'stack'].forEach(k => {
      obj[k] = v[k]
    })
    return obj
  }
  return v
}
