const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require('../models/middleware/fetchuser');
const JWT_SECRET = 'Harryisagoodb$oy';
//route 1 create a user using post: "/api/auth/". dosen't require auth

  router.post('/createuser', [
body('name' ,'enter a valid name').isLength({min: 5 }),
body('email','enter a valid email' ).isEmail(),
body('password').isLength({min: 5 })

], async (req, res)=>{
  let success=false
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

//check whether the user email exist
try{
   let user = await User.findOne({email: req.body.email});
   if(user){
    return res.status(400).json({success,error: "sorry user with this email already exist"})
   }
   const salt = await bcrypt.genSalt(10);
   secPass = await bcrypt.hash(req.body.password, salt);
   //create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,

    });
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
  
    // res.json(user)
    success=true;
    res.json({success,authtoken})
  }
      catch(error){
        console.error(error.message);
        res.status(500).send("some error occured");
      }
})
      // route 2 authenticate a user using post "api/auth/login"
   router.post('/login', [
    body('email','enter a valid email' ).isEmail(),
    body('password',' Password cannot be blank').exists(),
  ], async (req, res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password}=req.body;
    try{
    let user = await User.findOne({email});
     if(!user){
      return res.status(400).json({error: "please try to login with correct credentials"});
     }
     const passwordCompare = await bcrypt.compare(password, user.password);
     if(!passwordCompare){
      success=false
    return res.status(400).json({success,error: "please try to login with correct credentials"});
     }
     
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success, authtoken})

    }
    catch(error){
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  });

// //  route 3 get loggid in user details  using post "api/auth/getuser".login required.
router.post('/getuser',fetchuser, async (req, res)=>{
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.message);
      res.status(500).send("some error occured");
    }
})

module.exports=router