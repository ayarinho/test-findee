
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors');
const UserModel= require('../models/user.model')


const maxAge = 3 * 24 * 60 * 60 * 1000;


const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
      expiresIn: maxAge
    })
  };
  
  module.exports.signUp = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await UserModel.create({ email, password });
      res.status(201).json({ user: user});
    }
    catch(err) {
      const errors = signUpErrors(err);
      res.status(200).send({ errors })
    }
  }


  module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
  
    try {
      const user = await UserModel.login(email, password);
      const token = createToken(user._id);
      res.status(200).json({ user: token})
    } catch (err){
      const errors = signInErrors(err);
      res.status(200).json({ errors });
    }
  }
  

  module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find();
    res.status(200).json(users);
  };
