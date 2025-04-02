const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config({path: "../../env"});

const registerUser = async(req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if(!first_name || !last_name || !email || !password) {
        return res.status(400).json({error: "All fields are required"});
    }

    try {
        const existingUser = await User.getUserByEmail(email);

        if(existingUser.email) {
            return res.status(400).json({error: "User already exists"});
        }

        await User.createUser(first_name, last_name, email, password, "student");
        res.status(200).json({message: "User registered sucessfully"});
    } catch(error) {
        console.log("Error registering user");
        res.status(500).json({error: error});
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.getUserByEmail(email);
      if(!user) {
        return res.status(401).json({error: "Invalid credentials"});
      }

      const isSame = await bcrypt.compare(password, user.password);
      if(!isSame) {
        return res.status(401).json({error: "Invalid credentials"});
      }

      const token = jwt.sign({ id: user.id, type: user.type }, process.env.JWT_SECRET, { expiresIn: "2h" });

      res.json({ token, user: { id: user.id, first_name: user.first_name, last_name: user.last_name } });
      
    } catch(error) {
        res.status(500).json({error: "Server error"});
    }
  };

module.exports = { registerUser, loginUser };