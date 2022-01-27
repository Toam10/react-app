const express = require("express");
const rootRouter = express.Router();
const userController = require("../controllers/user.controller");

rootRouter.get("/", userController.find);
rootRouter.post("/", userController.create);
rootRouter.get("/:id", userController.getOne);

rootRouter.delete("/:id", userController.deleteOne);

rootRouter.patch("/:id", userController.edit);

// user1 credit -> user1 cash
// all actions not in convention are post
rootRouter.post(":id/withdraw", userController.withdraw);
//user1 -> user2
rootRouter.put("/transfer", userController.transfer);

module.exports = rootRouter;
