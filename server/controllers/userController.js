const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role, name, surname) => {
  return jwt.sign({ id, email, role, name, surname }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role, name, surname } = req.body;

    if (!email || !password || !name || !surname) {
      return next(ApiError.badRequest("Введены не все данные"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("Этот email уже используется"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      role,
      password: hashPassword,
      name,
      surname,
    });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(
      user.id,
      user.email,
      user.role,
      user.name,
      user.surname
    );
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("Пользователь не найден"));
    }
    let comparePasswor = bcrypt.compareSync(password, user.password);
    if (!comparePasswor) {
      return next(ApiError.internal("Указан неверный пароль"));
    }
    const token = generateJwt(
      user.id,
      user.email,
      user.role,
      user.name,
      user.surname
    );
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(
      req.user.id,
      req.user.email,
      req.user.role,
      req.user.name,
      req.user.surname
    );
    console.log(req.user);
    return res.json({ token });
  }

  async changeName(req, res, next) {
    try {
      const { name, email } = req.body;

      const user = await User.findOne({ where: { email } });
      user.update({ name });
      const token = generateJwt(
        user.id,
        user.email,
        user.role,
        user.name,
        user.surname
      );
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async changeSurname(req, res, next) {
    try {
      const { surname, email } = req.body;
      const user = await User.findOne({ where: { email } });
      user.update({ surname });
      const token = generateJwt(
        user.id,
        user.email,
        user.role,
        user.name,
        user.surname
      );
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new UserController();
