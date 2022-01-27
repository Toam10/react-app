const checkWithdrawLimit = (withdrawSum, user) => {
  return user.cash + user.credit >= withdrawSum;
};

const checkCashLimit = (withdrawSum, user) => {
  return user.cash >= withdrawSum;
};

const getNewCredit = (withdrawSum, user) => {
  return user.cash + user.credit - withdrawSum;
};

module.exports = { checkWithdrawLimit, checkCashLimit, getNewCredit };
