const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actorController");

router.get("/", function (req, res) {
  res.render("actors/index");
});

// 1. 배우 리스트 (이름,나이,커리어) 라우터
router.get("/alllist", actorController.getActor);
// 2. 남자 배우 리스트 (이름,나이,커리어) 라우터
router.get("/manlist", actorController.getManActor);
// 3. 여자 배우 리스트 (이름,나이,커리어) 라우터
router.get("/womanlist", actorController.getWomanActor);
//4. 같은 드라마 || 같은 영화 || 같은 뮤지컬 나온 배우들 라우터
router.get("/titlelist", actorController.getTitle);
//  5. 카테고리 영화 컨트롤러 라우터
router.get("/movie", actorController.getMovie);
//  6. 카테고리 드라마 컨트롤러 라우터
router.get("/drama", actorController.getDrama);

module.exports = router;
