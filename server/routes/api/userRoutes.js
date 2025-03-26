const router = require('express').Router();
const { User } = require('../../models');
const { signToken, AuthenticationError, authMiddleware } = require("../../utils/auth");


router.get('/', async (req, res) => {
  try {
    const response = await User.find({});
    res.send(response)
  }
  catch (err) {
    console.log(err)
  }

}) 

router.get('/me/', authMiddleware, async (req, res) => {
  console.log('route hit')
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'Authentication required' });
    }

    // Find the user by the ID that is decoded from the JWT token
    const user = await User.findById(req.user._id).populate('trips');

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    console.log(user)

    // Return the user data
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
});

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

   

    const token = signToken(user);

    if(!user) {
      return res.send("User not created")
    }

    console.log(token)

    res.send({ user, token })



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