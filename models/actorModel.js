const careers = [
  {
    id: 1,
    userName: "김덕배",
    age: 25,
    careers: [
      {
        categor: "movie",
        title: "남산의 부장들",
        role: "부장",
        gender: "남자",
      },
      {
        categor: "drama",
        title: "사랑의 불시착",
        role: "군인1",
        gender: "남자",
      },
      {
        categor: "musical",
        title: "룰라",
        role: "룰라",
        gender: "남자",
      },
    ],
  },
  {
    id: 2,
    userName: "김춘자",
    age: 55,
    careers: [
      {
        categor: "musical",
        title: "카지노",
        role: "회장님",
        gender: "여자",
      },
      {
        categor: "drama",
        title: "사랑의 불시착",
        role: "아주머니",
        gender: "여자",
      },
      {
        categor: "musical",
        title: "룰라",
        role: "술집주인",
        gender: "여자",
      },
    ],
  },
  {
    id: 3,
    userName: "김잔치",
    age: 42,
    careers: [
      {
        categor: "movie",
        title: "잔치집",
        role: "잔치집 주인",
        gender: "남자",
      },
      {
        categor: "movie",
        title: "춘수네 잔치",
        role: "잔치집 주인",
        gender: "남자",
      },
      {
        categor: "movie",
        title: "덕배네 잔치",
        role: "잔치집 주인",
        gender: "남자",
      },
    ],
  },
  {
    id: 4,
    userName: "이민호",
    age: 30,
    careers: [
      {
        categor: "drama",
        title: "꽃보다 남자",
        role: "구준표",
        gender: "남자",
      },
      {
        categor: "movie",
        title: "전지적 독자 시점",
        role: "주연",
        gender: "남자",
      },
    ],
  },
];

// 참고 사항 아래의 데이터는 다 다른 페이지에서 나와야함 (js 수정으로 때려박기 금지!);

//  1. 배우 리스트 (이름,나이,커리어) 테이블 형식으로
const getActor = () => {
  return careers;
};

//  2. 남자 배우 리스트 (이름,나이,커리어) 테이블 형식으로
const getManActor = () => {
  return careers.filter((item) =>
    item.careers.some((x) => x.gender === "남자")
  );
};
//  3. 여자 배우 리스트 (이름,나이,커리어) 테이블 형식으로
const getWomanActor = () => {
  return careers.filter((item) =>
    item.careers.some((x) => x.gender === "여자")
  );
};
//  4. 같은 드라마 || 같은 영화 || 같은 뮤지컬 나온 배우들 (카테고리, 제목, 배우 이름, 역할 ) 테이블
const getTitle = () => {
  let titleCount = { drama: {}, movie: {}, musical: {} };
  let title_lst = { drama: [], movie: [], musical: [] };

  // careers 데이터를 돌며 각 카테고리 별로 제목의 출현 횟수를 셈
  careers.map((element) => {
    element.careers.map((item) => {
      if (item.categor === "drama") {
        titleCount.drama[item.title] = (titleCount.drama[item.title] || 0) + 1;
      } else if (item.categor === "movie") {
        titleCount.movie[item.title] = (titleCount.movie[item.title] || 0) + 1;
      } else if (item.categor === "musical") {
        titleCount.musical[item.title] =
          (titleCount.musical[item.title] || 0) + 1;
      }
    });
  });

  // 출현 횟수가 2번 이상인 제목을 각 카테고리 리스트에 추가
  for (let title in titleCount.drama) {
    if (titleCount.drama[title] > 1) title_lst.drama.push(title);
  }

  for (let title in titleCount.movie) {
    if (titleCount.movie[title] > 1) title_lst.movie.push(title);
  }

  for (let title in titleCount.musical) {
    if (titleCount.musical[title] > 1) title_lst.musical.push(title);
  }

  // 각 카테고리 별로 필터링된 배우 리스트
  let filteredCareers = careers.filter((item) =>
    item.careers.some(
      (x) =>
        (title_lst.drama.includes(x.title) && x.categor === "drama") ||
        (title_lst.movie.includes(x.title) && x.categor === "movie") ||
        (title_lst.musical.includes(x.title) && x.categor === "musical")
    )
  );

  return { filteredCareers, title_lst };
};

//  5. 카테고리 영화만 따로 만들어서 (카테고리 이름, 제목, 배우 이름, 역할) 테이블
const getMovie = () => {
  return careers.filter((item) =>
    item.careers.some((x) => x.categor === "movie")
  );
};

//  6. 카테고리 드라마만 따로 만들어서 (카테고리 이름, 제목, 배우 이름, 역할) 테이블
const getDrama = () => {
  return careers.filter((item) =>
    item.careers.some((x) => x.categor === "drama")
  );
};

module.exports = {
  getActor,
  getManActor,
  getWomanActor,
  getMovie,
  getDrama,
  getTitle,
};
