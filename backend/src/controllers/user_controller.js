const User = require("../models/user_model");

const getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    const user = await User.getUserByEmail(email);
    if (user[0]) {
      return res.status(400).json({ error: "User already exists" });
    }

    const result = await User.addUser(
      first_name,
      last_name,
      email,
      password,
      role
    );
    res.status(201).json(result);
  } catch (error) {
    console.log("Error adding user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await User.updateUser(req.params.id, req.body);
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteUser(req.params.id);
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { getUsers, getUser, addUser, updateUser, deleteUser };