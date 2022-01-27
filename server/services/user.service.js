const User = require("../models/user.model");
const userUtils = require("./utils");

const find = async (filter) => {
  try {
    const users = await User.find({
      cash: { $gte: filter.cash },
      isActive: filter.isActive,
    }).exec();
    if (users.length < 1) {
      throw new Error("No users with matching title");
    }
    return users;
  } catch {
    throw new Error("Couldn't get all users from mongo");
  }
};

const create = async (userDto) => {
  const user = await User.create(userDto);
  return user;
};

const userById = async (id) => {
  const user = await User.find({ pasportId: id }).exec();
  if (!user) {
    throw new Error(`There is no user with id ${id}`);
  }
  return user;
};

const deleteById = async (id) => {
  const user = await User.findOneAndDelete({ pasportId: id }).exec();
  if (!user) {
    throw new Error(`There is no user with id ${id}`);
  }
  return user;
};

const edit = async (pasportId, userDto) => {
  const userToEdit = await User.findOneAndUpdate(
    { pasportId: pasportId },
    userDto,
    { new: true }
  );
  if (!userToEdit) {
    throw new Error(`The user with id ${id} is not found`);
  }
  return userToEdit;
};

const handleCashIncrease = async (id, cash) => {
  const userToEdit = await User.findOneAndUpdate(
    { pasportId: id },
    { $inc: { cash: cash } },
    { new: true }
  );
  if (!userToEdit) {
    throw new Error(`The user with id ${id} is not found`);
  }
  return userToEdit;
};

const handleWithdraw = async (id, withdrawSum) => {
  const user = await User.findOne({ pasportId: id });

  if (!user) {
    throw new Error(`The user with id ${id} is not found`);
  }
  if (!userUtils.checkWithdrawLimit(withdrawSum, user)) {
    throw new Error(`The withdraw ${withdrawSum} is more than user has`);
  }

  if (userUtils.checkCashLimit(withdrawSum, user)) {
    const userToWithdraw = await User.findOneAndUpdate(
      { pasportId: id },
      { $inc: { cash: withdrawSum * -1 } },
      { new: true }
    );
    return userToWithdraw;
  } else {
    const newCreditAmount = userUtils.getNewCredit(withdrawSum, user);
    const userToWithdraw = await User.findOneAndUpdate(
      { pasportId: id },
      { $set: { cash: 0, credit: newCreditAmount } },
      { new: true }
    );
    return userToWithdraw;
  }
};

const handleTransfer = async (idFrom, idTo, transfer) => {
  try {
    const userFrom = await handleWithdraw(idFrom, transfer);
    const userTo = await handleCashIncrease(idTo, transfer);
    return [userFrom, userTo];
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  find,
  userById,
  deleteById,
  create,
  edit,
  handleCashIncrease,
  handleWithdraw,
  handleTransfer,
};
