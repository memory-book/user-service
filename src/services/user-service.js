const { UserRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} = require("../utils");
const {
  NotFoundError,
  ValidationError,
} = require("../utils/errors/app-errors");

// All Business logic will be here
class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    const existingUser = await this.repository.FindUser({ email });

    if (!existingUser)
      throw new NotFoundError("user not found with provided email id!");

    const validPassword = await ValidatePassword(
      password,
      existingUser.password,
      existingUser.salt
    );
    if (!validPassword) throw new ValidationError("password does not match!");

    const token = await GenerateSignature({
      email: existingUser.email,
      _id: existingUser._id,
    });

    return { id: existingUser._id, token };
  }

  async SignUp(userInputs) {
    const { email, password, phone } = userInputs;

    // create salt
    let salt = await GenerateSalt();

    let userPassword = await GeneratePassword(password, salt);

    const existingUser = await this.repository.CreateUser({
      email,
      password: userPassword,
      phone,
      salt,
    });

    const token = await GenerateSignature({
      email: email,
      _id: existingUser._id,
    });
    return { id: existingUser._id, token };
  }


  async GetProfile(id) {
    return this.repository.FindUserById({ id });
  }

}

module.exports = UserService;
