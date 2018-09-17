module.exports = function once(fn) {
    let done = false
    return function (req, res, next) {
      if (done) {
        next()
        return
      }
  
      fn(req, res, next)
      done = true;
    }
}