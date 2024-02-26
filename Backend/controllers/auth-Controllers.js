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
    // console.log(req.body);
    const { name, email, password, confirmPassword } = req.body;

  // Check if the password and confirm password match
  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Password and Confirm Password do not match" });
  }


    //Check if the email already exists in the database
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "EMAIL ALREADY EXISTS" });
    }
    const saltRounds = 10;
    const hash_password = await bcrypt.hash(password, saltRounds);
    // const hash_confirmpassword = await bcrypt.hash(confirmpassword, saltRounds);
    // Create a new user
    const userCreated = await User.create({
      name,
      email,
      password: hash_password,
      // confirmpassword: hash_confirmpassword,
    });

    res.status(201).json({
      msg: "Registarion Successfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
        res
        .status(200)
        .json({
          msg: "Login successfull",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      }else{
        res.status(401).json({message:"Invalid email and password"})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

// *-------------------
// To send user data - User Logic
// *-------------------

  const user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({  userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };


  const updateSettings = async (req, res) => {
    try {
      const { email, oldPassword, newPassword, newName } = req.body;
  
      // Validate old password and retrieve user
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
        return res.status(401).json({ error: "Incorrect old password or user not found" });
      }
  
      // Update name if provided
      if (newName) {
        user.name = newName;
      }
  
      // Update password
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
  
      res.status(200).json({ success: true, msg: "Settings updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  


module.exports = { home, register, login, updateSettings };
