const userService = require("../services/user.service");

const create = async (req, res) => {
  const userDto = req.body;

  try {
    if (!userDto.pasportId) {
      throw new Error("pasportId is required");
    }
    const user = await userService.create(userDto);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const find = async (req, res) => {
  try {
    const cash = req.query.cash || 0;
    const isActive = req.query.isActive || { $in: [false, true] };
    const filter = {
      cash,
      isActive,
    };
    const usersList = await userService.find(filter);
    res.status(200).send(usersList);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userService.userById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteOne = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userService.deleteById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const edit = async (req, res) => {
  const pasportId = req.params.id;
  const userDto = req.body;
  try {
    const user = await userService.edit(pasportId, userDto);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const withdraw = async (req, res) => {
  const id = req.params.id;
  const { withdrawSum } = req.body;
  try {
    const user = await userService.handleWithdraw(id, withdrawSum);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const transfer = async (req, res) => {
  const { idFrom, idTo, transferSum } = req.body;
  try {
    const users = await userService.handleTransfer(idFrom, idTo, transferSum);
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  create,
  find,
  getOne,
  deleteOne,
  edit,
  withdraw,
  transfer,
};
