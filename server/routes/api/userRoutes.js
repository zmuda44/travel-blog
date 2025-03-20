const router = require('express').Router();
const { User } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const response = await User.find({});

    console.log(response)

    res.send(response)
  }
  catch (err) {
    res.send(err)
  }
}) 

module.exports = router