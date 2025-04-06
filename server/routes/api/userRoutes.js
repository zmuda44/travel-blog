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

  try {
    if (!req.user) {
      return res.status(401).send({ error: 'Authentication required' });
    }

    // Find the user by the ID that is decoded from the JWT token
    const user = await User.findById(req.user._id).populate('trips').populate('following');

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

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
      return res.send({message: "Username already in system, please try again"})
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

    res.send({ user, token })

    // if (!user.length) {
    //   res.status(404).json({message: "User not created"})
    // }

    // res.status(404).json({user})
  }
  catch (err) {
    console.log(err)
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.send({message: "No user found with the username"})
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      return res.send({"message": "Incorrect Password entered"})
    }

    const token = signToken(user);

    res.send({ user, token })
  }
  catch (err) {
    console.log(err)
  }
})

// Get route to retrieve an individual user by id
// api/users/:id

router.get('/:id', async (req, res) => {
  const id = req.params.id

  const user = await User.findById(id).select("-password").populate("trips")

  if(!user) {
    res.send({ message: "No profile for this user"})
  }

  res.send(user)
  
})

// Post route to follow a user
// api/users/:id/follow

router.post('/:id/follow', authMiddleware, async (req, res) => {
  const id = req.params.id
  const myId = req.user._id

  if(!myId) {
    res.send({ message: "login to follow user" })
  }

  if (id === myId.toString()) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }
 
  const me = await User.findById(myId).select("-password")
  const user = await User.findById(id).select("-password")

  if (!user) {
    res.send({ message: "no user found to follow"})
  }

  if (me.following.includes(user._id)) {
    return res.status(400).json({ message: "You are already following this user" });
  }

  me.following.push(user._id);
  await me.save();
  
  res.send(me)
})

//Delete request to delete follower from user's array

router.delete('/:id/unfollow', authMiddleware, async (req, res) => {

  const id = req.params.id
  const myId = req.user._id

  if(!myId) {
    res.send({ message: "login to follow user" })
  }

  if (id === myId.toString()) {
    return res.status(400).json({ message: "You cannot unfollow yourself" });
  }
 
  const me = await User.findById(myId).select("-password")
  const user = await User.findById(id).select("-password")

  if (!user) {
    res.send({ message: "no user found to unfollow"})
  }

  if (me.following.includes(user._id)) {
    me.following.pull(user._id);
    await me.save(); 
  }
  else {
    return res.send({ message: "you are not following this user"})
  }

  res.send(me)
})

module.exports = router