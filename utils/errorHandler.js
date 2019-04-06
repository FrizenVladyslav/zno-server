module.exports = function (e, res) {
  if (e.name && e.name === 'ValidationError') {
    res.status(400).json({
      message: e.message
    })
  } else {
    res.status(500).json({
      message: e.message || e
    })
  }
}