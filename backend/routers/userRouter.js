import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.remove({}); // remove all users to prevent duplicate
    const usersPopulated = await User.insertMany(data.users);
    res.send({ usersPopulated });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      } else {
        return res.status(401).send({ message: "Password is not correct." });
      }
    } else {
      return res
        .status(401)
        .send({ message: `No email with ${req.body.email} has been found.` });
    }
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(401).send({
        message:
          "There is an existing account associated with this email address.",
      });
    } else if (req.body.password.length < 6) {
      return res.status(401).send({
        message: "Passwords must consist of at least 6 characters.",
      });
    } else if (req.body.password !== req.body.confirmPassword) {
      return res.status(401).send({
        message: "Passwords do not match.",
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      const userCreated = newUser.save();
      return res.send({
        _id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        isAdmin: userCreated.isAdmin,
        token: generateToken(userCreated),
      });
    }
  })
);

userRouter.put(
  "/security",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).send({ message: `No user has been found.` });
    } else {
      switch (req.body.field) {
        case "name":
          user.name = req.body.updateValue;
          break;
        case "email":
          user.email = req.body.updateValue;
          break;
        case "mobile":
          user.mobile = req.body.updateValue;
          break;
        case "password":
          user.password = bcrypt.hashSync(req.body.updateValue, 8);
          break;
        default:
          user;
      }

      const updatedUser = await user.save();
      return res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

export default userRouter;
