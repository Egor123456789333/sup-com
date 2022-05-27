const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, unique: false },
  role: { type: DataTypes.STRING, unique: false, defaultValue: "USER" },
});

const Test = sequelize.define("test", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  chapter: { type: DataTypes.INTEGER, unique: true },
  chapterName: { type: DataTypes.TEXT, unique: true },
});

const QuestionTest = sequelize.define("question_test", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  questionText: { type: DataTypes.STRING, unique: false },
  position: { type: DataTypes.INTEGER },
  type: { type: DataTypes.STRING, unique: false },
  typeRu: { type: DataTypes.STRING, unique: false },
});

const QuestionAnswer = sequelize.define("question_answer", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  text: { type: DataTypes.STRING, unique: false },
  rigth: { type: DataTypes.BOOLEAN, unique: false },
});

const OnelineAnswer = sequelize.define("one_line", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, unique: false },
  answerText: { type: DataTypes.STRING, unique: false },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketCourse = sequelize.define("basket_course", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Course = sequelize.define("course", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Author = sequelize.define("author", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Theory = sequelize.define("theory", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  chapterNum: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
});

const MPITheory = sequelize.define("mpi", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  text: { type: DataTypes.TEXT, unique: true, allowNull: false },
});

const OpenMPTheory = sequelize.define("openMp", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  text: { type: DataTypes.TEXT, unique: true, allowNull: false },
});

const ResultsTest = sequelize.define("result", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  testId: { type: DataTypes.INTEGER },
  rigthAnswers: { type: DataTypes.REAL },
});

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketCourse);
BasketCourse.belongsTo(Basket);

Course.hasMany(BasketCourse);
BasketCourse.belongsTo(Course);

Author.hasMany(Course, { as: "authorInfo" });
Course.belongsTo(Author);

Test.hasMany(QuestionTest, { onDelete: "cascade" });
QuestionTest.belongsTo(Test, { onDelete: "cascade" });

QuestionTest.hasMany(QuestionAnswer, { onDelete: "cascade" });
QuestionAnswer.belongsTo(QuestionTest, { onDelete: "cascade" });

QuestionTest.hasMany(OnelineAnswer, { onDelete: "cascade" });
OnelineAnswer.belongsTo(QuestionTest, { onDelete: "cascade" });

User.hasMany(ResultsTest, { onDelete: "cascade" });
ResultsTest.belongsTo(User);

module.exports = {
  User,
  Basket,
  BasketCourse,
  Course,
  Author,
  Test,
  QuestionTest,
  QuestionAnswer,
  MPITheory,
  OpenMPTheory,
  Theory,
  ResultsTest,
  OnelineAnswer,
};
