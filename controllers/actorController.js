const actorModel = require("../models/actorModel");

// 1. 배우 리스트 (이름,나이,커리어) 컨트롤러
const getActor = (req, res) => {
  const actors = actorModel.getActor();
  res.render("actors/alllist", { actors });
};

// 2. 남자 배우 리스트 (이름,나이,커리어) 컨트롤러
const getManActor = (req, res) => {
  const manactors = actorModel.getManActor();
  res.render("actors/manlist", { manactors });
};

// 3. 여자 배우 리스트 (이름,나이,커리어) 컨트롤러
const getWomanActor = (req, res) => {
  const womanactors = actorModel.getWomanActor();
  res.render("actors/womanlist", { womanactors });
};

// 4. 같은 드라마 || 같은 영화 || 같은 뮤지컬 나온 배우들컨트롤러
const getTitle = (req, res) => {
  const { filteredCareers, title_lst } = actorModel.getTitle();
  console.log("title", title_lst);
  res.render("actors/titlelist", { filteredCareers, title_lst });
};

//  5. 카테고리 영화 컨트롤러
const getMovie = (req, res) => {
  const movie = actorModel.getMovie();
  res.render("actors/movie", { movie });
};

//  6. 카테고리 드라마 컨트롤러
const getDrama = (req, res) => {
  const drama = actorModel.getDrama();
  res.render("actors/drama", { drama });
};
module.exports = {
  getActor,
  getManActor,
  getWomanActor,
  getMovie,
  getDrama,
  getTitle,
};
