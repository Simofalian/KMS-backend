const catchAsync = require("./../Utils/catchAsync");
const Todo = require("./../models/todoModel");
exports.createTodoItem = catchAsync(async (req, res, next) => {
  const { itemName, date, user, finished } = req.body;
  const todo = await Todo.findOne({ itemName });

  if (todo && todo.finished === false && todo.user === user) {
    errors.todo = "You have not finished the previous task";
    return next();
  }

  const newTodo = new Todo({ itemName, date, user, finished });

  await newTodo
    .save()
    .then((todo) => res.status(200).json(todo))
    .catch((err) => res.json(err));
});

exports.getAllTodos = catchAsync(async (req, res, next) => {
  await Todo.find()
    .populate("user", ["name"])
    .then((todo) => {
      res.status(200).json(todo);
    })
    .catch((err) => console.log(err));
});
