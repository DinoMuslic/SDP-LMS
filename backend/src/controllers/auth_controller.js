const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config({path: "../../env"});

const register = async(req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if(!first_name || !last_name || !email || !password) {
        return res.status(400).json({error: "All fields are required"});
    }

    try {
        const user = await User.getUserByEmail(email); // ovo uvijek vraca array cak iako je uvijek 1 element u sustini

        if(user[0]) {
            return res.status(400).json({error: "User already exists"});
        }

        await User.createUser(first_name, last_name, email, password);
        res.status(200).json({message: "User registered sucessfully"});
    } catch(error) {
        console.log("Error registering user");
        res.status(500).json({error: error});
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.getUserByEmail(email);
      if(!user[0]) {
        return res.status(401).json({error: "Invalid credentials"});
      }

      const isSame = await bcrypt.compare(password, user[0].password);
      if(!isSame) {
        return res.status(401).json({error: "Invalid credentials"});
      }

      const token = jwt.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: "2h" });

      res.json({ user: { id: user[0].id, first_name: user[0].first_name, last_name: user[0].last_name, mail: user[0].email, role: user[0].role, token: token }});
      
    } catch(error) {
        res.status(500).json({error: error});
    }
  };

module.exports = { register, login };