const express = require("express"); //express 모듈 세팅
const multer = require("multer");
const path = require("path");

//라우팅 파일 불러오기
const userRouters = require("./routes/userRoutes");
const itemRouters = require("./routes/itemRoutes");
const actorRouters = require("./routes/actorRoutes");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    //원본 파일명에서 확장자 추출
    const ext = path.extname(file.originalname);

    //파일명에 타이스탬프와 확장자를 포함시켜서 저장함
    cb(null, Date.now() + ext); //timestamp + 확장자
  },
});

//const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
//json
app.use(express.json());

//app.use(express.static("static"));
app.use("/static", express.static(__dirname + "/static"));
app.use("/uploads", express.static(__dirname + "/uploads"));

// /user 경로에 대한 라우팅 처리
app.use("/users", userRouters); // /users에 대한 요청은 userRoutes로 처리
app.use("/items", itemRouters); // /item 경로에 대한 라우팅 처리
app.use("/actors", actorRouters); // /item 경로에 대한 라우팅 처리
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 기본 홈 라우터
app.get("/", (req, res) => {
  res.render("index", { title: "MVC 패턴" });
});

// 페이지 로딩 함수
// app.get("/", function (req, res) {
//   //res.send("Hello World!");
//   res.render("main");
// });

// app.post("/upload", upload.single("files"), (req, res) => {
//   res.send({ src: req.file.path });
// });

// app.get("/check2", (req, res) => {
//   res.render("check2");
// });

// app.post("/upload/array", upload.array("files"), (req, res) => {
//   console.log("res", req.files);
//   let datalist = [req.files[0].path, req.files[1].path];

//   res.send({ src: datalist });
//   console.log("성공적으로 보냄!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
