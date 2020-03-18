import express from "express";
import UserController from "../controllers/users";

const router = express.Router();

/* GET users listing. */
router.get("/fetch", async (req, res, next) => {
  const result = await UserController.fetchUsers();
  res.json(result);
});
router.get("/find/byId", async (req, res, next) => {
  const { userId } = req.query;
  if (userId) {
    const result = await UserController.fetchUser(req.query);
    res.json(result);
  } else {
    res.json({
      success: false,
      data: "Missing user id"
    });
  }
});

router.post("/create", async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    email,
    password,
    street,
    city,
    state,
    zip,
    phone
  } = req.body;
  if (
    firstName &&
    lastName &&
    age &&
    email &&
    password &&
    street &&
    city &&
    state &&
    zip &&
    phone
  ) {
    try {
      const result = await UserController.createUser({
        ...req.body,
        address: { street, city, zip, state }
      });
      res.json({
        success: Boolean(result),
        data: result
      });
    } catch (error) {
      res.json({
        success: false,
        data: error.message
      });
    }
  } else {
    res.json({
      success: false,
      data: "You need to supply all the information necessary to create a user!"
    });
  }
});

router.post("/friends/add", async (req, res) => {
  const { userId, friendId } = req.body;
  if (userId && friendId) {
    try {
      const result = await UserController.createFriendship(req.body);
      res.json({
        success: result.success,
        data: result.data
      });
    } catch (error) {
      res.json({
        success: false,
        data: error.message
      });
    }
  } else {
    res.json({
      success: false,
      data: "A user ID and friend ID is necessary to create a friendship"
    });
  }
});

router.post("/friends/remove", async (req, res) => {
  const { userId, friendId } = req.body;
  if (userId && friendId) {
    try {
      const result = await UserController.removeFriendship(req.body);
      res.json(result);
    } catch (error) {
      res.json({
        success: false,
        data: error.message
      });
    }
  } else {
    res.json({
      success: false,
      data: "A user ID and friend ID is necessary to create a friendship"
    });
  }
});

router.get("/friends/byId", async (req, res) => {
  const { userId } = req.query;
  if (userId) {
    const result = await UserController.findFriendsByUserId(req.query);
    res.json(result);
  } else {
    res.json({
      success: false,
      data: "A user ID is necessary to find friends"
    });
  }
});
router.get("/strangers/byId", async (req, res) => {
  const { userId } = req.query;
  if (userId) {
    const result = await UserController.findStrangersByUserId(req.query);
    res.json(result);
  } else {
    res.json({
      success: false,
      data: "A user ID is necessary to find strangers"
    });
  }
});

router.get("/search/byUser", async (req, res) => {
  const { query, userId } = req.query;
  if (userId) {
    const result = await UserController.searchUsersByUserId(req.query);
    res.json(result);
  } else {
    res.json({
      success: false,
      data: "A user ID is necessary to search friends"
    });
  }
});

router.post("/update/:field/:value", async (req, res) => {
  const { field, value } = req.params;
  const { userId } = req.query;
  if (userId) {
    const result = await UserController.handleProfileChange({
      field,
      value,
      userId
    });
    res.json(result);
  } else {
    res.json({
      success: false,
      data: "User id is not provided"
    });
  }
});

export default router;
