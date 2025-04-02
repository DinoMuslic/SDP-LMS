const User = require("../models/user_model");

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

module.exports = { registerUser };