const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// 유저 전부 가져오기를 하는 라우터
router.get("/", itemController.getItems);

// 해당 하는 유저 가져오기를 하는 라우터
router.get("/detail/:id", itemController.getIdItem);

// 가장 비싼 물건 가져오기를 하는 라우터
router.get("/maxitem", itemController.getItemMax);

module.exports = router;
