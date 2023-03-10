const { APIError } = require("../../utils/errors/app-errors");
const { UserModel } = require("../models");

//Dealing with data base operations
class UserRepository {
  async CreateUser({ email, password, phone, salt }) {
    const user = new UserModel({
      email,
      password,
      salt,
      phone,
    });

    const userResult = await user.save();
    return userResult;
  }


  async FindUser({ email }) {
    const existingUser = await UserModel.findOne({ email: email });
    return existingUser;
  }

  async FindUserById({ id }) {
    const existingUser = await UserModel.findById(id)
    return existingUser;
  }

  async DeleteUserById(id) {
    return UserModel.findByIdAndDelete(id);
  }
}

module.exports = UserRepository;
