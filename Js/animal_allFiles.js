const filesBanner = document.querySelector(".filesBanner");
const filesTitleBtn = document.querySelector(".filesTitleBtn");
// 渲染動物資料
getAllAnimalData();


// 獲取所有動物資料
function getAllAnimalData() {
  return axios.get("http://localhost:8080/findAll")
      .then((res) => {
        renderAnimalData(res.data.animalList);
        renderFavoriteAnimals();
        filesBanner.addEventListener("click", function (e) {
          toggleFavoriteStatus(e);
        });
        bindClickEvent();
      }).catch((error) => console.log(error));
}


function getAllAnimalDataSort(specie) {
  return axios.post("http://localhost:8080/findBySpecies",{ "species":specie})
      .then((res) => {
        renderAnimalData(res.data.animalList);
        renderFavoriteAnimals();
        filesBanner.addEventListener("click", function (e) {
          toggleFavoriteStatus(e);
        });
        bindClickEvent();
      });
}


function renderAnimalData(animalList) {

  for (let i = 0; i < 9; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("filesPic");
    newDiv.innerHTML = `<div class="filesText">
      <ul>編號:</ul>
      <ul>${animalList[i].animalId}</ul>
      <p class="like" data-clicks="0" data-item="${animalList[i].animalId}">♥</p>`;
    filesBanner.appendChild(newDiv);
    newDiv.style.backgroundImage = `url("../img/animalAll/${animalList[i].animalId}-1.png")`;
    const filesPic = document.querySelectorAll(".filesPic");
    filesPic[i].setAttribute("data-filesPic", `${animalList[i].animalId}`);
  }
}


// 畫面載入時，渲染已收藏動物
function renderFavoriteAnimals() {
  return axios.post("http://localhost:8080/get_member_info", {"member_id": sessionStorage.getItem("member_id")})
      .then((res) => {
        const fav = res.data.member.fav.split(",");
        const likeElements = document.querySelectorAll(".like");
        likeElements.forEach((element) => {
          const animalId = element.getAttribute("data-item");
          if (fav.includes(animalId)) {
            element.classList.add("liked");
            element.setAttribute("data-clicks", "1");
          }
        });
      });
}

// 判斷，收藏或解除收藏
function toggleFavoriteStatus(target) {
  if (target.classList.contains("like")) {
    const clicks = parseInt(target.getAttribute("data-clicks"));
    const animalId = +target.getAttribute("data-item");
    const body = {
      "member_id": sessionStorage.getItem("member_id"),
      "animal_id": animalId
    };
    if (clicks === 0) {
      target.classList.add("liked");
      target.setAttribute("data-clicks", clicks + 1);
      return axios.post("http://localhost:8080/add_favorite", body)
          .then((res) => console.log(res.data.message));
    }
    else {
      target.classList.remove("liked");
      target.setAttribute("data-clicks", clicks - 1);
      return axios.post("http://localhost:8080/delete_favorite", body)
          .then((res) => console.log(res.data.message));
    }
  }
}


// 綁定點擊事件處理
function bindClickEvent() {

  filesBanner.addEventListener("click", function (e) {
    let filesPic = e.target.getAttribute("data-filesPic");
    sessionStorage.setItem("filesPic", filesPic);
    if (e.target.classList.contains("filesPic")) {
      if (!e.target.classList.contains("like")) {
        if (sessionStorage.getItem("administrator")) {
          window.location.href = "../pages/animal_modify_and_delete.html";
        }
        else {
          window.location.href = "../pages/animal_adoption.html";
        }
      }
    }
    toggleFavoriteStatus(e.target);
  });
}


// 分類顯示的點擊事件處理
filesTitleBtn.addEventListener("click", function (e) {
  const target = e.target;
  if (target.classList.contains('filesBtnAll')) {
    // 清空 filesBanner 的內容
    filesBanner.innerHTML = '';

    console.log('點擊了[全部]');
    getAllAnimalData()
        .then((animalList) => {
          renderAnimalData(animalList);
          return renderFavoriteAnimals();
        })
        .then(() => {
          bindClickEvent();
        })
        .catch((error) => {
          console.error(error);
        });
  }
  else if (target.classList.contains('filesBtnDog')) {
    // 清空 filesBanner 的內容
    filesBanner.innerHTML = '';

    console.log('點擊了[犬]');
    getAllAnimalDataSort(true);
  }
  else if (target.classList.contains('filesBtnCat')) {
    // 清空 filesBanner 的內容
    filesBanner.innerHTML = '';

    console.log('點擊了[貓]');
    getAllAnimalDataSort(false);
  }
});
