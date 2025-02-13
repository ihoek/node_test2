const express = require("express"); //express 모듈 세팅
const multer = require("multer");
const path = require("path");

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
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 페이지 로딩 함수
app.get("/", function (req, res) {
  //res.send("Hello World!");
  res.render("main");
});

app.post("/upload", upload.single("files"), (req, res) => {
  //console.log(req.file, "파일");
  //console.log(req.body, "잘 담겼나");
  //console.log(`uploads/${req.file.filename}`);
  //console.log("파일명", req.file.originalname);
  // console.log("req.file.path", req.file.path);
  res.send({ src: req.file.path });
  // res.render("check", { url: req.file.path });
});
// app.post("/upload/dynamic", upload.single("files"), function (req, res) {
//   //응답으로 잘 나오는지보려고 보낸거.
//   console.log("D");
//   res.send({ src: req.file.path });
// });
app.get("/check2", (req, res) => {
  res.render("check2");
});

app.post("/upload/array", upload.array("files"), (req, res) => {
  //console.log("res", req.file.path);
  console.log("res", req.files);
  //console.log("req", req.body);
  //res.send({ src: req.files });
  let datalist = [req.files[0].path, req.files[1].path];

  res.send({ src: datalist });
  console.log("성공적으로 보냄!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
