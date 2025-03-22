const router = require('express').Router();
const { User } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const response = await User.find({});
    res.send(response)
  }
  catch (err) {
    console.log(err)
  }

}) 

router.post('/signup', async (req, res) => {
  const {username, email, password} = req.body

  try {

    const submittedUser = await User.findOne({
      username: username
    })

    if(submittedUser) {
      return res.send("Username already in system, please try again")
    }

    const user = await User.create({
      username: username,
      email: email,
      password: password
    })

    if(!user) {
      return res.send("User not created")
    }

    res.send(user)



    // const user = await User.create({
    //   username: username,
    //   email: email,
    //   password: password
    // })



    // if (!user.length) {
    //   res.status(404).json({message: "User not created"})
    // }

    // res.status(404).json({user})


  }
  catch (err) {
    console.log(err)
  }
})

router.post('/login', (req, res) => {

  res.send(req.body)
})

module.exports = router