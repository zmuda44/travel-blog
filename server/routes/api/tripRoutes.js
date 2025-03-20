const router = require('express').Router();

router.get('/triptest', (req, res) => {
  res.send('trip test')
})

module.exports = router