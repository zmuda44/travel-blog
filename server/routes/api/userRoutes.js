const router = require('express').Router();

router.get('/userstest', (req, res) => {
  res.send("userstest")
}) 

module.exports = router