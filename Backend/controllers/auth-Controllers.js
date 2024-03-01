const User = require("../model/user-Model");

const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("welcome to home page using controller");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Registration Logic
const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Password and Confirm Password do not match" });
    }

    //Check if the email already exists in the database
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "EMAIL ALREADY EXISTS" });
    }
    const saltRounds = 10;
    const hash_password = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const userCreated = await User.create({
      name,
      email,
      password: hash_password,
    });

    res.status(201).json({
      msg: "Registarion Successfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    // next(error)
  }
};

// User Login  Logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    console.log(userExist);
    if (!userExist) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (isPasswordValid) {
      res.status(200).json({
        msg: "Login successfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email and password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    // next(error)
  }
};

// *-------------------
// To send user data - User Logic
// *-------------------

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

//UPDATE PASSWORD

const updateSettings = async (req, res) => {
  try {
    const userData = req.user;

    const { name, oldPassword, newPassword } = req.body;

    const user = await User.findById(userData._id);
    console.log("userData._id:", userData._id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (oldPassword && newPassword) {
      const passCompare = await bcrypt.compare(oldPassword, user.password);

      if (!passCompare) {
        return res.status(401).json({
          error: "Incorrect old password",
        });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (name) {
      user.name = name;
    }

    await user.save();

    res.status(200).json({
      message: "User details updated successfully",
      User_Name: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { home, register, login, user, updateSettings };
