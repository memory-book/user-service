const UserService = require("../services/user-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new UserService();

  app.post("/signup", async (req, res, next) => {
    try {
      const { email, password, phone } = req.body;
      const data = await service.SignUp({ email, password, phone });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await service.SignIn({ email, password });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });


  app.get("/profile", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const data = await service.GetProfile({ _id });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });


  app.get("/whoami", (req, res, next) => {
    return res.status(200).json({ msg: "/user : I am User Service" });
  });
};
