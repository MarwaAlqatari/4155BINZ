const User = require("../models/user");
const UserSchema = require("../db/userSchema");

const getUsers = async () => {
  const users = await UserSchema.find().exec();
  return users.map(
    u =>
      new User(
        u.id,
        u.email,
        u.password
      )
  ); 
};

const getUser = async id => {
  //id is parameter
  const user = await UserSchema.findById(id).exec();
  return user;
};

const addUser = async user => {
  const insertedUser = await UserSchema.create({
    email: user.email,
    password: user.password
  });

  return new User(
    insertedUser.id,
    insertedUser.email,
    insertedUser.password
  ); //convert from doc type to listing type
};

const putUser = async (id, user) => {
  //id is parameter
  const updatedUser = await UserSchema.findByIdAndUpdate(
    id,
    user
  ).exec();
  return updatedUser;
};

const removeUser = async id => {
  await UserSchema.findByIdAndDelete(id).exec();
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  removeUser,
  putUser
};
