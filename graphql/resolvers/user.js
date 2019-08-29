const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const {
  transformEvent,
  events,
  user,
  transformBooking,
  singleEvent
} = require("./merge");

module.exports = {
  createUser: async args => {
    try {
      const user = await User.findOne({ email: args.userInput.email });
      if (user) {
        throw new Error("Already exist one");
      }
      const hashedPassword = await bcryptjs.hash(args.userInput.password, 12);
      const userCreated = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const result = await userCreated.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (error) {
      throw error;
    }
  },
  login: async (args) => {
    const { email, password } = args;
    const user = await User.findOne({ email: email });
    if (!user) throw Error("user doesn't found");
    const isQual = await bcryptjs.compare(password, user.password);

    if (!isQual) throw Error("password doesn't match");
    const token = await jwt.sign(
      { userId: user.id, email: email },
      "somesuperlkeyapijson",
      { expiresIn: "1h" }
    );   
    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1
    };
  }
};
