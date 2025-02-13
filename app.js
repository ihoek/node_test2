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
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 페이지 로딩 함수
app.get("/", function (req, res) {
  //res.send("Hello World!");
  res.render("main");
});

app.post("/upload", upload.single("files"), (req, res) => {
  console.log(req.file, "파일");
  console.log(req.body, "잘 담겼나");
  res.send("d");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
