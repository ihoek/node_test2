const itemModel = require("../models/itemModel");

//전체 리스트 가져오기 컨트롤러
const getItems = (req, res) => {
  const items = itemModel.getAllItem();
  res.render("items/index", { items });
};

//특정 아이디 가져오기 컨트롤러
const getIdItem = (req, res) => {
  const item = itemModel.getIdItem(req.params.id);

  if (item) {
    res.render("items/show", { item });
    console.log("item", item);
  } else {
    res.status(404).send("해당하는 유저가 없습니다.");
  }
};

// 가장 비싼 물건 가져오기 컨트롤러
const getItemMax = (req, res) => {
  const maxitem = itemModel.getItemMax();

  //res.render("items/maxitem", { maxitem });

  if (maxitem) {
    console.log("max", maxitem);
    res.render("items/maxitem", { maxitem });
  } else {
    console.log("max", maxitem, "안된다요");
    res.status(404).send("해당하는 없음");
  }
};

module.exports = { getItems, getIdItem, getItemMax };
